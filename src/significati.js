/**
 * significati.js — Significati dei numeri 1..22 e descrizioni dei campi.
 * ---------------------------------------------------------------------------
 * PROTOTIPO: i testi sono evocativi e plausibili per un contesto olistico,
 * ma sono PLACEHOLDER. Andranno sostituiti con i contenuti definitivi forniti
 * dalla professionista. Struttura pronta per il bilingue (IT + override `en`).
 *
 * Per aggiornare un numero: modifica `descrizione`, `ombra`, `dono`.
 * Per tradurre: aggiungi/aggiorna l'oggetto `en` dentro al numero.
 * ---------------------------------------------------------------------------
 */

export const significati = {
  1: {
    nome: 'Il Principio',
    keyword: 'Inizio · Volontà · Identità',
    descrizione: "L'Uno è la scintilla che precede ogni cosa. È la volontà allo stato puro, l'impulso a esistere e a lasciare un segno. Chi porta questo numero apre strade dove gli altri vedono muri.",
    ombra: "L'ombra dell'Uno è l'egocentrismo e l'impazienza: la fretta di affermarsi che dimentica gli altri, o la solitudine di chi non sa delegare.",
    dono: "Il dono è il coraggio di iniziare, la capacità di guidare e di trasformare un'intuizione in un primo, concreto passo.",
    en: { nome: 'The Beginning', keyword: 'Onset · Will · Identity' },
  },
  2: {
    nome: 'Il Dialogo',
    keyword: 'Relazione · Ascolto · Misura',
    descrizione: "Il Due è il primo incontro, lo spazio tra te e l'altro. Porta la sensibilità di chi sa ascoltare, mediare, tenere insieme ciò che è diviso.",
    ombra: "L'ombra è la dipendenza dall'approvazione, l'indecisione e la paura del conflitto che porta a sparire pur di non disturbare.",
    dono: 'Il dono è la diplomazia, la cooperazione e una sensibilità che percepisce i bisogni non detti.',
    en: { nome: 'The Dialogue', keyword: 'Relation · Listening · Measure' },
  },
  3: {
    nome: 'La Creatività',
    keyword: 'Espressione · Gioia · Immaginazione',
    descrizione: 'Il Tre è la nascita della forma: il bambino che gioca, la parola che diventa storia. È energia che vuole esprimersi e contagiare di vita.',
    ombra: 'L\'ombra è la dispersione, la superficialità e la difficoltà a portare a termine ciò che con tanto entusiasmo è stato iniziato.',
    dono: 'Il dono è la comunicazione, l\'arte e la capacità di rendere leggero ciò che pesa.',
    en: { nome: 'Creativity', keyword: 'Expression · Joy · Imagination' },
  },
  4: {
    nome: 'Il Fondamento',
    keyword: 'Struttura · Stabilità · Concretezza',
    descrizione: 'Il Quattro è la casa che resiste al vento. Porta ordine, metodo e la pazienza di costruire mattone su mattone ciò che durerà.',
    ombra: "L'ombra è la rigidità, il controllo e la paura del cambiamento che trasforma la solidità in prigione.",
    dono: "Il dono è l'affidabilità, la disciplina e la capacità di dare forma stabile ai sogni degli altri.",
    en: { nome: 'The Foundation', keyword: 'Structure · Stability · Concreteness' },
  },
  5: {
    nome: 'Il Movimento',
    keyword: 'Libertà · Cambiamento · Esperienza',
    descrizione: "Il Cinque è il vento che cambia direzione. Vive di curiosità, di viaggi e di esperienze, e rifiuta ogni gabbia. È il numero dei sensi e dell'avventura.",
    ombra: "L'ombra è l'irrequietezza, l'eccesso e l'incostanza: la fuga continua che non mette mai radici.",
    dono: "Il dono è l'adattabilità, il magnetismo e la capacità di portare aria nuova ovunque arrivi.",
    en: { nome: 'Movement', keyword: 'Freedom · Change · Experience' },
  },
  6: {
    nome: "L'Armonia",
    keyword: 'Cura · Bellezza · Responsabilità',
    descrizione: 'Il Sei è il calore del focolare e la cura per chi si ama. Cerca la bellezza e l\'equilibrio, e si fa carico volentieri del benessere altrui.',
    ombra: "L'ombra è il sacrificio eccessivo, il controllo affettivo e la tendenza a perdersi nei bisogni degli altri.",
    dono: 'Il dono è l\'amore responsabile, il senso estetico e la capacità di creare armonia intorno a sé.',
    en: { nome: 'Harmony', keyword: 'Care · Beauty · Responsibility' },
  },
  7: {
    nome: 'La Profondità',
    keyword: 'Ricerca · Interiorità · Silenzio',
    descrizione: "Il Sette è il pozzo profondo. Cerca la verità sotto la superficie, ama il silenzio e lo studio, e ha bisogno di solitudine per ritrovarsi.",
    ombra: "L'ombra è l'isolamento, lo scetticismo e una mente che analizza tanto da non sentire più il cuore.",
    dono: "Il dono è la saggezza, l'intuito analitico e la capacità di vedere ciò che è nascosto.",
    en: { nome: 'Depth', keyword: 'Inquiry · Interiority · Silence' },
  },
  8: {
    nome: 'Il Potere',
    keyword: 'Forza · Abbondanza · Realizzazione',
    descrizione: "L'Otto è la forza che muove il mondo materiale. Porta ambizione, capacità di gestione e il talento di trasformare la visione in risultati concreti.",
    ombra: "L'ombra è l'avidità, il bisogno di controllo e la confusione tra il proprio valore e ciò che si possiede.",
    dono: "Il dono è la leadership concreta, la giustizia e la capacità di generare e gestire abbondanza.",
    en: { nome: 'Power', keyword: 'Force · Abundance · Achievement' },
  },
  9: {
    nome: 'Il Completamento',
    keyword: 'Compassione · Saggezza · Chiusura',
    descrizione: 'Il Nove è il cerchio che si chiude. Porta una visione ampia e compassionevole, la capacità di lasciar andare e di servire qualcosa di più grande di sé.',
    ombra: "L'ombra è il vittimismo, la malinconia e la difficoltà a chiudere ciò che è giunto al termine.",
    dono: "Il dono è l'umanità, la generosità e la saggezza di chi ha vissuto e sa trasmettere.",
    en: { nome: 'Completion', keyword: 'Compassion · Wisdom · Closure' },
  },
  10: {
    nome: 'Il Rinnovamento',
    keyword: 'Ciclo · Fortuna · Nuovo Inizio',
    descrizione: 'Il Dieci è la ruota che gira: ogni fine contiene un nuovo principio. Porta la capacità di reinventarsi e di cogliere le occasioni quando il ciclo cambia.',
    ombra: "L'ombra è l'attaccamento al passato e la paura di ricominciare quando la ruota chiede di girare.",
    dono: 'Il dono è la resilienza, il senso del tempo giusto e la capacità di rinascere.',
    en: { nome: 'Renewal', keyword: 'Cycle · Fortune · New Beginning' },
  },
  11: {
    nome: "L'Intuizione Superiore",
    keyword: 'Visione · Illuminazione · Sensibilità',
    descrizione: "L'Undici è il primo numero maestro. Porta una sensibilità amplificata verso ciò che gli altri non vedono e la capacità di connettere i piani del reale e dell'invisibile.",
    ombra: "L'ombra è l'ansia, la sovra-stimolazione e la difficoltà a restare nel concreto senza disperdersi.",
    dono: "Il dono è l'ispirazione, l'empatia profonda e una visione che può illuminare il cammino degli altri.",
    en: { nome: 'The Higher Intuition', keyword: 'Vision · Illumination · Sensitivity' },
  },
  12: {
    nome: 'Il Servizio',
    keyword: 'Dedizione · Prova · Resa',
    descrizione: 'Il Dodici è la sospensione che insegna. Porta la disponibilità a servire e ad attendere, e una lezione di umiltà che precede ogni vera crescita.',
    ombra: "L'ombra è il sacrificio inutile, la passività e il sentirsi vittima delle circostanze.",
    dono: "Il dono è la capacità di vedere le cose da un'altra prospettiva e di trasformare l'attesa in saggezza.",
    en: { nome: 'Service', keyword: 'Devotion · Trial · Surrender' },
  },
  13: {
    nome: 'La Trasformazione',
    keyword: 'Morte · Rinascita · Coraggio',
    descrizione: 'Il Tredici è la soglia. Porta la forza di lasciar morire ciò che non serve più per far spazio al nuovo. Non è un numero di sventura, ma di metamorfosi.',
    ombra: "L'ombra è la resistenza al cambiamento, la stagnazione e la paura di perdere ciò che è già finito.",
    dono: "Il dono è il coraggio della trasformazione e la capacità di rinascere più autentici.",
    en: { nome: 'Transformation', keyword: 'Death · Rebirth · Courage' },
  },
  14: {
    nome: 'La Temperanza',
    keyword: 'Equilibrio · Alchimia · Pazienza',
    descrizione: 'Il Quattordici è l\'arte di mescolare gli opposti nella giusta misura. Porta moderazione, capacità di sintesi e la pazienza di chi sa attendere il momento giusto.',
    ombra: "L'ombra è l'eccesso, l'impazienza e la difficoltà a trovare la misura tra desiderio e controllo.",
    dono: "Il dono è la capacità di armonizzare forze contrastanti e di guarire ciò che è squilibrato.",
    en: { nome: 'Temperance', keyword: 'Balance · Alchemy · Patience' },
  },
  15: {
    nome: 'Il Desiderio',
    keyword: 'Passione · Magnetismo · Materia',
    descrizione: 'Il Quindici è la forza istintiva che attrae e lega. Porta magnetismo, sensualità e una vitalità potente che chiede di essere riconosciuta, non repressa.',
    ombra: "L'ombra è l'attaccamento, la dipendenza e l'illusione di poter possedere ciò che si ama.",
    dono: "Il dono è la vitalità, il carisma e la capacità di abitare pienamente la materia e i sensi.",
    en: { nome: 'Desire', keyword: 'Passion · Magnetism · Matter' },
  },
  16: {
    nome: 'La Rottura e la Rivelazione',
    keyword: 'Crollo · Verità · Liberazione',
    descrizione: 'Il Sedici è il fulmine che abbatte la torre. Porta crisi improvvise che spazzano via il falso, e nella rovina rivela ciò che è autentico e indistruttibile.',
    ombra: "L'ombra è l'orgoglio che precede la caduta e la tentazione di ricostruire le stesse illusioni.",
    dono: "Il dono è la liberazione, l'autenticità e la capacità di rinascere su fondamenta vere.",
    en: { nome: 'Rupture and Revelation', keyword: 'Collapse · Truth · Liberation' },
  },
  17: {
    nome: 'La Speranza',
    keyword: 'Fede · Guarigione · Stella',
    descrizione: 'Il Diciassette è la stella che appare dopo la tempesta. Porta fiducia nel futuro, capacità di guarire e una serenità che ispira chi è intorno.',
    ombra: "L'ombra è l'illusione ingenua, l'idealismo che ignora la realtà e la delusione che ne segue.",
    dono: "Il dono è la fede, l'ispirazione e la capacità di riportare luce e fiducia dove c'era buio.",
    en: { nome: 'Hope', keyword: 'Faith · Healing · Star' },
  },
  18: {
    nome: "L'Illusione",
    keyword: 'Inconscio · Sogno · Mistero',
    descrizione: "Il Diciotto è la notte di luna, dove le forme si confondono. Porta immaginazione potente, sensibilità psichica e l'invito ad attraversare le proprie paure più profonde.",
    ombra: "L'ombra è l'inganno, la confusione emotiva e il timore di ciò che non si comprende.",
    dono: "Il dono è l'immaginazione fertile, l'intuito notturno e la capacità di navigare il mondo dei sogni.",
    en: { nome: 'Illusion', keyword: 'Unconscious · Dream · Mystery' },
  },
  19: {
    nome: 'Il Successo',
    keyword: 'Luce · Realizzazione · Gioia',
    descrizione: 'Il Diciannove è il sole pieno. Porta vitalità, fiducia e la capacità di realizzarsi splendendo di luce propria, illuminando anche gli altri.',
    ombra: "L'ombra è la vanità, l'eccesso di sé e la dipendenza dal riconoscimento esterno.",
    dono: "Il dono è il calore, l'autostima sana e la capacità di portare successo condiviso.",
    en: { nome: 'Success', keyword: 'Light · Achievement · Joy' },
  },
  20: {
    nome: 'Il Giudizio',
    keyword: 'Risveglio · Vocazione · Rinascita',
    descrizione: 'Il Venti è la chiamata che risveglia. Porta una nuova consapevolezza, il bisogno di rispondere a una vocazione e la capacità di rinascere a un livello più alto.',
    ombra: "L'ombra è il giudizio severo, verso sé e gli altri, e la difficoltà a perdonare il passato.",
    dono: "Il dono è il discernimento, la capacità di rinnovamento profondo e l'ascolto della chiamata interiore.",
    en: { nome: 'Judgement', keyword: 'Awakening · Calling · Rebirth' },
  },
  21: {
    nome: 'Il Mondo Integrato',
    keyword: 'Compimento · Unità · Pienezza',
    descrizione: 'Il Ventuno è il cerchio che abbraccia tutto. Porta il senso del compimento, l\'integrazione delle parti e la gioia di chi ha trovato il proprio posto nel mondo.',
    ombra: "L'ombra è l'accontentarsi, la chiusura del cerchio prima del tempo e la paura di ripartire.",
    dono: "Il dono è la realizzazione piena, la visione d'insieme e la capacità di danzare con la vita.",
    en: { nome: 'The Integrated World', keyword: 'Fulfillment · Unity · Wholeness' },
  },
  22: {
    nome: 'Il Grande Costruttore',
    keyword: 'Maestria · Visione · Concretezza',
    descrizione: "Il Ventidue è il secondo numero maestro: il visionario che sa costruire. Porta la capacità rara di trasformare un grande sogno in un'opera concreta e duratura per molti.",
    ombra: "L'ombra è la pressione schiacciante del potenziale inespresso e la tentazione di usare il talento per sé soltanto.",
    dono: "Il dono è la maestria pratica, la visione ampia e la capacità di lasciare un'eredità al mondo.",
    en: { nome: 'The Master Builder', keyword: 'Mastery · Vision · Concreteness' },
  },
};

/**
 * Descrizioni contestuali dei CAMPI della mappa (cosa rappresenta il campo,
 * non il numero). Compaiono nel tooltip come introduzione.
 */
export const campiDescrizioni = {
  desiderio: "Il Desiderio di Vita è la vibrazione fondamentale del giorno di nascita. Rappresenta il motore primario, ciò verso cui l'anima tende istintivamente.",
  risposta: "La Risposta Automatica è il pattern reattivo di base, legato al mese di nascita. È il modo in cui rispondi istintivamente alle situazioni prima ancora di pensare.",
  memoria: "La Memoria Genealogica contiene il codice familiare e ancestrale. È ciò che hai ereditato — consapevolmente o meno — dalle linee che ti precedono.",
  conflittoBase: "Il Conflitto Base è la tensione primaria tra le tue tre forze fondamentali. Non è un ostacolo: è il carburante della tua crescita.",
  pp: "La Personalità Profonda rivela la tua natura essenziale: il modo in cui sei strutturato internamente, al di là delle maschere e dei ruoli.",
  equilibrio: "L'Equilibrio è il tuo punto di fulcro. Quando sei allineato con questo numero, le cose scorrono. È la frequenza del tuo centro.",
  ppAnnoScelto: "La Personalità Profonda dell'Anno Scelto mostra la qualità che attraversa l'anno di riferimento: il tema su cui sei chiamato a lavorare.",
  prontoSoccorso: "Il Pronto Soccorso è la risorsa a cui attingere nei momenti di crisi: il numero che ti rimette in piedi.",
  chiaveEmozionale: "La Chiave Emozionale è il modo in cui il cuore elabora le esperienze: la porta d'accesso al tuo mondo affettivo.",
  strumentoLavoroPotere: "Lo Strumento Lavoro-Potere indica il talento attraverso cui esprimi la tua forza nel mondo concreto.",
  progettoSenso: "Il Progetto Senso è la direzione che dà significato al tuo cammino: ciò che rende coerente la tua storia.",
  personaggio: "Il Personaggio è la maschera sociale, il ruolo che reciti agli occhi degli altri prima che ti conoscano davvero.",
  nido: "L'Ambito Nido riguarda le origini, la famiglia, la casa e il senso di appartenenza primaria.",
  relazione: "L'Ambito Relazione riguarda i legami profondi, l'incontro con l'altro, l'amore e l'intimità.",
  sociale: "L'Ambito Sociale riguarda il tuo stare nel mondo: amicizie, gruppi, comunità e ruolo pubblico.",
  lavoro: "L'Ambito Lavoro riguarda la realizzazione, la vocazione e il modo in cui contribuisci al mondo.",
  superSequenza: "La Super Sequenza sintetizza la dinamica centrale della mappa: il filo conduttore che attraversa tutti gli ambiti.",
  numeroDestino: "Il Numero Destino è l'integrale dei conflitti: la sintesi del cammino, la direzione verso cui tutto converge.",
};

const campiEN = {
  desiderio: 'The Life Desire is the fundamental vibration of the birth day — the primary drive your soul instinctively reaches toward.',
  risposta: 'The Automatic Response is the basic reactive pattern, tied to the birth month: how you respond to situations before you even think.',
  memoria: 'The Genealogical Memory holds the family and ancestral code — what you have inherited from the lines that precede you.',
  conflittoBase: 'The Base Conflict is the primary tension between your three core forces. Not an obstacle, but the fuel of your growth.',
  pp: 'The Deep Personality reveals your essential nature: how you are structured within, beyond masks and roles.',
  equilibrio: 'The Equilibrium is your fulcrum. When you are aligned with this number, things flow. It is the frequency of your centre.',
  ppAnnoScelto: 'The Deep Personality of the Chosen Year shows the quality running through the reference year: the theme you are called to work on.',
  prontoSoccorso: 'The First Aid is the resource to draw on in moments of crisis: the number that gets you back on your feet.',
  chiaveEmozionale: 'The Emotional Key is how the heart processes experience: the doorway to your affective world.',
  strumentoLavoroPotere: 'The Work-Power Tool is the talent through which you express your strength in the concrete world.',
  progettoSenso: 'The Purpose Project is the direction that gives meaning to your path: what makes your story coherent.',
  personaggio: 'The Character is the social mask, the role you play to others before they truly know you.',
  nido: 'The Nest domain concerns origins, family, home and the sense of primary belonging.',
  relazione: 'The Relationship domain concerns deep bonds, the encounter with the other, love and intimacy.',
  sociale: 'The Social domain concerns your place in the world: friendships, groups, community and public role.',
  lavoro: 'The Work domain concerns fulfilment, vocation and how you contribute to the world.',
  superSequenza: 'The Super Sequence distils the central dynamic of the map: the thread running through every domain.',
  numeroDestino: 'The Destiny Number is the integral of conflicts: the synthesis of the path, where everything converges.',
};

/**
 * Ritorna il significato di un numero nella lingua richiesta (con fallback IT).
 * @param {number} n  1..22
 * @param {'it'|'en'} [lang='it']
 * @returns {{numero:number, nome:string, keyword:string, descrizione:string, ombra:string, dono:string}}
 */
export function getSignificato(n, lang = 'it') {
  const base = significati[n];
  if (!base) {
    return { numero: n, nome: '—', keyword: '', descrizione: '', ombra: '', dono: '' };
  }
  const ov = lang === 'en' && base.en ? base.en : {};
  return {
    numero: n,
    nome: ov.nome ?? base.nome,
    keyword: ov.keyword ?? base.keyword,
    descrizione: ov.descrizione ?? base.descrizione,
    ombra: ov.ombra ?? base.ombra,
    dono: ov.dono ?? base.dono,
  };
}

/**
 * Descrizione contestuale di un campo della mappa.
 * @param {string} campo  chiave (es. 'desiderio', 'nido')
 * @param {'it'|'en'} [lang='it']
 * @returns {string}
 */
export function getCampoDescrizione(campo, lang = 'it') {
  if (lang === 'en' && campiEN[campo]) return campiEN[campo];
  return campiDescrizioni[campo] || '';
}
