# Documentazione Tecnica — Motore di Calcolo

Questo documento descrive il motore della Mappa dei Talenti
(`src/calculator.js`), ricostruito dal file Excel originale
`reference/MAPPA_DEI_TALENTI_COMPLETA.xlsm`.

---

## 1. Architettura e flusso dati

```
                ┌──────────────┐
   input ─────► │  main.js     │  validazione form, tema, lingua, eventi
                └──────┬───────┘
                       │ { nome, giorno, mese, anno, annoScelto }
                       ▼
                ┌──────────────┐
                │ calculator.js│  motore PURO (no DOM) → oggetto `mappa`
                └──────┬───────┘
                       │ mappa
        ┌──────────────┼───────────────┬──────────────┐
        ▼              ▼               ▼              ▼
   ┌─────────┐   ┌───────────┐   ┌───────────┐  ┌──────────┐
   │ ui.js   │   │significati│   │ storage.js│  │  i18n.js │
   │ render  │◄──│  tooltip  │   │localStorage│ │  IT/EN   │
   └─────────┘   └───────────┘   └───────────┘  └──────────┘
```

`calculator.js` non dipende da nulla: è testabile in isolamento
(`node src/calculator.js --test`).

---

## 2. Funzioni base

```js
digitSum(n)  // somma UNA volta le cifre di n.  digitSum(1981) = 19
riduci(n)    // somma le cifre finché n <= 22.  riduci(1999) = 28 → 10
```

`riduci` itera; l'Excel applicava 1–2 passaggi della stessa riduzione
(`IF(x<=22; x; sommaCifre(x))`). Per tutti gli input validi i due approcci
**coincidono** (l'iterazione è solo più robusta sui casi limite).

**Regola dello zero (`z22`)**: alcune operazioni sono *differenze*; quando una
differenza dà `0`, il risultato diventa `22`. Si applica SOLO alle differenze
(Conflitto Base, Giustificazioni, Personaggio), **non** dentro `riduci`.

---

## 3. Mappa cella Excel → variabile

Foglio `DATI&CALCOLI` (nascosto). Input letti da `MAPPA!D1..D5`.

| Excel | Variabile | Formula (sintesi) |
|-------|-----------|-------------------|
| B7 | `desiderio` | `riduci(giorno)` |
| B8 | `risposta` | `riduci(mese)` (mese 1–12, di fatto invariato) |
| B9 | `memoria` | `riduci(anno)` |
| E11 | `conflittoBase` | vedi §4 |
| E14 | pp verticale | `riduci(giorno + mese + anno)` |
| E15 | pp orizzontale | `riduci(Σ digitSum(giorno,mese,anno))` |
| B17 | `pp` | `max(verticale, orizzontale)` |
| C20 | `b_nido` | `riduci(desiderio + risposta)` |
| C26 | `b_rel` | `riduci(desiderio + memoria)` |
| C32 | `b_soc` | `riduci(risposta + memoria)` |
| C38 | `b_lav` | `riduci(b_nido + b_soc)` |
| C43 | `equilibrio` | `riduci(pp + b_lav)` |
| C21/27/33/39 | ambito.a | `riduci(desiderio + b)` |
| C22/28/34/40 | ambito.c | `riduci(b + equilibrio)` |
| C23/29/35/41 | ambito.sfumatura | `riduci(b + a + c)` |
| C44 | `prontoSoccorso` | `riduci(conflittoBase + b_lav)` |
| C45 | `chiaveEmozionale` | `riduci(b_rel + pp)` |
| C46 | `strumentoLavoroPotere` | `riduci(desiderio + equilibrio)` |
| C47 | `progettoSenso` | `riduci(desiderio + pp)` |
| D48 | `personaggio` | `z22(|conflittoBase − pp|)` |
| B54 | `ppAnnoScelto` | come pp ma con `annoScelto` |
| C57 | giust. nido | `z22(|desiderio − risposta|)` |
| C58 | giust. relazione | `z22(|desiderio − memoria|)` |
| C59 | giust. sociale | `z22(|risposta − memoria|)` |
| C60 | giust. lavoro | `z22(|giust_nido − giust_soc|)` |
| C61 | giust. equilibrio | `z22(|pp − giust_lav|)` |
| C62 | giust. pronto soccorso | `z22(|conflittoBase − giust_lav|)` |
| B65/C66/C67/C68 | super sequenza | `b=conflittoBase; a=riduci(cb+des); c=riduci(cb+eq); sf=riduci(b+a+c)` |
| C71 | `numeroDestino` | `riduci(b_nido + b_rel + b_soc + b_lav − conflittoBase)` |

---

## 4. Conflitto Base — la formula corretta ⚠️

Questa è l'unica vera **difformità** rispetto al documento dei prompt
(`reference/mappa_talenti_claude_code_prompts.md`), il cui testo descrittivo era
incoerente con il proprio valore di test. Ricostruzione dall'Excel:

```
ordina [desiderio, risposta, memoria] in modo decrescente → [mx, md, mn]

C11:  diff1 = mx − md ;  se diff1 == 0 → 22
C12:  mn    = minimo dei tre
E11:  conflittoBase = | diff1 − mn | ;  se == 0 → 22
```

Per Roberto `[19, 10, 1]` → `diff1 = 9`, `conflittoBase = |9 − 1| = 8` ✓

> La formula dei prompt usava `|diff1 − (md − mn)|`, che per Roberto dà
> `|9 − 9| = 0 → 22` ≠ 8. La versione qui implementata usa il **minimo**
> (`mn`), non `md − mn`, ed è verificata contro l'Excel (celle `B11/C11/C12/D11/E11`).

---

## 5. Grafo delle dipendenze (ordine di calcolo)

```
desiderio, risposta, memoria
        │
        ├── conflittoBase
        │
        ├── b_nido ─┐
        ├── b_soc ──┴─► b_lav ─► equilibrio ──► (a/c/sfumatura di tutti gli ambiti)
        ├── b_rel
        │
   pp ──┴────────────► equilibrio
                          │
            ┌─────────────┴───────────────┐
       elementi chiave              super sequenza, numeroDestino
```

Punto critico: **l'Equilibrio dipende da `b_lav`**, che dipende da `b_nido` e
`b_soc`. Quindi i `b` degli ambiti si calcolano *prima* dell'equilibrio, e solo
dopo si completano `a`, `c`, `sfumatura`.

---

## 6. Regole speciali

- **Numeri maestri 11 e 22**: `riduci` si ferma a `≤ 22`, quindi 11 e 22 NON
  vengono ulteriormente ridotti.
- **Regola 0→22**: applicata alle differenze (vedi §2).
- **`risposta`**: il mese 1–12 è già `≤ 22`; `riduci` lo lascia invariato salvo
  10/11/12 → 1/2/3 (coerente con l'Excel).
- **`numeroDestino`**: la sottrazione del `conflittoBase` avviene *prima* della
  riduzione: `riduci(Σ b − conflittoBase)`.

---

## 7. Output di `calcolaMappa(input)`

```js
{
  input: { nome, giorno, mese, anno, annoScelto },
  base: { desiderio, risposta, memoria },
  conflittoBase,
  personalitaProfonda: { verticale, orizzontale, risultato },
  equilibrio,
  ambiti: { nido|relazione|sociale|lavoro: { b, a, c, sfumatura } },
  elementiChiave: { prontoSoccorso, chiaveEmozionale, strumentoLavoroPotere, progettoSenso, personaggio },
  ppAnnoScelto: { verticale, orizzontale, risultato },
  giustificazioni: { nido, relazione, sociale, lavoro, equilibrio, prontoSoccorso },
  superSequenza: { b, a, c, sfumatura },
  numeroDestino,
  intermedi: { b_nido, b_rel, b_soc, b_lav, diff1, mx, md, mn }  // per il debug
}
```

---

## 8. API interna (esportata)

| Funzione | Descrizione |
|----------|-------------|
| `calcolaMappa(input)` | Calcola l'intera mappa. Lancia `Error` su input non valido. |
| `validaInput(input)` | Valida e normalizza; ritorna l'input pulito o lancia. |
| `riduci(n)` / `digitSum(n)` | Primitive numerologiche. |
| `verificaCalcoli(log?)` | Confronta col caso noto; ritorna `{ pass, totali, passati, risultati }`. |

---

## 9. Come estendere

- **Aggiungere un ambito**: definisci `b_<nuovo>` come somma ridotta delle basi
  rilevanti, poi `sequenzaAmbito(desiderio, b, equilibrio)` e aggiungilo a
  `ambiti` + a `i18n` (`ambito.*`) + al rendering in `ui.js` (`buildAmbiti`).
- **Cambiare i contenuti**: vedi `README.md` → *Aggiornare i significati*.
- **Verifica obbligatoria**: dopo ogni modifica al motore, esegui
  `npm test` e `npm run test:full`.
