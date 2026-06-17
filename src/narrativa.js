/**
 * narrativa.js — Genera un testo narrativo che "legge" la mappa nel suo insieme,
 * collegando i numeri chiave e i loro Arcani. Fonte: significati.js.
 * Restituisce un array di paragrafi (stringhe).
 */

import { getSignificato } from './significati.js';

/**
 * @param {object} mappa  output di calcolaMappa()
 * @param {'it'|'en'} [lang='it']
 * @returns {string[]} paragrafi della sintesi narrativa
 */
export function generaNarrativa(mappa, lang = 'it') {
  const S = (n) => getSignificato(n, lang);
  const b = mappa.base;
  const A = mappa.ambiti;
  const nome = (mappa.input.nome || '').trim();
  const nm = (n) => `${n} · ${S(n).nome}`;        // es. "11 · La Forza"
  const q = (n) => `«${S(n).keyword}»`;            // es. «Io misuro»

  if (lang === 'en') {
    const who = nome ? `${nome}, your` : 'Your';
    return [
      `${who} map is born from three forces. Your Life Desire is ${nm(b.desiderio)} (${q(b.desiderio)}): what you instinctively reach for. Your Automatic Response is ${nm(b.risposta)}: how you react before thinking. Your Genealogical Memory is ${nm(b.memoria)}: the inheritance you carry.`,
      `From their tension arises the Base Conflict ${nm(mappa.conflittoBase)} — not an obstacle, but the engine of your growth. Your Deep Personality is ${nm(mappa.personalitaProfonda.risultato)}: your essential nature beneath the masks.`,
      `Your point of balance is ${nm(mappa.equilibrio)}: when you are aligned with this frequency, things flow.`,
      `Across the four domains the conflict takes shape as — Nest ${A.nido.b}, Relationship ${A.relazione.b}, Social ${A.sociale.b}, Work ${A.lavoro.b}.`,
      `Everything converges in your Destiny Number ${nm(mappa.numeroDestino)} (${q(mappa.numeroDestino)}): the direction in which your path tends to integrate.`,
    ];
  }

  const chi = nome ? `${nome}, la` : 'La';
  return [
    `${chi} tua mappa nasce da tre forze. Il Desiderio di Vita è il ${nm(b.desiderio)} (${q(b.desiderio)}): ciò verso cui tendi istintivamente. La Risposta Automatica è il ${nm(b.risposta)}: il tuo modo immediato di reagire. La Memoria Genealogica è il ${nm(b.memoria)}: l'eredità che porti con te.`,
    `Dalla loro tensione nasce il Conflitto Base ${nm(mappa.conflittoBase)}: non un ostacolo, ma il motore della tua crescita. La tua Personalità Profonda è il ${nm(mappa.personalitaProfonda.risultato)}: la natura essenziale che vive sotto le maschere.`,
    `Il tuo punto di equilibrio è il ${nm(mappa.equilibrio)}: quando sei in sintonia con questa frequenza, le cose scorrono.`,
    `Nei quattro ambiti il conflitto si declina così — Nido ${A.nido.b}, Relazione ${A.relazione.b}, Sociale ${A.sociale.b}, Lavoro ${A.lavoro.b}: quattro stanze della stessa casa interiore.`,
    `Tutto converge nel Numero Destino ${nm(mappa.numeroDestino)} (${q(mappa.numeroDestino)}): la direzione verso cui il tuo cammino tende a integrarsi.`,
  ];
}
