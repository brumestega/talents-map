# Mappa dei Talenti — Web App (prototipo)

Versione web della **Mappa dei Talenti**, uno strumento di lettura numerologica
del settore olistico. A partire dalla data di nascita e da un *anno di
riferimento*, calcola una serie di numeri organizzati in **ambiti** (Nido,
Relazione, Sociale, Lavoro) e altri elementi chiave della mappa personale.

Il motore di calcolo è stato **reverse-engineered** dal file Excel originale
`reference/MAPPA_DEI_TALENTI_COMPLETA.xlsm` (foglio nascosto `DATI&CALCOLI`) e
verificato cella-per-cella. Vedi [`TECHNICAL.md`](./TECHNICAL.md) per i dettagli.

> ⚠️ **Prototipo.** Layout e contenuti sono volutamente provvisori. I testi dei
> significati in `src/significati.js` sono *placeholder evocativi* da sostituire
> con i contenuti definitivi forniti dalla professionista.

---

## Avvio rapido

Nessuna build, nessun bundler: sono **file statici** (Vanilla JS, ES modules).
Serve solo un piccolo server statico perché i moduli ES non funzionano via
`file://`.

```bash
npm run dev        # avvia su http://localhost:3000  (usa `npx serve`)
# in alternativa:
python3 -m http.server 3000
```

Poi apri `http://localhost:3000/`.

### Test del motore di calcolo

```bash
npm test           # verifica rapida sul caso noto (Roberto 28/1/1981)
npm run test:full  # suite completa (edge case, regola 0→22, consistenza)
```

---

## Struttura del progetto

```
talents-map/
├── index.html              # app completa (form + risultati)
├── embed.html              # versione per iframe (auto-resize via postMessage)
├── package.json
├── README.md
├── TECHNICAL.md            # documentazione tecnica del motore
├── reference/              # provenienza: Excel originale + prompts
│   ├── MAPPA_DEI_TALENTI_COMPLETA.xlsm
│   └── mappa_talenti_claude_code_prompts.md
└── src/
    ├── calculator.js       # ⭐ motore di calcolo puro (verificato)
    ├── significati.js      # significati dei numeri 1–22 + descrizioni campi
    ├── i18n.js             # internazionalizzazione IT / EN
    ├── config.js           # opzioni configurabili + URL params
    ├── storage.js          # persistenza localStorage (storico mappe)
    ├── ui.js               # rendering risultati, tooltip, drawer, dialog
    ├── main.js             # entry point: form, validazione, orchestrazione
    ├── styles.css          # design system "mistico-moderno"
    └── tests.js            # suite di test
```

---

## Integrazione nel sito

### Metodo 1 — iFrame (disponibile)

Carica i file su un hosting statico e incolla nel sito host:

```html
<iframe
  src="https://tuosito.it/mappa-talenti/embed.html"
  id="mappa-talenti-frame"
  width="100%" frameborder="0" scrolling="no"
  title="Mappa dei Talenti"></iframe>
<script>
  window.addEventListener('message', function (e) {
    if (e.data && e.data.type === 'mappa-height') {
      document.getElementById('mappa-talenti-frame').style.height = e.data.height + 'px';
    }
  });
</script>
```

`embed.html` comunica la propria altezza al sito padre tramite `postMessage`,
così l'iframe si adatta al contenuto.

### Metodi 2 e 3 — Web Component / bundle drop-in *(roadmap)*

I metodi “Custom Element” e “script tag drop-in” descritti nei prompt sono
previsti ma **non ancora implementati** in questa fase prototipo.

---

## Personalizzazione

### Tramite parametri URL (anche su `embed.html`)

| Param         | Esempio                | Effetto                                  |
|---------------|------------------------|------------------------------------------|
| `lang`        | `?lang=en`             | Lingua iniziale (`it` \| `en`)           |
| `accentColor` | `?accentColor=%23C8A96E` | Colore accento primario (URL-encoded)  |
| `bgColor`     | `?bgColor=%230A0A0F`   | Colore di sfondo                         |
| `debug`       | `?debug=true`          | Pannello di debug nei risultati          |
| `tooltips`    | `?tooltips=false`      | Disattiva i tooltip sui numeri           |
| `storico`     | `?storico=false`       | Nasconde lo storico                      |
| `pdf`         | `?pdf=false`           | Nasconde il pulsante Salva/Stampa        |
| `theme`       | `?theme=false`         | Nasconde il toggle tema                  |

### Tramite codice (`src/config.js`)

Tutte le opzioni (durata animazioni, delay loader, `analyticsCallback`, ecc.)
sono in `config`. I colori del tema sono variabili CSS in `:root` /
`[data-theme="light"]` dentro `src/styles.css`.

---

## Aggiornare i significati dei numeri

Apri `src/significati.js`. Ogni numero 1–22 ha:

```js
11: {
  nome: "L'Intuizione Superiore",
  keyword: 'Visione · Illuminazione · Sensibilità',
  descrizione: '…',   // testo principale
  ombra: '…',         // aspetto ombra
  dono: '…',          // dono/talento
  en: { nome: '…', keyword: '…' },  // override inglese (opzionale)
}
```

- Per **modificare** un significato: cambia `descrizione`, `ombra`, `dono`.
- Per **tradurre** in inglese: completa l'oggetto `en` (se un campo manca, si
  usa l'italiano come fallback).
- Le **descrizioni dei campi** della mappa (cosa rappresenta ogni campo) sono in
  `campiDescrizioni` / `campiEN` nello stesso file.

I tooltip mostrano: descrizione del campo → significato del numero (nome,
keyword, descrizione, ombra, dono).

---

## Note tecniche

- Il motore (`calculator.js`) è **puro** (nessun effetto collaterale, nessun
  accesso al DOM) e testato. Non modificarlo senza rieseguire i test.
- **Differenza chiave dal documento dei prompt:** la formula del *Conflitto
  Base* è stata corretta secondo l'Excel originale (vedi `TECHNICAL.md`).
- Accessibilità: form con `fieldset`/`legend`, `aria-*` sui controlli, supporto
  `prefers-reduced-motion`, tooltip annunciati, contrasto adeguato.
- Stampa: foglio `@media print` ottimizzato (A4, sfondo bianco, sezioni non
  spezzate). Il pulsante *Salva / Stampa* salva la mappa e apre `window.print()`.
