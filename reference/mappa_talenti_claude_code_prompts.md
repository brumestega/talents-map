# Mappa dei Talenti — Prompts per Claude Code (Opus)
> Serie completa di prompts per sviluppare una Web App prototipo da integrare in un sito esistente.
> Ogni prompt è autonomo e progressivo. Seguire l'ordine indicato.

---

## CONTESTO GENERALE (da tenere sempre presente)

La **Mappa dei Talenti** è uno strumento del settore olistico che, partendo dalla data di nascita di una persona e da un anno di riferimento (anno "personalità professionale"), calcola una serie di numeri significativi organizzati in categorie chiamate "ambiti" (Nido, Relazione, Sociale, Lavoro) e altri elementi chiave della mappa personale.

Il sistema usa la **numerologia**: ogni numero viene "ridotto" sommando le sue cifre finché non risulta ≤ 22. Se una riduzione dà 0, si sostituisce con 22. I numeri 1–22 hanno significati specifici nel sistema (da definire e integrare in fasi successive).

---

## PROMPT 1 — Setup del progetto e motore di calcolo

```
Crea un nuovo progetto web app chiamato "mappa-talenti" con la seguente struttura:

mappa-talenti/
├── index.html
├── src/
│   ├── main.js          (entry point)
│   ├── calculator.js    (motore di calcolo puro)
│   ├── ui.js            (gestione interfaccia)
│   └── styles.css       (stili)
└── package.json

Tecnologie: Vanilla JS (ES modules), nessun framework, nessuna dipendenza esterna obbligatoria. 
Il progetto deve essere deployabile come file statici su qualsiasi hosting o CDN.

Implementa il file calculator.js con TUTTO il motore di calcolo della Mappa dei Talenti.
La logica è la seguente (reverse-engineered da un file Excel .xlsm originale e verificata):

---

### FUNZIONE BASE

```js
function riduci(n) {
  // Riduzione numerologica: somma le cifre finché n <= 22
  while (n > 22) {
    n = String(n).split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  return n;
}

function digitSum(n) {
  // Somma una volta le cifre di n
  return String(n).split('').reduce((acc, d) => acc + parseInt(d), 0);
}
```

---

### INPUT

```js
{
  nome: String,
  giorno: Number,   // 1–31
  mese: Number,     // 1–12
  anno: Number,     // 4 cifre, es. 1981
  annoScelto: Number // anno personalità professionale, es. 2023
}
```

---

### CALCOLI (in ordine, con dipendenze)

**TRE NUMERI BASE:**
```
desiderio = riduci(giorno)
risposta  = mese   // già 1–12, nessuna riduzione
memoria   = riduci(digitSum(anno))
// es: anno=1981 → digitSum=19 → 19<=22 → memoria=19
```

**CONFLITTO BASE:**
```
Ordina [desiderio, risposta, memoria] decrescente → [max, mid, min]
diff1 = max - mid;  if (diff1===0) diff1=22
diff2 = mid - min;  if (diff2===0) diff2=22
conflittoBase = Math.max(diff1, diff2) - Math.min(diff1, diff2)
if (conflittoBase===0) conflittoBase=22
// NB: equivalente a |diff1-diff2|, con regola dello 0→22
```

**PERSONALITÀ PROFONDA (anno di nascita):**
```
verticale     = riduci(anno + mese + giorno)
orizzontale   = riduci(digitSum(giorno) + digitSum(mese) + digitSum(anno))
pp            = Math.max(verticale, orizzontale)
```

**AMBITI — calcolo sequenziale (l'Equilibrio dipende da b_lav):**

Prima calcola b_nido e b_soc (necessari per b_lav):
```
b_nido = riduci(desiderio + risposta)
b_soc  = riduci(risposta + memoria)
b_lav  = riduci(b_nido + b_soc)
```

Poi calcola Equilibrio:
```
equilibrio = riduci(pp + b_lav)
```

Poi completa tutte le sequenze (B, A, C, Sfumatura):
```
// NIDO
seq_nido = {
  b: b_nido,
  a: riduci(desiderio + b_nido),
  c: riduci(b_nido + equilibrio),
  sfumatura: () => riduci(b_nido + a_nido + c_nido)
}

// RELAZIONE
b_rel = riduci(desiderio + memoria)
seq_relazione = {
  b: b_rel,
  a: riduci(desiderio + b_rel),
  c: riduci(b_rel + equilibrio),
  sfumatura: riduci(b+a+c)
}

// SOCIALE
seq_sociale = {
  b: b_soc,
  a: riduci(desiderio + b_soc),
  c: riduci(b_soc + equilibrio),
  sfumatura: riduci(b+a+c)
}

// LAVORO
seq_lavoro = {
  b: b_lav,
  a: riduci(desiderio + b_lav),
  c: riduci(b_lav + equilibrio),
  sfumatura: riduci(b+a+c)
}
```

**ELEMENTI CHIAVE:**
```
prontoSoccorso      = riduci(conflittoBase + b_lav)
chiaveEmozionale    = riduci(b_rel + pp)
strumentoLavoroPotere = riduci(desiderio + equilibrio)
progettoSenso       = riduci(desiderio + pp)
personaggio         = Math.abs(conflittoBase - pp); if (===0) → 22
```

**PERSONALITÀ PROFONDA ANNO SCELTO:**
```
vert_scelto = riduci(giorno + mese + annoScelto)
oriz_scelto = riduci(digitSum(giorno) + digitSum(mese) + digitSum(annoScelto))
ppAnnoScelto = Math.max(vert_scelto, oriz_scelto)
```

**GIUSTIFICAZIONI:**
```
giust_nido    = Math.abs(desiderio - risposta); if (===0) → 22
giust_rel     = Math.abs(desiderio - memoria);  if (===0) → 22
giust_soc     = Math.abs(risposta - memoria);   if (===0) → 22
giust_lav     = Math.abs(giust_nido - giust_soc); if (===0) → 22
giust_eq      = Math.abs(pp - giust_lav);       if (===0) → 22
giust_ps      = Math.abs(conflittoBase - giust_lav); if (===0) → 22
```

**SUPER SEQUENZA:**
```
super_b        = conflittoBase
super_a        = riduci(conflittoBase + desiderio)
super_c        = riduci(conflittoBase + equilibrio)
super_sfumatura = riduci(super_b + super_a + super_c)
```

**NUMERO DESTINO:**
```
numeroDestino = riduci(b_nido + b_rel + b_soc + b_lav - conflittoBase)
```

---

### OUTPUT della funzione calcolaMappa(input)

Restituisce un oggetto JavaScript con tutti i valori calcolati, strutturato così:

```js
{
  input: { nome, giorno, mese, anno, annoScelto },
  base: { desiderio, risposta, memoria },
  conflittoBase,
  personalitaProfonda: { verticale, orizzontale, risultato: pp },
  equilibrio,
  ambiti: {
    nido:      { b, a, c, sfumatura },
    relazione: { b, a, c, sfumatura },
    sociale:   { b, a, c, sfumatura },
    lavoro:    { b, a, c, sfumatura }
  },
  elementiChiave: {
    prontoSoccorso,
    chiaveEmozionale,
    strumentoLavoroPotere,
    progettoSenso,
    personaggio
  },
  ppAnnoScelto: { verticale, orizzontale, risultato: ppAnnoScelto },
  giustificazioni: { nido, relazione, sociale, lavoro, equilibrio, prontoSoccorso },
  superSequenza: { b, a, c, sfumatura },
  numeroDestino
}
```

---

### TEST DI VERIFICA

Aggiungi una funzione `verificaCalcoli()` che testa questi valori noti (Roberto, 28/1/1981, anno 2023):

```js
const expected = {
  base: { desiderio: 10, risposta: 1, memoria: 19 },
  conflittoBase: 8,
  personalitaProfonda: { risultato: 3 },
  equilibrio: 7,
  ambiti: {
    nido:      { b: 11, a: 21, c: 18, sfumatura: 5 },
    relazione: { b: 11, a: 21, c: 18, sfumatura: 5 },
    sociale:   { b: 20, a: 3,  c: 9,  sfumatura: 5 },
    lavoro:    { b: 4,  a: 14, c: 11, sfumatura: 11 }
  },
  elementiChiave: {
    prontoSoccorso: 12, chiaveEmozionale: 14,
    strumentoLavoroPotere: 17, progettoSenso: 13, personaggio: 5
  },
  ppAnnoScelto: { risultato: 18 },
  giustificazioni: { nido: 9, relazione: 9, sociale: 18, lavoro: 9, equilibrio: 6, prontoSoccorso: 1 },
  superSequenza: { b: 8, a: 18, c: 15, sfumatura: 5 },
  numeroDestino: 11
};
```

Esegui `verificaCalcoli()` alla console al caricamento in development mode e stampa PASS/FAIL per ogni campo.

Esporta `calcolaMappa` e `verificaCalcoli` da calculator.js.
```

---

## PROMPT 2 — Design System e UI di Input

```
Nel progetto "mappa-talenti" già creato, implementa il design system e la schermata di input.

### FILOSOFIA ESTETICA

Stile: **Mistico-moderno**. Non new-age kitsch, non generico. 
Pensa a un osservatorio astronomico trasformato in studio di consulenza di lusso: 
profondo, preciso, un po' cosmico, molto serio. 

Palette:
- Background: #0A0A0F (quasi nero, blu-notte)
- Surface: #12121A (card/pannelli)
- Accent primario: #C8A96E (oro antico, caldo)
- Accent secondario: #7B9ED9 (blu lunare)
- Testo primario: #F0EDE6 (bianco crema)
- Testo secondario: #8A8A9A (grigio lavanda)
- Bordi: rgba(200, 169, 110, 0.2) (oro trasparente)

Tipografia (usa Google Fonts):
- Display/Titoli: "Cormorant Garamond" (elegante, serif, old-world)
- Body/UI: "DM Sans" (moderno, leggibile, neutro)
- Numeri/Risultati: "Cormorant SC" (small caps, cifre bellissime)

Texture: aggiungi un sottile rumore grain all'html tramite un SVG filter o una pseudo-texture CSS.
Usa ::before con background-image: url("data:image/svg+xml,...") per il grain overlay.

### SCHERMATA 1: FORM DI INPUT

Crea una pagina di input elegante con:

1. **Header**: Logo/Titolo "MAPPA DEI TALENTI" in Cormorant Garamond, grande, centrato, 
   con sottotitolo "Scopri la tua mappa interiore" in DM Sans leggero.
   Aggiungi una linea decorativa sottile dorata sotto il titolo.

2. **Form card**: pannello centrale semi-trasparente (backdrop-filter: blur), bordo dorato sottile.
   Ombra interna lieve. Max-width: 520px, centrato.

3. **Campi del form**:
   - Nome / Cognome (text input)
   - Data di nascita: tre campi separati — Giorno (1-31), Mese (menu a tendina con nomi dei mesi in italiano), Anno (number, 4 cifre, min 1900, max anno corrente)
   - Anno di riferimento (ex "Anno Personalità Professionale"): number input, pre-compilato con l'anno corrente, con nota esplicativa sotto: "L'anno attuale o un anno futuro che senti significativo per te"

4. **Styling degli input**:
   - Sfondo trasparente, bordo inferiore dorato (stile underline), no border-box tradizionale
   - Label flottante (CSS-only float label animation)
   - Focus: bordo che si illumina con glow dorato
   - Placeholder: testo grigio-lavanda in DM Sans italic

5. **CTA Button**: "CALCOLA LA TUA MAPPA"
   - Bordo dorato, sfondo gradiente da trasparente a rgba(200,169,110,0.1)
   - Lettering in piccolo: tracking largo, maiuscolo
   - Hover: sfondo oro pieno, testo scuro, transizione 0.3s
   - Animazione click: piccolo pulse

6. **Sfondo**: 
   - Gradiente radiale da centro (blu più chiaro) verso i bordi (nero profondo)
   - Stelle puntiformi CSS (usa box-shadow su un elemento ::before con multiple shadows random, non JS)
   - Nessuna immagine esterna — tutto CSS

7. **Responsive**: funziona su mobile (padding laterali, font scaling, nessun overflow).

8. **Validazione**: 
   - Evidenzia in rosso-cremisi (non rosso aggressivo) i campi non validi
   - Messaggio di errore inline sotto ogni campo
   - Disabilita il submit se ci sono errori
   - Valida: giorno 1-31, mese 1-12, anno 4 cifre plausibile, nome non vuoto

9. Al submit, chiama `calcolaMappa(input)` da calculator.js e passa il risultato 
   alla funzione `mostraRisultati(mappa)` in ui.js (da implementare nel prompt successivo).
   Mostra un loader animato (spinner circolare dorato) durante il "calcolo" 
   (simula 800ms di delay anche se il calcolo è istantaneo — per dare peso all'esperienza).

Tutto il CSS deve essere in styles.css con variabili CSS ben documentate.
Usa @import per i Google Fonts (Cormorant Garamond 300,400,600,700; DM Sans 300,400,500; Cormorant SC 400,600).
```

---

## PROMPT 3 — Schermata dei Risultati (Layout e Struttura)

```
Nel progetto "mappa-talenti", implementa la funzione mostraRisultati(mappa) in ui.js 
e la schermata di visualizzazione della Mappa completa.

L'oggetto `mappa` ha la struttura definita nel Prompt 1.

### LAYOUT GENERALE RISULTATI

La pagina dei risultati sostituisce il form (transizione fade, 0.4s opacity).
Struttura a scroll verticale, max-width 900px, centrata.

**Sezioni nell'ordine:**

---

#### SEZIONE 0: INTESTAZIONE PERSONALE
```
╔══════════════════════════════╗
║  MAPPA DEI TALENTI DI [NOME] ║
║  Nato il GG/MM/AAAA          ║
║  Anno di riferimento: AAAA   ║
╚══════════════════════════════╝
```
Titolo grande in Cormorant Garamond, dorato.
Dati nascita in DM Sans leggero.
Bordo decorativo CSS con corner brackets stile art-deco.

---

#### SEZIONE 1: TRE NUMERI FONDAMENTALI
Tre card affiancate (flex/grid, su mobile in colonna):

| DESIDERIO DI VITA | RISPOSTA AUTOMATICA | MEMORIA GENEALOGICA |
|:-----------------:|:-------------------:|:-------------------:|
|        10         |          1          |         19          |

Ogni card:
- Numero grande in Cormorant SC, dorato, circa 72px
- Nome categoria piccolo sopra il numero, maiuscolo, tracking largo
- Sottile linea dorata sotto il numero
- Background: surface scuro, bordo oro trasparente

---

#### SEZIONE 2: CONFLITTO BASE e PERSONALITÀ PROFONDA
Due blocchi affiancati (50/50 su desktop, in colonna su mobile):

**Conflitto Base:**
- Numero grande
- Etichetta

**Personalità Profonda:**
- Mostra sia il valore Verticale che Orizzontale
- Evidenzia il Risultato (maggiore dei due) con colore dorato
- Piccola nota: "Metodo Verticale: [sum anno+mese+giorno] | Metodo Orizzontale: [sum cifre]"

---

#### SEZIONE 3: EQUILIBRIO (elemento centrale)
Blocco centrato, più grande degli altri.
Il numero dell'Equilibrio in dimensione extra-large (96px), con un alone/glow dorato CSS.
Etichetta: "EQUILIBRIO"
Piccola descrizione sotto: "Il punto di bilanciamento della tua mappa"

---

#### SEZIONE 4: I QUATTRO AMBITI
Titolo sezione: "I QUATTRO AMBITI"

Quattro card, ognuna con:
- Titolo ambito (NIDO / RELAZIONE / SOCIALE / LAVORO) con icona SVG inline semplice:
  - Nido: casa stilizzata
  - Relazione: due cerchi che si intersecano
  - Sociale: tre persone stilizzate
  - Lavoro: ingranaggio/stella
- Tre sotto-numeri disposti in triangolo:
  ```
        [A] Emozione Originale
       /                      \
  [B] Conflitto    [C] Risposta
  ```
  Con etichette B, A, C e il loro nome per esteso
- SFUMATURA (il quarto numero) in basso, separato da una linea, più piccolo

Layout: griglia 2×2 su desktop, colonna su mobile.
Colori differenziati per ambito:
- Nido: accent caldo (oro)
- Relazione: accent freddo (blu lunare)
- Sociale: verde salvia (#7EA89A)
- Lavoro: rosa antico (#C47B7B)
Ogni card usa il colore del suo ambito solo per il bordo superiore e le etichette (accent),
il resto rimane nel palette principale.

---

#### SEZIONE 5: ELEMENTI CHIAVE
Titolo: "ELEMENTI CHIAVE"

Griglia 3 colonne su desktop, 2 su tablet, 1 su mobile:
- Pronto Soccorso
- Chiave Emozionale
- Strumento Lavoro-Potere
- Progetto Senso
- Personaggio
- [spazio vuoto o decorativo]

Ogni card: numero grande + nome etichetta.

---

#### SEZIONE 6: PERSONALITÀ PROFONDA ANNO SCELTO
Simile alla sezione PP, ma con l'anno scelto.
Evidenziato con un bordo differente (blu lunare invece di oro).
Etichetta: "PERSONALITÀ PROFONDA [ANNO]"

---

#### SEZIONE 7: GIUSTIFICAZIONI
Sei valori in griglia compatta (3×2), titoli ridotti, numeri medi.
Etichette: Nido, Relazione, Sociale, Lavoro, Equilibrio, Pronto Soccorso.

---

#### SEZIONE 8: SUPER SEQUENZA
Card speciale, evidenziata, centrata.
Mostra B → A → C → Sfumatura in sequenza orizzontale con frecce tra loro.
Stile slightly different: bordo doppio, un po' più solenne.

---

#### SEZIONE 9: NUMERO DESTINO
Il finale. Numero enorme (128px?), centrato, con glow extra.
Etichetta: "NUMERO DESTINO — INTEGRALE DEI CONFLITTI"
Separatore decorativo sopra (linea con ornamento centrale).

---

#### FOOTER RISULTATI
Pulsante: "← NUOVA MAPPA" (torna al form, resetta)
Pulsante: "SALVA / STAMPA" (apre window.print() con stile @media print ottimizzato)

---

### ANIMAZIONI RISULTATI

Usa Intersection Observer per animare ogni sezione all'entrata:
- Fade in + translate Y da +20px a 0
- Stagger: ogni sezione 0.15s dopo la precedente
- I numeri nelle card fanno un count-up animato da 0 al valore finale (durata: 600ms, easing: ease-out)

### RESPONSIVE
- Mobile first: tutto in colonna singola
- Tablet (> 600px): alcune griglie 2 col
- Desktop (> 900px): layout completo

Implementa tutto questo in ui.js e aggiorna styles.css con le nuove classi.
Non usare librerie esterne per le animazioni — solo CSS transitions e Intersection Observer nativo.
```

---

## PROMPT 4 — Significati dei Numeri e Tooltip

```
Nel progetto "mappa-talenti", crea il file src/significati.js che contiene 
i significati di tutti i numeri da 1 a 22 per la Mappa dei Talenti.

Crea una struttura dati con placeholder per ciascun numero, strutturata così:

```js
export const significati = {
  1: {
    nome: "Il Principio",
    keyword: "Inizio · Volontà · Leadership",
    descrizione: "Il numero 1 rappresenta...", // placeholder da riempire
    ombra: "...", // aspetto shadow del numero
    dono: "..." // dono/talento associato
  },
  // ... per tutti i numeri 1-22
  22: {
    nome: "Il Costruttore Universale",
    keyword: "...",
    ...
  }
};
```

Usa nomi e keywords ispirati alla tradizione numerologica e al contesto del sistema 
(questo è un sistema olistico originale, non la numerologia Pitagorica standard —
usa quindi nomi evocativi e poetici che si adattino al contesto "ambiti" del sistema).

Numeri 1-22 con nomi suggeriti (da usare come base, personalizzabili):
1=Principio, 2=Dialogo, 3=Creatività, 4=Fondamento, 5=Movimento, 6=Armonia, 
7=Profondità, 8=Potere, 9=Completamento, 10=Rinnovamento, 11=Intuizione Superiore,
12=Servizio, 13=Trasformazione, 14=Temperanza, 15=Desiderio, 16=Rottura e Rivelazione,
17=Speranza, 18=Illusione, 19=Successo, 20=Giudizio, 21=Il Mondo Integrato, 22=Il Grande Costruttore.

---

Poi modifica ui.js per aggiungere **tooltip interattivi** su ogni numero nella schermata risultati:

- Al click (o hover su desktop) su qualsiasi numero nella mappa, mostra un **pannello tooltip**
- Il pannello appare con una transizione (slide-up da bottom + fade)
- Contenuto del pannello:
  - Il numero grande
  - Nome del numero
  - Keywords
  - Descrizione
  - Nota sul contesto: "In questo campo [NOME_CAMPO] il numero [N] indica..."
- Il pannello si chiude cliccando fuori o su una X
- Su mobile: pannello bottom-sheet che sale da sotto (80% altezza, scrollabile)
- Su desktop: popover posizionato vicino all'elemento cliccato (con smart positioning: 
  se l'elemento è nella metà destra, il popover appare a sinistra, e viceversa)

Stile tooltip: background surface più chiaro, bordo oro, stessa tipografia.
Non usare librerie — implementa il posizionamento manualmente con getBoundingClientRect().

Ogni numero nella schermata deve avere un attributo data-numero e data-campo
per permettere al tooltip di contestualizzare la spiegazione.
```

---

## PROMPT 5 — Persistenza, Storico e PDF

```
Nel progetto "mappa-talenti", aggiungi tre funzionalità:

### 1. PERSISTENZA LocalStorage

In un nuovo file src/storage.js, implementa:

```js
export function salvaMappa(mappa) { ... }       // salva in localStorage con timestamp
export function caricaUltimaMappa() { ... }     // carica l'ultima sessione
export function caricaStorico() { ... }         // array di mappe salvate (max 10)
export function eliminaMappa(id) { ... }        // rimuove per id
```

Ogni mappa salvata ha: id (timestamp), data salvataggio, tutti i dati.
Al caricamento dell'app: se esiste una mappa salvata, mostra un banner discreto:
"Hai una mappa precedente: [Nome], [data]. Vuoi rivederla?"
Con due pulsanti: "Rivedi" | "Ignora"

### 2. PANNELLO STORICO

Aggiungi un'icona (orologio/storia) nell'header che apre un pannello laterale (drawer)
con lo storico delle ultime 10 mappe calcolate.

Ogni riga storico mostra: Nome, Data nascita, Data calcolo, bottone "Riapri".

Il drawer scorre da destra (su desktop) o dal basso (su mobile).
Animazione: transform translateX / translateY con transition.
Backdrop semitrasparente che chiude il drawer al click.

### 3. ESPORTAZIONE PDF

Implementa la funzione `esportaPDF(mappa)` usando la Fetch API verso 
la stampa nativa del browser (window.print()).

Crea un foglio di stile @media print in styles.css che:
- Usa sfondo bianco, testo nero
- Mantiene la struttura a griglia dove possibile
- Nasconde header, footer, pulsanti, tooltip
- Aggiunge un header di stampa con nome e data
- Usa font serif (Cormorant Garamond rimane ok in stampa)
- Fa sì che ogni sezione principale non venga spezzata su pagine diverse (page-break-inside: avoid)
- Stampa in formato A4, margini 1.5cm
- Usa colori di contrasto (i bordi dorati diventano grigi scuri in stampa)

Il pulsante "SALVA / STAMPA" nella schermata risultati:
- Prima salva la mappa nello storage
- Poi offre un dialog con due opzioni: "Stampa (PDF)" | "Solo salva"
- Dialog custom CSS (no alert/confirm nativo), stile coerente con il design system

Aggiorna main.js per inizializzare storage e collegare tutti gli eventi.
```

---

## PROMPT 6 — Microinteractions, Accessibilità e Ottimizzazioni

```
Nel progetto "mappa-talenti", affina l'esperienza con queste migliorie:

### MICROINTERACTIONS

1. **Loader cosmico**: Sostituisci lo spinner semplice con un loader più evocativo:
   un cerchio che ruota lentamente con alcuni punti-stella che orbitano,
   e il testo che cambia ciclicamente: "Calcolando i tuoi pattern..." → 
   "Leggendo le frequenze..." → "Costruendo la tua mappa..." (ogni 400ms)

2. **Animazione numeri**: Quando i numeri appaiono nei risultati, 
   il count-up deve usare un easing custom (cubic-bezier per accelerazione esponenziale)
   che rende la finale più drammatica (rallenta prima di fermarsi sul numero finale).

3. **Hover sulle card degli ambiti**: Al hover, la card si alza leggermente 
   (transform: translateY(-4px)) con una ombra più profonda. 
   Il colore di accent dell'ambito si "diffonde" nel background con una transizione gradient.

4. **Pulsante calcola**: Aggiungi un'animazione "ripple" al click 
   (cerchio che si espande e sfuma, CSS-only con ::after).

5. **Transizione form→risultati**: Invece di un semplice fade, fai scorrere il form 
   verso l'alto e fuori dal viewport mentre i risultati entrano da sotto.

### ACCESSIBILITÀ (WCAG 2.1 AA)

1. Tutti gli elementi interattivi devono essere raggiungibili con Tab e attivabili con Enter/Space.
2. Aggiungi attributi aria-label descrittivi a tutti gli elementi non-testo (icone, pulsanti icon-only).
3. I tooltip devono essere annunciati dallo screen reader (role="tooltip", aria-describedby).
4. I numeri nei risultati devono avere un aria-label che include il nome del campo: 
   es. aria-label="Desiderio di Vita: 10".
5. Assicurati che il contrasto testo/sfondo sia ≥ 4.5:1 per il testo normale 
   e ≥ 3:1 per il testo grande (verifica con la palette scelta).
6. Aggiungi `prefers-reduced-motion` media query: 
   se l'utente lo ha impostato, disabilita tutte le animazioni non essenziali.
7. Il form deve avere `<fieldset>` e `<legend>` per i gruppi di campi correlati.
8. Gli errori di validazione devono essere collegati ai campi con aria-describedby.

### PERFORMANCE

1. Font: usa `font-display: swap` e preload dei font critici nell'HTML.
2. CSS: minimizza le repaint/reflow — usa solo `transform` e `opacity` per le animazioni,
   aggiungi `will-change: transform` alle card che animano.
3. Intersection Observer: usa `{ rootMargin: '0px 0px -50px 0px' }` per triggerare 
   l'animazione un po' prima che l'elemento sia completamente visibile.
4. Storage: debounce il salvataggio automatico (non salvare a ogni keystroke nel form).

### FIX MOBILE

1. Su iOS Safari, il backdrop-filter potrebbe causare problemi: 
   aggiungi un fallback background semi-opaco quando backdrop-filter non è supportato.
2. Assicurati che il viewport meta tag sia: 
   `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`
3. Aggiungi `env(safe-area-inset-*)` per i dispositivi con notch.
4. Touch events: assicurati che i tooltip si chiudano correttamente con touch fuori dall'area.

### DARK/LIGHT MODE (opzionale, bonus)

Aggiungi un toggle nell'header per switchare tra la modalità scura (default) 
e una modalità chiara alternativa:
- Light: background #F5F2EC (pergamena), testo #1A1A2E, accenti invariati
- Salva la preferenza in localStorage
- Rispetta anche `prefers-color-scheme: light` come default se l'utente non ha scelto

Aggiorna styles.css con le variabili CSS corrispondenti usando :root e [data-theme="light"].
```

---

## PROMPT 7 — Integrazione nel Sito Web e Deployment

```
Il progetto "mappa-talenti" deve essere integrato come widget/sezione in un sito 
WordPress/sito statico esistente. Prepara tutte le versioni necessarie.

### VERSIONE 1: iFrame Embeddable

Crea un file `embed.html` che è una versione standalone ottimizzata per iFrame:
- Nessun header/footer del sito host
- Si ridimensiona dinamicamente: usa `window.postMessage` per comunicare l'altezza 
  al sito padre, in modo che l'iFrame si adatti al contenuto
- Aggiungi un'opzione di configurazione via URL params:
  `embed.html?accentColor=%23C8A96E&bgColor=%230A0A0F&lang=it`

```html
<!-- Snippet da incollare nel sito host -->
<iframe 
  src="https://tuosito.it/mappa-talenti/embed.html" 
  id="mappa-talenti-frame"
  width="100%" 
  frameborder="0" 
  scrolling="no"
  title="Mappa dei Talenti">
</iframe>
<script>
  window.addEventListener('message', function(e) {
    if (e.data.type === 'mappa-height') {
      document.getElementById('mappa-talenti-frame').style.height = e.data.height + 'px';
    }
  });
</script>
```

### VERSIONE 2: Web Component

Crea `src/mappa-talenti-component.js` che definisce un Custom Element:
```html
<mappa-talenti accent-color="#C8A96E" lang="it"></mappa-talenti>
```

Il Web Component:
- Usa Shadow DOM per isolamento degli stili
- Accetta attributi: accent-color, bg-color, lang, show-tooltips (default: true)
- Dispatcha un custom event `mappa-calcolata` con i risultati quando il calcolo è completato:
  ```js
  this.dispatchEvent(new CustomEvent('mappa-calcolata', { detail: mappa, bubbles: true }));
  ```
- Funziona standalone senza dipendenze esterne

### VERSIONE 3: Script tag drop-in

Crea `mappa-talenti.bundle.js` (usando esbuild o uno script di build manuale con concatenazione):
Un singolo file JS che, incluso in qualsiasi pagina HTML con:
```html
<div id="mappa-talenti-root"></div>
<script src="mappa-talenti.bundle.js"></script>
```
monta automaticamente l'app nel div con id `mappa-talenti-root`.

### CONFIGURAZIONE E PARAMETRI

Crea `src/config.js` con tutte le opzioni configurabili:
```js
export const config = {
  lang: 'it',                          // 'it' | 'en'
  showTooltips: true,                  // mostra i tooltip sui numeri
  showStorico: true,                   // mostra il pannello storico
  showPdfExport: true,                 // mostra il pulsante stampa
  animationDuration: 600,              // ms per le animazioni numeri
  loaderDelay: 800,                    // ms di delay artificiale per il loader
  analyticsCallback: null,             // funzione opzionale: callback(evento, dati)
  // es: (event, data) => gtag('event', event, data)
};
```

### CI/CD E BUILD

Crea `package.json` con questi script:
```json
{
  "scripts": {
    "dev": "npx serve . --port 3000",
    "build": "node build.js",
    "test": "node src/calculator.js --test",
    "lint": "npx eslint src/"
  }
}
```

Crea `build.js` che:
1. Esegue i test (verificaCalcoli)
2. Concatena tutti i file JS in ordine di dipendenza
3. Minifica con una regex semplice (rimuovi commenti e whitespace multipli)
4. Crea `dist/` con index.html, styles.css, mappa-talenti.bundle.js, embed.html

### README

Crea `README.md` che documenta:
- Come avviare in development
- Come fare il build
- Come integrare nel sito (3 metodi)
- Come personalizzare i colori e parametri
- Come aggiungere i significati dei numeri in significati.js
- Struttura del progetto
- Note tecniche sul motore di calcolo (con riferimento al file Excel originale)
```

---

## PROMPT 8 — Internazionalizzazione e Contenuti

```
Nel progetto "mappa-talenti", aggiungi il supporto multilingua (IT/EN) 
e inizia a popolare i contenuti del sistema.

### SISTEMA i18n

Crea `src/i18n.js` con un sistema leggero di internazionalizzazione:

```js
const translations = {
  it: {
    // Labels
    'app.title': 'Mappa dei Talenti',
    'app.subtitle': 'Scopri la tua mappa interiore',
    'form.nome': 'Nome e Cognome',
    'form.giorno': 'Giorno',
    'form.mese': 'Mese',
    'form.anno': 'Anno di nascita',
    'form.annoScelto': 'Anno di riferimento',
    'form.annoScelto.note': 'L\'anno attuale o un anno futuro significativo',
    'form.submit': 'Calcola la tua mappa',
    'results.back': '← Nuova mappa',
    'results.save': 'Salva / Stampa',
    // Sezioni
    'section.base': 'I Tre Numeri Fondamentali',
    'section.ambiti': 'I Quattro Ambiti',
    'section.elementiChiave': 'Elementi Chiave',
    'section.giustificazioni': 'Giustificazioni',
    'section.superSequenza': 'Super Sequenza',
    'section.numeroDestino': 'Numero Destino',
    // Campi
    'campo.desiderio': 'Desiderio di Vita',
    'campo.risposta': 'Risposta Automatica',
    'campo.memoria': 'Memoria Genealogica',
    'campo.conflittoBase': 'Conflitto Base',
    'campo.pp': 'Personalità Profonda',
    'campo.equilibrio': 'Equilibrio',
    'campo.ppAnnoScelto': 'Personalità Profonda Anno Scelto',
    'campo.prontoSoccorso': 'Pronto Soccorso',
    'campo.chiaveEmozionale': 'Chiave Emozionale',
    'campo.strumento': 'Strumento Lavoro-Potere',
    'campo.progetto': 'Progetto Senso',
    'campo.personaggio': 'Personaggio',
    'campo.numeroDestino': 'Numero Destino — Integrale dei Conflitti',
    // Ambiti
    'ambito.nido': 'Nido',
    'ambito.relazione': 'Relazione',
    'ambito.sociale': 'Sociale',
    'ambito.lavoro': 'Lavoro',
    // Sequenza
    'seq.b': 'Conflitto',
    'seq.a': 'Emozione Originale',
    'seq.c': 'Risposta',
    'seq.sfumatura': 'Sfumatura',
    // Mesi
    'mesi': ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno',
             'Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
  },
  en: {
    'app.title': 'Talent Map',
    'app.subtitle': 'Discover your inner map',
    // ... traduzione completa in inglese
    // (segui lo stesso schema IT, con terminologia appropriata per il contesto olistico in inglese)
  }
};

export function t(key) { ... }           // ritorna la stringa tradotta
export function setLang(lang) { ... }    // cambia lingua e aggiorna il DOM
export function getCurrentLang() { ... } // ritorna 'it' o 'en'
```

Aggiungi un toggle lingua IT/EN nell'header (due parole cliccabili, stile minimal).
Il cambio lingua ri-renderizza solo le etichette (non ricalcola) aggiornando data-i18n attributes nel DOM.

### CONTENUTI SIGNIFICATI (PLACEHOLDER EVOLUTI)

In `significati.js`, sostituisci i placeholder con descrizioni evocative e coerenti 
con il sistema (inventate ma plausibili per un contesto olistico professionale):

Esempio formato (fai tutti e 22):
```js
11: {
  nome: "L'Intuizione Superiore",
  keyword: "Visione · Illuminazione · Sensibilità",
  descrizione: "L'Undici è il primo numero maestro. Porta con sé una sensibilità amplificata al mondo invisibile, una capacità di cogliere ciò che sfugge agli altri. Chi porta questo numero ha il dono della connessione tra i piani.",
  ombra: "L'ombra dell'Undici è l'ansia, la sovra-stimolazione e la difficoltà a stare nel concreto. La sfida è portare la visione nella realtà senza perdervisi.",
  dono: "Il dono è la capacità profetica, l'empatia profonda e l'ispirazione artistica o spirituale che tocca gli altri.",
  en: {
    nome: "The Higher Intuition",
    keyword: "Vision · Illumination · Sensitivity",
    descrizione: "...",
    ombra: "...",
    dono: "..."
  }
}
```

### DESCRIZIONI CONTESTUALI DEI CAMPI

Aggiungi in `significati.js` anche delle descrizioni contestuali per ogni campo della mappa,
che spiegano COSA rappresenta quel campo nel sistema (non il numero, ma il campo stesso):

```js
export const campiDescrizioni = {
  desiderio: "Il Desiderio di Vita è la vibrazione fondamentale del giorno di nascita. Rappresenta il motore primario, ciò verso cui l'anima tende istintivamente.",
  risposta: "La Risposta Automatica è il pattern reattivo di base, legato al mese di nascita. È il modo in cui rispondi istintivamente alle situazioni prima ancora di pensare.",
  memoria: "La Memoria Genealogica contiene il codice familiare e ancestrale. È ciò che hai ereditato — consapevolmente o meno — dalle linee che ti precedono.",
  conflittoBase: "Il Conflitto Base è la tensione primaria tra le tue tre forze fondamentali. Non è un ostacolo: è il carburante della tua crescita.",
  pp: "La Personalità Profonda rivela la tua natura essenziale: il modo in cui sei strutturato internamente al di là delle maschere e dei ruoli.",
  equilibrio: "L'Equilibrio è il tuo punto di fulcro. Quando sei allineato con questo numero, le cose scorrono. È la frequenza del tuo centro.",
  // ... per tutti i campi
};
```

Questi testi appariranno nei tooltip come introduzione prima del significato del numero.
```

---

## PROMPT 9 — Test, Debug e Documentazione Tecnica

```
Nel progetto "mappa-talenti", aggiungi una suite di test e la documentazione tecnica completa.

### TEST SUITE (src/tests.js)

Crea una suite di test che verifica il motore di calcolo con múltiple date di nascita.
Usa un formato semplice (no framework esterno):

```js
function test(nome, fn) { ... }
function assertEqual(a, b, msg) { ... }
function runAllTests() { ... }
```

Test da implementare:

**Test 1: Caso base (Roberto 28/1/1981)**
Verifica tutti i valori contro l'output noto dell'Excel.

**Test 2: Riduzione numerologica edge cases**
- riduci(1) → 1
- riduci(22) → 22  (non ridurre i 22!)
- riduci(23) → 5
- riduci(99) → 18
- riduci(0) → ... (gestisci il caso 0)

**Test 3: Regola zero→22**
- Conflitto Base quando due numeri base sono uguali
- Personaggio quando conflittoBase == pp

**Test 4: Date limite**
- 1/1/1900 (anno minimo)
- 31/12/2010 (anno massimo plausibile)
- Giorno 29 (Febbraio, il mese giusto)
- Mese 12, Giorno 31

**Test 5: Anno scelto**
- Anno scelto = anno di nascita (caso raro)
- Anno scelto molto lontano nel futuro (es. 2050)

**Test 6: Consistenza interna**
- Verifica che equilibrio = riduci(pp + b_lav) per qualsiasi input
- Verifica che numeroDestino = riduci(b_nido + b_rel + b_soc + b_lav - conflittoBase)

Aggiungi un pannello di debug nascosto nell'UI (accessibile con ?debug=true nell'URL):
- Mostra tutti i valori intermedi del calcolo
- Mostra il JSON completo dell'oggetto mappa
- Permette di inserire manualmente un oggetto mappa JSON per testare la visualizzazione

### DOCUMENTAZIONE TECNICA

Crea `TECHNICAL.md` con:

1. **Architettura**: Diagramma ASCII della struttura del progetto e flusso dati
2. **Motore di Calcolo**: Spiegazione completa della logica con esempi
3. **Ordine di Calcolo**: Grafo delle dipendenze (quale calcolo dipende da quale)
4. **Regole Speciali**: La regola 0→22, i numeri maestri (11, 22), la riduzione iterata
5. **Differenze dall'Excel**: Note su eventuali difformità o semplificazioni fatte
6. **Come Aggiornare i Significati**: Guida passo-passo per il content editor
7. **Come Aggiungere un Ambito**: Guida per estendere il sistema
8. **API Interna**: Documentazione JSDoc di tutte le funzioni esportate

### GESTIONE ERRORI ROBUSTA

Aggiungi error handling in calculator.js:
- Input validation con messaggi chiari
- try/catch con errori descrittivi
- Valori di fallback sicuri per input edge-case
- Log strutturato in development: console.group('Mappa Calcoli') con dettagli

In ui.js:
- Gestisci il caso in cui calcolaMappa() lanci un errore (mostra un messaggio user-friendly)
- Gestisci il caso in cui localStorage non sia disponibile (private browsing, iOS restrictions)
- Aggiungi un error boundary visuale: se un rendering fallisce, mostra un riquadro di errore 
  invece di lasciare la pagina rotta
```

---

## PROMPTS FUTURI (Note per Sviluppi Successivi)

> Questi non sono ancora prompts pronti, ma aree da esplorare in una seconda fase:

**FASE 2 — Contenuti avanzati:**
- Inserimento dei veri significati dei numeri forniti dal professionista
- Testi personalizzati per ogni combinazione di ambito+numero (es. "Conflitto Nido con numero 11")
- Generazione di un testo narrativo automatico che descriva la mappa completa

**FASE 3 — Backend e autenticazione:**
- API REST (Node.js/Fastify) per salvare mappe su database
- Account utente con login
- Dashboard operatore per consultare le mappe dei clienti
- Condivisione mappa via link (mappa pubblica read-only)

**FASE 4 — Funzionalità premium:**
- Comparazione di due mappe (compatibilità)
- Timeline della PP negli anni (visualizzazione multi-anno)
- Report PDF professionale generato server-side (Puppeteer/Playwright)
- Integrazione con calendario: calcolo della PP per ogni giorno/mese

**FASE 5 — Monetizzazione:**
- Paywall per il risultato completo (mostra solo parzialmente senza account)
- Pacchetti consulenza collegati
- White-label per altri professionisti

---

## NOTE OPERATIVE PER CLAUDE CODE

1. **Ogni prompt è autonomo**: puoi passarlo direttamente a Claude Code dopo aver completato il precedente.
2. **Verifica sempre**: dopo ogni prompt, esegui `verificaCalcoli()` in console per assicurarti che il motore di calcolo sia intatto.
3. **Git**: fai un commit dopo ogni prompt completato con un messaggio descrittivo.
4. **File da non toccare mai**: una volta verificato `calculator.js`, modificalo solo se strettamente necessario (e ri-verifica i test).
5. **Design**: i prompt di UI sono intenzionalmente dettagliati ma lasciano libertà creativa nell'implementazione — Claude Code può fare scelte migliori su dettagli specifici.
6. **Priorità**: se hai dubbi su cosa implementare prima, l'ordine è: 1→2→3→4. Gli altri sono enhancement.
