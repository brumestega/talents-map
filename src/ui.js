/**
 * ui.js — Rendering della schermata risultati e widget interattivi
 * (tooltip, drawer storico, dialog di salvataggio, loader, debug).
 * Vanilla JS, nessuna dipendenza. Animazioni via CSS + Intersection Observer.
 */

import { config, track } from './config.js';
import { t, getCurrentLang } from './i18n.js';
import { getSignificato, getCampoDescrizione } from './significati.js';
import { caricaStorico, eliminaMappa } from './storage.js';

/* ===========================================================================
 * UTILITY DOM
 * ======================================================================== */

/** Mini helper per creare elementi. */
function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k === 'dataset') Object.assign(node.dataset, v);
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
    else if (v === true) node.setAttribute(k, '');
    else node.setAttribute(k, v);
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue;
    node.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
  return node;
}

const $ = (sel, root = document) => root.querySelector(sel);
const prefersReducedMotion = () =>
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Icone SVG inline per i quattro ambiti (stroke = currentColor). */
const ICONE = {
  nido: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M3 11l9-7 9 7"/><path d="M5 10v9h14v-9"/><path d="M10 19v-5h4v5"/></svg>',
  relazione: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><circle cx="9" cy="12" r="6"/><circle cx="15" cy="12" r="6"/></svg>',
  sociale: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><circle cx="12" cy="7" r="3"/><circle cx="5" cy="10" r="2.4"/><circle cx="19" cy="10" r="2.4"/><path d="M4 19c0-3 3-5 8-5s8 2 8 5"/></svg>',
  lavoro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M12 2l2.4 4.8 5.3.8-3.85 3.75.9 5.3L12 18.9 7.25 17.4l.9-5.3L4.3 8.35l5.3-.8z"/></svg>',
};

/* Mappatura campo -> chiave i18n etichetta. */
const LABEL_KEY = {
  desiderio: 'campo.desiderio', risposta: 'campo.risposta', memoria: 'campo.memoria',
  conflittoBase: 'campo.conflittoBase', pp: 'campo.pp', equilibrio: 'campo.equilibrio',
  ppAnnoScelto: 'campo.ppAnnoScelto', prontoSoccorso: 'campo.prontoSoccorso',
  chiaveEmozionale: 'campo.chiaveEmozionale', strumentoLavoroPotere: 'campo.strumento',
  progettoSenso: 'campo.progetto', personaggio: 'campo.personaggio', numeroDestino: 'campo.numeroDestino',
  nido: 'ambito.nido', relazione: 'ambito.relazione', sociale: 'ambito.sociale', lavoro: 'ambito.lavoro',
  superSequenza: 'section.superSequenza',
};

const labelCampo = (campo) => (LABEL_KEY[campo] ? t(LABEL_KEY[campo]) : campo);

/* ===========================================================================
 * NUMERO (elemento cliccabile con tooltip)
 * ======================================================================== */

/**
 * Crea un elemento "numero". Se i tooltip sono attivi è un <button> focusabile.
 * @param {number} valore
 * @param {{campo?:string, etichetta?:string, size?:string, color?:string}} opts
 */
function numeroEl(valore, { campo, etichetta, size, color } = {}) {
  const cls = 'numero' + (size ? ` numero--${size}` : '');
  const aria = `${etichetta || labelCampo(campo) || ''}: ${valore}`.trim();
  const common = {
    class: cls,
    'aria-label': aria,
    dataset: { numero: String(valore), target: String(valore), campo: campo || '' },
    style: color ? `--ambito-color:${color}` : undefined,
  };
  if (config.showTooltips) {
    return el('button', { ...common, type: 'button', 'aria-haspopup': 'dialog' }, '0');
  }
  return el('span', { ...common }, String(valore));
}

/* ===========================================================================
 * BUILDERS DI SEZIONE
 * ======================================================================== */

function sezione(id, titolo, ...corpo) {
  return el('section', { class: 'result-section', 'data-section': id },
    titolo ? el('h2', { class: 'section-title' }, titolo) : null,
    ...corpo);
}

function cardNumero(campo, etichetta, valore, opts = {}) {
  return el('div', { class: 'num-card' + (opts.cardClass ? ` ${opts.cardClass}` : ''), style: opts.color ? `--ambito-color:${opts.color}` : undefined },
    el('span', { class: 'num-card__label' }, etichetta),
    numeroEl(valore, { campo, etichetta, size: opts.size, color: opts.color }),
    el('span', { class: 'num-card__rule' }));
}

/* SEZIONE 0 — intestazione personale */
function buildIntestazione(m) {
  const { nome, giorno, mese, anno, annoScelto } = m.input;
  const mesi = t('mesi');
  const dataNascita = `${giorno} ${mesi[mese - 1]} ${anno}`;
  return el('header', { class: 'map-header', 'data-section': 'intestazione' },
    el('div', { class: 'map-header__brackets' },
      el('h1', { class: 'map-title' }, `${t('app.title')}${nome ? ' — ' + nome : ''}`),
      el('p', { class: 'map-header__meta' },
        el('span', {}, `${t('results.bornOn')} ${dataNascita}`),
        el('span', { class: 'dot' }, '·'),
        el('span', {}, `${t('results.refYear')}: ${annoScelto}`))));
}

/* SEZIONE 1 — tre numeri fondamentali */
function buildBase(m) {
  return sezione('base', t('section.base'),
    el('div', { class: 'grid grid--3' },
      cardNumero('desiderio', t('campo.desiderio'), m.base.desiderio, { size: 'lg' }),
      cardNumero('risposta', t('campo.risposta'), m.base.risposta, { size: 'lg' }),
      cardNumero('memoria', t('campo.memoria'), m.base.memoria, { size: 'lg' })));
}

/* SEZIONE 2 — conflitto base + personalità profonda */
function buildConflittoPp(m) {
  const pp = m.personalitaProfonda;
  return sezione('conflitto-pp', t('section.conflittoPp'),
    el('div', { class: 'grid grid--2' },
      el('div', { class: 'num-card' },
        el('span', { class: 'num-card__label' }, t('campo.conflittoBase')),
        numeroEl(m.conflittoBase, { campo: 'conflittoBase', size: 'lg' }),
        el('span', { class: 'num-card__rule' })),
      el('div', { class: 'num-card num-card--dual' },
        el('span', { class: 'num-card__label' }, t('campo.pp')),
        el('div', { class: 'dual-values' },
          el('div', { class: 'dual-values__item' },
            el('span', { class: 'mini-label' }, t('campo.verticale')),
            numeroEl(pp.verticale, { campo: 'pp', etichetta: t('campo.verticale'), size: 'sm' })),
          el('div', { class: 'dual-values__item dual-values__item--main' },
            el('span', { class: 'mini-label' }, t('campo.orizzontale')),
            numeroEl(pp.orizzontale, { campo: 'pp', etichetta: t('campo.orizzontale'), size: 'sm' }))),
        el('p', { class: 'num-card__note' }, `${t('campo.pp')}: `, el('strong', {}, String(pp.risultato))))));
}

/* SEZIONE 3 — equilibrio (hero) */
function buildEquilibrio(m) {
  return sezione('equilibrio', null,
    el('div', { class: 'hero hero--equilibrio' },
      el('span', { class: 'hero__label' }, t('section.equilibrio')),
      numeroEl(m.equilibrio, { campo: 'equilibrio', size: 'hero' }),
      el('p', { class: 'hero__note' }, t('campo.equilibrio.note'))));
}

/* SEZIONE 4 — quattro ambiti */
const AMBITO_COLORI = { nido: 'var(--accent)', relazione: 'var(--accent-2)', sociale: 'var(--sage)', lavoro: 'var(--rose)' };

function buildAmbitoCard(key, seq) {
  const color = AMBITO_COLORI[key];
  const tri = el('div', { class: 'ambito-triangle' },
    el('div', { class: 'ambito-node ambito-node--a' },
      el('span', { class: 'mini-label' }, `A · ${t('seq.a')}`),
      numeroEl(seq.a, { campo: key, etichetta: `${t('ambito.' + key)} — ${t('seq.a')}`, color })),
    el('div', { class: 'ambito-node ambito-node--b' },
      el('span', { class: 'mini-label' }, `B · ${t('seq.b')}`),
      numeroEl(seq.b, { campo: key, etichetta: `${t('ambito.' + key)} — ${t('seq.b')}`, color })),
    el('div', { class: 'ambito-node ambito-node--c' },
      el('span', { class: 'mini-label' }, `C · ${t('seq.c')}`),
      numeroEl(seq.c, { campo: key, etichetta: `${t('ambito.' + key)} — ${t('seq.c')}`, color })));

  return el('article', { class: 'ambito-card', style: `--ambito-color:${color}`, 'data-ambito': key },
    el('div', { class: 'ambito-card__head' },
      el('span', { class: 'ambito-card__icon', html: ICONE[key] }),
      el('h3', { class: 'ambito-card__title' }, t('ambito.' + key))),
    tri,
    el('div', { class: 'ambito-card__sfumatura' },
      el('span', { class: 'mini-label' }, t('seq.sfumatura')),
      numeroEl(seq.sfumatura, { campo: key, etichetta: `${t('ambito.' + key)} — ${t('seq.sfumatura')}`, color, size: 'sm' })));
}

function buildAmbiti(m) {
  return sezione('ambiti', t('section.ambiti'),
    el('div', { class: 'grid grid--ambiti' },
      buildAmbitoCard('nido', m.ambiti.nido),
      buildAmbitoCard('relazione', m.ambiti.relazione),
      buildAmbitoCard('sociale', m.ambiti.sociale),
      buildAmbitoCard('lavoro', m.ambiti.lavoro)));
}

/* SEZIONE 5 — elementi chiave */
function buildElementiChiave(m) {
  const e = m.elementiChiave;
  return sezione('elementi-chiave', t('section.elementiChiave'),
    el('div', { class: 'grid grid--3 grid--keys' },
      cardNumero('prontoSoccorso', t('campo.prontoSoccorso'), e.prontoSoccorso),
      cardNumero('chiaveEmozionale', t('campo.chiaveEmozionale'), e.chiaveEmozionale),
      cardNumero('strumentoLavoroPotere', t('campo.strumento'), e.strumentoLavoroPotere),
      cardNumero('progettoSenso', t('campo.progetto'), e.progettoSenso),
      cardNumero('personaggio', t('campo.personaggio'), e.personaggio)));
}

/* SEZIONE 6 — PP anno scelto */
function buildPpAnnoScelto(m) {
  const pps = m.ppAnnoScelto;
  return sezione('pp-anno-scelto', `${t('section.ppAnnoScelto')} (${m.input.annoScelto})`,
    el('div', { class: 'num-card num-card--lunar num-card--dual' },
      el('div', { class: 'dual-values' },
        el('div', { class: 'dual-values__item' },
          el('span', { class: 'mini-label' }, t('campo.verticale')),
          numeroEl(pps.verticale, { campo: 'ppAnnoScelto', etichetta: t('campo.verticale'), size: 'sm' })),
        el('div', { class: 'dual-values__item dual-values__item--main' },
          el('span', { class: 'mini-label' }, t('campo.ppAnnoScelto')),
          numeroEl(pps.risultato, { campo: 'ppAnnoScelto', size: 'lg' })),
        el('div', { class: 'dual-values__item' },
          el('span', { class: 'mini-label' }, t('campo.orizzontale')),
          numeroEl(pps.orizzontale, { campo: 'ppAnnoScelto', etichetta: t('campo.orizzontale'), size: 'sm' })))));
}

/* SEZIONE 7 — giustificazioni */
function buildGiustificazioni(m) {
  const g = m.giustificazioni;
  const voci = [
    ['nido', t('ambito.nido'), g.nido],
    ['relazione', t('ambito.relazione'), g.relazione],
    ['sociale', t('ambito.sociale'), g.sociale],
    ['lavoro', t('ambito.lavoro'), g.lavoro],
    ['equilibrio', t('campo.equilibrio'), g.equilibrio],
    ['prontoSoccorso', t('campo.prontoSoccorso'), g.prontoSoccorso],
  ];
  return sezione('giustificazioni', t('section.giustificazioni'),
    el('div', { class: 'grid grid--3 grid--compact' },
      ...voci.map(([campo, label, val]) => cardNumero(campo, label, val, { size: 'sm', cardClass: 'num-card--compact' }))));
}

/* SEZIONE 8 — super sequenza */
function buildSuperSequenza(m) {
  const s = m.superSequenza;
  const step = (val, lbl) => el('div', { class: 'seq-step' },
    numeroEl(val, { campo: 'superSequenza', etichetta: `${t('section.superSequenza')} — ${lbl}` }),
    el('span', { class: 'mini-label' }, lbl));
  const arrow = () => el('span', { class: 'seq-arrow', 'aria-hidden': 'true' }, '→');
  return sezione('super-sequenza', t('section.superSequenza'),
    el('div', { class: 'super-seq' },
      step(s.b, t('seq.b')), arrow(),
      step(s.a, t('seq.a')), arrow(),
      step(s.c, t('seq.c')), arrow(),
      step(s.sfumatura, t('seq.sfumatura'))));
}

/* SEZIONE 9 — numero destino */
function buildNumeroDestino(m) {
  return sezione('numero-destino', null,
    el('div', { class: 'destino-sep', 'aria-hidden': 'true' }, el('span', { class: 'destino-sep__ornament' }, '✦')),
    el('div', { class: 'hero hero--destino' },
      el('span', { class: 'hero__label' }, t('campo.numeroDestino')),
      numeroEl(m.numeroDestino, { campo: 'numeroDestino', size: 'mega' })));
}

/* Footer risultati */
function buildFooter(onNuovaMappa, onSalva) {
  return el('div', { class: 'results-footer' },
    el('button', { class: 'btn btn--ghost', type: 'button', onclick: onNuovaMappa }, t('results.back')),
    config.showPdfExport
      ? el('button', { class: 'btn btn--gold', type: 'button', onclick: onSalva }, t('results.save'))
      : null);
}

/* Pannello debug (?debug=true) */
function buildDebug(m) {
  if (!config.debug) return null;
  return el('details', { class: 'debug-panel' },
    el('summary', {}, 'Debug — valori intermedi & JSON'),
    el('div', { class: 'debug-grid' },
      ...Object.entries(m.intermedi).map(([k, v]) => el('div', {}, el('code', {}, k), ' = ', el('strong', {}, String(v))))),
    el('pre', { class: 'debug-json' }, JSON.stringify(m, null, 2)));
}

/* ===========================================================================
 * RENDER PRINCIPALE
 * ======================================================================== */

let _observer = null;

/**
 * Renderizza la mappa nello #screen-results e gestisce la transizione dal form.
 * @param {object} mappa
 * @param {{onNuovaMappa:Function, onSalva:Function}} handlers
 */
/** Costruisce/aggiorna il contenuto dei risultati (senza transizione). */
function popolaRisultati(mappa, handlers = {}) {
  const content = $('#results-content');
  if (!content) return false;
  chiudiTooltip(); // chiude eventuali popover di una mappa precedente
  try {
    content.innerHTML = '';
    content.append(
      buildIntestazione(mappa),
      buildBase(mappa),
      buildConflittoPp(mappa),
      buildEquilibrio(mappa),
      buildAmbiti(mappa),
      buildElementiChiave(mappa),
      buildPpAnnoScelto(mappa),
      buildGiustificazioni(mappa),
      buildSuperSequenza(mappa),
      buildNumeroDestino(mappa),
      buildFooter(handlers.onNuovaMappa, handlers.onSalva),
    );
    const dbg = buildDebug(mappa);
    if (dbg) content.append(dbg);
  } catch (err) {
    console.error('[ui] errore di rendering:', err);
    content.innerHTML = '';
    content.append(el('div', { class: 'error-box' }, t('error.render')));
    return false;
  }
  attivaAnimazioniSezioni(content);
  collegaTooltip(content);
  return true;
}

export function mostraRisultati(mappa, handlers = {}) {
  const screenForm = $('#screen-form');
  const screenResults = $('#screen-results');
  if (!screenResults) return;
  if (!popolaRisultati(mappa, handlers)) return;

  // Transizione form -> risultati
  if (screenForm) {
    screenForm.classList.add('is-leaving');
    setTimeout(() => { screenForm.hidden = true; screenForm.classList.remove('is-leaving'); }, prefersReducedMotion() ? 0 : 420);
  }
  screenResults.hidden = false;
  screenResults.classList.add('is-entering');
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  track('mappa_visualizzata', { numeroDestino: mappa.numeroDestino });
}

/** Ri-renderizza i risultati (es. al cambio lingua) solo se già visibili. */
export function rerenderSeVisibile(mappa, handlers = {}) {
  const screenResults = $('#screen-results');
  if (!screenResults || screenResults.hidden || !mappa) return;
  popolaRisultati(mappa, handlers);
}

/** Torna al form, ripristinando la vista iniziale. */
export function mostraForm() {
  const screenForm = $('#screen-form');
  const screenResults = $('#screen-results');
  chiudiTooltip();
  if (screenResults) { screenResults.hidden = true; screenResults.classList.remove('is-entering'); }
  if (screenForm) { screenForm.hidden = false; }
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

/* Intersection Observer: fade-in sezioni + count-up numeri. */
function attivaAnimazioniSezioni(content) {
  const sezioni = content.querySelectorAll('[data-section]');
  if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
    sezioni.forEach((s) => { s.classList.add('is-visible'); countUpIn(s, 0); });
    return;
  }
  if (_observer) _observer.disconnect();
  let i = 0;
  _observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const s = entry.target;
      const delay = (i++ % 3) * 90; // stagger leggero
      setTimeout(() => {
        s.classList.add('is-visible');
        countUpIn(s, config.animationDuration);
      }, delay);
      _observer.unobserve(s);
    });
  }, { rootMargin: '0px 0px -50px 0px', threshold: 0.12 });
  sezioni.forEach((s) => _observer.observe(s));
}

function countUpIn(scope, duration) {
  scope.querySelectorAll('.numero[data-target]').forEach((node) => {
    if (node.dataset.counted) return;
    node.dataset.counted = '1';
    countUp(node, Number(node.dataset.target), duration);
  });
}

/** Count-up con easing esponenziale (finale drammatico). */
function countUp(node, target, duration) {
  if (!duration || prefersReducedMotion()) { node.textContent = String(target); return; }
  const start = performance.now();
  function frame(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
    node.textContent = String(Math.round(target * eased));
    if (p < 1) requestAnimationFrame(frame);
    else node.textContent = String(target);
  }
  requestAnimationFrame(frame);
}

/* ===========================================================================
 * TOOLTIP / POPOVER NUMERI
 * ======================================================================== */

let _tooltipEl = null;
let _tooltipTrigger = null;

function tooltipNode() {
  if (_tooltipEl) return _tooltipEl;
  _tooltipEl = el('div', { class: 'tooltip', role: 'dialog', 'aria-modal': 'false', hidden: true });
  document.body.append(_tooltipEl);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') chiudiTooltip(); });
  document.addEventListener('click', (e) => {
    if (!_tooltipEl || _tooltipEl.hidden) return;
    if (_tooltipEl.contains(e.target) || (_tooltipTrigger && _tooltipTrigger.contains(e.target))) return;
    chiudiTooltip();
  });
  return _tooltipEl;
}

function collegaTooltip(content) {
  if (!config.showTooltips) return;
  if (content._tooltipBound) return; // delega una sola volta (l'elemento persiste tra i render)
  content._tooltipBound = true;
  content.addEventListener('click', (e) => {
    const btn = e.target.closest('.numero');
    if (!btn || btn.tagName !== 'BUTTON') return;
    e.stopPropagation();
    if (_tooltipTrigger === btn && !tooltipNode().hidden) { chiudiTooltip(); return; }
    apriTooltip(btn);
  });
}

function apriTooltip(trigger) {
  const lang = getCurrentLang();
  const numero = Number(trigger.dataset.numero);
  const campo = trigger.dataset.campo;
  const sig = getSignificato(numero, lang);
  const campoDesc = getCampoDescrizione(campo, lang);
  const campoLabel = labelCampo(campo);

  const tip = tooltipNode();
  tip.innerHTML = '';
  tip.append(
    el('button', { class: 'tooltip__close', type: 'button', 'aria-label': t('dialog.close'), onclick: chiudiTooltip }, '×'),
    el('div', { class: 'tooltip__head' },
      el('span', { class: 'tooltip__numero' }, String(numero)),
      el('div', {},
        el('h4', { class: 'tooltip__nome' }, sig.nome),
        el('p', { class: 'tooltip__keyword' }, sig.keyword))),
    campoDesc ? el('p', { class: 'tooltip__contesto' },
      el('span', { class: 'mini-label' }, `${t('tooltip.context')}: ${campoLabel}`), campoDesc) : null,
    sig.descrizione ? el('p', { class: 'tooltip__desc' }, sig.descrizione) : null,
    sig.ombra ? el('p', { class: 'tooltip__sub' }, el('strong', {}, `${t('tooltip.shadow')}. `), sig.ombra) : null,
    sig.dono ? el('p', { class: 'tooltip__sub' }, el('strong', {}, `${t('tooltip.gift')}. `), sig.dono) : null,
  );

  tip.hidden = false;
  _tooltipTrigger = trigger;
  trigger.setAttribute('aria-expanded', 'true');
  posizionaTooltip(tip, trigger);
}

function posizionaTooltip(tip, trigger) {
  const mobile = window.matchMedia('(max-width: 600px)').matches;
  tip.classList.toggle('tooltip--sheet', mobile);
  if (mobile) { tip.style.left = tip.style.top = ''; return; }

  const r = trigger.getBoundingClientRect();
  const tw = tip.offsetWidth, th = tip.offsetHeight;
  const margin = 12;
  const destra = r.left + r.width / 2 > window.innerWidth / 2;
  let left = destra ? r.left - tw - margin : r.right + margin;
  left = Math.max(margin, Math.min(left, window.innerWidth - tw - margin));
  let top = r.top + r.height / 2 - th / 2 + window.scrollY;
  top = Math.max(window.scrollY + margin, Math.min(top, window.scrollY + window.innerHeight - th - margin));
  tip.style.left = `${left}px`;
  tip.style.top = `${top}px`;
}

export function chiudiTooltip() {
  if (_tooltipEl) _tooltipEl.hidden = true;
  if (_tooltipTrigger) { _tooltipTrigger.setAttribute('aria-expanded', 'false'); _tooltipTrigger = null; }
}

/* ===========================================================================
 * LOADER
 * ======================================================================== */

let _loaderTimer = null;

export function mostraLoader(show) {
  const loader = $('#loader');
  if (!loader) return;
  const testo = loader.querySelector('.loader__text');
  if (show) {
    loader.hidden = false;
    const frasi = [t('loader.1'), t('loader.2'), t('loader.3')];
    let i = 0;
    if (testo) testo.textContent = frasi[0];
    clearInterval(_loaderTimer);
    if (!prefersReducedMotion()) {
      _loaderTimer = setInterval(() => { i = (i + 1) % frasi.length; if (testo) testo.textContent = frasi[i]; }, 420);
    }
  } else {
    loader.hidden = true;
    clearInterval(_loaderTimer);
  }
}

/* ===========================================================================
 * DRAWER STORICO
 * ======================================================================== */

export function apriStorico(onRiapri) {
  const drawer = $('#storico-drawer');
  const backdrop = $('#storico-backdrop');
  const lista = $('#storico-list');
  if (!drawer || !lista) return;

  const voci = caricaStorico();
  lista.innerHTML = '';
  if (!voci.length) {
    lista.append(el('p', { class: 'storico-empty' }, t('storico.empty')));
  } else {
    const mesi = t('mesi');
    voci.forEach((v) => {
      const i = v.mappa.input;
      const calc = new Date(v.salvataIl);
      const riga = el('div', { class: 'storico-item' },
        el('div', { class: 'storico-item__info' },
          el('strong', {}, i.nome || '—'),
          el('span', { class: 'mini-label' }, `${t('storico.born')} ${i.giorno} ${mesi[i.mese - 1]} ${i.anno}`),
          el('span', { class: 'mini-label' }, `${t('storico.calc')} ${calc.toLocaleDateString(getCurrentLang())}`)),
        el('div', { class: 'storico-item__actions' },
          el('button', { class: 'btn btn--small btn--gold', type: 'button', onclick: () => { chiudiStorico(); onRiapri && onRiapri(v.mappa); } }, t('storico.reopen')),
          el('button', { class: 'btn btn--small btn--icon', type: 'button', 'aria-label': t('storico.delete'), onclick: () => { eliminaMappa(v.id); apriStorico(onRiapri); } }, '🗑')));
      lista.append(riga);
    });
  }

  drawer.hidden = false;
  if (backdrop) backdrop.hidden = false;
  requestAnimationFrame(() => { drawer.classList.add('is-open'); if (backdrop) backdrop.classList.add('is-open'); });
}

export function chiudiStorico() {
  const drawer = $('#storico-drawer');
  const backdrop = $('#storico-backdrop');
  if (drawer) {
    drawer.classList.remove('is-open');
    setTimeout(() => { drawer.hidden = true; }, prefersReducedMotion() ? 0 : 300);
  }
  if (backdrop) {
    backdrop.classList.remove('is-open');
    setTimeout(() => { backdrop.hidden = true; }, prefersReducedMotion() ? 0 : 300);
  }
}

/* ===========================================================================
 * DIALOG SALVATAGGIO
 * ======================================================================== */

export function mostraDialogSalva({ onStampa, onSoloSalva } = {}) {
  const overlay = el('div', { class: 'dialog-overlay' });
  const close = () => { overlay.classList.remove('is-open'); setTimeout(() => overlay.remove(), prefersReducedMotion() ? 0 : 250); };
  const dialog = el('div', { class: 'dialog', role: 'dialog', 'aria-modal': 'true', 'aria-label': t('dialog.save.title') },
    el('h3', { class: 'dialog__title' }, t('dialog.save.title')),
    el('p', { class: 'dialog__body' }, t('dialog.save.body')),
    el('div', { class: 'dialog__actions' },
      el('button', { class: 'btn btn--ghost', type: 'button', onclick: () => { close(); onSoloSalva && onSoloSalva(); } }, t('dialog.save.only')),
      el('button', { class: 'btn btn--gold', type: 'button', onclick: () => { close(); onStampa && onStampa(); } }, t('dialog.save.print'))));
  overlay.append(dialog);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } });
  document.body.append(overlay);
  requestAnimationFrame(() => overlay.classList.add('is-open'));
  dialog.querySelector('.btn--gold').focus();
}

/* ===========================================================================
 * BANNER MAPPA PRECEDENTE
 * ======================================================================== */

export function mostraBannerPrecedente(voce, { onRivedi } = {}) {
  const host = $('#banner-host');
  if (!host || !voce) return;
  const i = voce.mappa.input;
  const calc = new Date(voce.salvataIl).toLocaleDateString(getCurrentLang());
  host.innerHTML = '';
  const banner = el('div', { class: 'banner', role: 'status' },
    el('span', {}, `${t('banner.previous')}: `, el('strong', {}, i.nome || '—'), `, ${calc}.`),
    el('div', { class: 'banner__actions' },
      el('button', { class: 'btn btn--small btn--gold', type: 'button', onclick: () => { host.innerHTML = ''; onRivedi && onRivedi(voce.mappa); } }, t('banner.review')),
      el('button', { class: 'btn btn--small btn--ghost', type: 'button', onclick: () => { banner.classList.add('is-hiding'); setTimeout(() => host.innerHTML = '', 300); } }, t('banner.ignore'))));
  host.append(banner);
}
