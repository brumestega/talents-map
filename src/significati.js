/**
 * significati.js — Significati dei 22 Arcani Maggiori (1..22) e descrizioni dei campi.
 * ---------------------------------------------------------------------------
 * La Mappa dei Talenti usa i 22 Arcani Maggiori (Tarocchi di Marsiglia):
 * numerazione con Giustizia = 8, Forza = 11, Il Matto = 22.
 * Ogni numero è collegato alla sua lama tramite `arcano` (slug immagine in
 * assets/arcani/<slug>.webp|.jpg).
 *
 * PROTOTIPO: i testi (descrizione/ombra/dono) sono evocativi e coerenti con
 * l'archetipo della lama, ma restano PLACEHOLDER da validare/sostituire con i
 * contenuti definitivi della professionista. Struttura pronta per il bilingue.
 * ---------------------------------------------------------------------------
 */

export const significati = {
  1: {
    nome: 'Il Mago', arcano: '01_il_mago',
    keyword: 'Volontà · Inizio · Manifestazione',
    descrizione: 'Il Mago ha tutti gli strumenti sul tavolo e la capacità di trasformare un\'idea in atto. È l\'energia dell\'inizio, della volontà che mette in moto le cose.',
    ombra: "L'ombra del Mago è la dispersione delle energie, la manipolazione e il talento usato per apparire più che per creare.",
    dono: "Il dono è l'iniziativa, l'abilità e la capacità di far accadere ciò che gli altri solo immaginano.",
    en: { nome: 'The Magician', keyword: 'Will · Beginning · Manifestation' },
  },
  2: {
    nome: 'La Papessa', arcano: '02_la_papessa',
    keyword: 'Intuizione · Mistero · Sapienza interiore',
    descrizione: 'La Papessa custodisce il sapere che non si mostra. È la voce interiore, l\'intuizione, la conoscenza che matura nel silenzio e nell\'attesa.',
    ombra: "L'ombra è la chiusura, la freddezza e il segreto che isola dagli altri.",
    dono: 'Il dono è l\'intuito profondo, la capacità di ascoltare dentro e di custodire ciò che è prezioso.',
    en: { nome: 'The High Priestess', keyword: 'Intuition · Mystery · Inner Knowing' },
  },
  3: {
    nome: "L'Imperatrice", arcano: '03_limperatrice',
    keyword: 'Fecondità · Creatività · Abbondanza',
    descrizione: "L'Imperatrice è la madre creatrice: fa fiorire, nutre, dà forma alla vita. È la generosità della natura e la gioia di creare.",
    ombra: "L'ombra è la possessività, l'eccesso di cura che soffoca e il bisogno di controllare ciò che si genera.",
    dono: 'Il dono è la creatività fertile, la cura e la capacità di portare bellezza e abbondanza.',
    en: { nome: 'The Empress', keyword: 'Fertility · Creativity · Abundance' },
  },
  4: {
    nome: "L'Imperatore", arcano: '04_imperatore',
    keyword: 'Struttura · Autorità · Stabilità',
    descrizione: "L'Imperatore costruisce e governa. Porta ordine, struttura e la solidità di chi sa dare forma duratura alle cose.",
    ombra: "L'ombra è la rigidità, l'autoritarismo e il controllo che soffoca la vita.",
    dono: 'Il dono è la solidità, la capacità di guidare e di proteggere ciò che si è costruito.',
    en: { nome: 'The Emperor', keyword: 'Structure · Authority · Stability' },
  },
  5: {
    nome: 'Il Papa', arcano: '05_il_papa',
    keyword: 'Insegnamento · Senso · Trasmissione',
    descrizione: 'Il Papa è il ponte tra i piani: trasmette, insegna, dà un senso. È la guida che porta significato e collega l\'umano al sacro.',
    ombra: "L'ombra è il dogmatismo, il conformismo e il giudizio di chi impone la propria verità.",
    dono: 'Il dono è la capacità di guidare, di dare senso e di trasmettere sapere agli altri.',
    en: { nome: 'The Hierophant', keyword: 'Teaching · Meaning · Tradition' },
  },
  6: {
    nome: 'Gli Amanti', arcano: '06_gli_amanti',
    keyword: 'Scelta · Amore · Legame',
    descrizione: "Gli Amanti parlano di legame e di scelta: il cuore che si orienta, l'incontro con l'altro, i valori a cui si dice sì.",
    ombra: "L'ombra è l'indecisione, la dipendenza affettiva e la paura di scegliere.",
    dono: 'Il dono è l\'amore consapevole, la capacità di unirsi e di scegliere secondo il cuore.',
    en: { nome: 'The Lovers', keyword: 'Choice · Love · Bond' },
  },
  7: {
    nome: 'Il Carro', arcano: '07_il_carro',
    keyword: 'Vittoria · Direzione · Slancio',
    descrizione: 'Il Carro avanza e conquista. È la volontà in movimento, la capacità di dare una direzione e di portare a casa il risultato.',
    ombra: "L'ombra è il forzare, la fuga in avanti e il rischio di perdere il controllo della corsa.",
    dono: 'Il dono è la determinazione, lo slancio e la capacità di andare avanti con sicurezza.',
    en: { nome: 'The Chariot', keyword: 'Victory · Direction · Drive' },
  },
  8: {
    nome: 'La Giustizia', arcano: '08_la_giustizia',
    keyword: 'Equilibrio · Verità · Responsabilità',
    descrizione: 'La Giustizia pesa e discerne. Porta equilibrio, verità e il senso di responsabilità per le proprie azioni.',
    ombra: "L'ombra è la rigidità che giudica, la freddezza e l'incapacità di perdonare.",
    dono: 'Il dono è l\'equità, la chiarezza e la capacità di mettere ordine con giustizia.',
    en: { nome: 'Justice', keyword: 'Balance · Truth · Responsibility' },
  },
  9: {
    nome: "L'Eremita", arcano: '09_leremita',
    keyword: 'Ricerca · Saggezza · Interiorità',
    descrizione: "L'Eremita cammina con la sua lanterna: cerca la verità nel raccoglimento e illumina il cammino con una luce discreta.",
    ombra: "L'ombra è l'isolamento, la chiusura e il rifugio nella solitudine come fuga.",
    dono: 'Il dono è la saggezza, il discernimento e la capacità di guidare in silenzio.',
    en: { nome: 'The Hermit', keyword: 'Search · Wisdom · Interiority' },
  },
  10: {
    nome: 'La Ruota della Fortuna', arcano: '10_la_ruota',
    keyword: 'Ciclo · Destino · Svolta',
    descrizione: 'La Ruota gira: ogni cosa ha il suo tempo, ogni fine un nuovo inizio. È il ritmo del destino e l\'arte di cogliere la svolta.',
    ombra: "L'ombra è la passività di fronte alla sorte e l'attaccamento a ciò che il ciclo chiede di lasciare.",
    dono: 'Il dono è la resilienza, il senso del momento giusto e la capacità di rinascere.',
    en: { nome: 'Wheel of Fortune', keyword: 'Cycle · Destiny · Turning Point' },
  },
  11: {
    nome: 'La Forza', arcano: '11_la_forza',
    keyword: 'Forza · Coraggio · Dolcezza',
    descrizione: 'La Forza doma il leone non con la violenza ma con la dolcezza. È il coraggio tranquillo, la padronanza gentile dell\'istinto.',
    ombra: "L'ombra è la repressione o l'eccesso dell'istinto, e la forza usata per dominare.",
    dono: 'Il dono è la forza interiore, il coraggio sereno e la capacità di trasformare l\'impulso in energia.',
    en: { nome: 'Strength', keyword: 'Strength · Courage · Gentleness' },
  },
  12: {
    nome: "L'Appeso", arcano: '12_lappeso',
    keyword: 'Sospensione · Resa · Nuova visione',
    descrizione: "L'Appeso guarda il mondo a testa in giù. È la sosta che insegna, la resa che apre a un nuovo punto di vista.",
    ombra: "L'ombra è lo stallo, il vittimismo e il sacrificio che non porta frutto.",
    dono: 'Il dono è il saper lasciar andare, la pazienza e la capacità di vedere le cose da un\'altra prospettiva.',
    en: { nome: 'The Hanged Man', keyword: 'Suspension · Surrender · New Vision' },
  },
  13: {
    nome: "L'Arcano senza Nome (La Morte)", arcano: '13_la_morte',
    keyword: 'Trasformazione · Fine · Rinascita',
    descrizione: 'La tredicesima lama è la grande trasformazione: taglia ciò che è finito per far posto al nuovo. Non è fine, ma metamorfosi.',
    ombra: "L'ombra è la resistenza al cambiamento e l'aggrapparsi a ciò che è già morto.",
    dono: 'Il dono è il coraggio di chiudere, di rinnovarsi e di rinascere più autentici.',
    en: { nome: 'Death', keyword: 'Transformation · Ending · Rebirth' },
  },
  14: {
    nome: 'La Temperanza', arcano: '14_la_temperanza',
    keyword: 'Armonia · Alchimia · Misura',
    descrizione: 'La Temperanza versa da una coppa all\'altra: mescola, equilibra, guarisce. È l\'arte della giusta misura e della sintesi.',
    ombra: "L'ombra è l'eccesso, l'impazienza e la difficoltà a trovare l'equilibrio tra le forze.",
    dono: 'Il dono è l\'armonia, la capacità di sintesi e il potere di guarire ciò che è squilibrato.',
    en: { nome: 'Temperance', keyword: 'Harmony · Alchemy · Measure' },
  },
  15: {
    nome: 'Il Diavolo', arcano: '15_il_diavolo',
    keyword: 'Istinto · Passione · Legame',
    descrizione: 'Il Diavolo è la forza istintiva che attrae e incatena. Porta passione, magnetismo e una vitalità potente che chiede di essere riconosciuta.',
    ombra: "L'ombra è la dipendenza, il possesso e l'illusione di poter possedere ciò che si desidera.",
    dono: 'Il dono è la vitalità, il carisma e la capacità di abitare pienamente la materia e i sensi.',
    en: { nome: 'The Devil', keyword: 'Instinct · Passion · Bond' },
  },
  16: {
    nome: 'La Torre', arcano: '16_la_torre',
    keyword: 'Rottura · Liberazione · Verità',
    descrizione: 'La Torre è il fulmine che abbatte ciò che era costruito sul falso. Nel crollo libera, e rivela ciò che è autentico.',
    ombra: "L'ombra è l'orgoglio che precede la caduta e la paura del crollo necessario.",
    dono: 'Il dono è la liberazione, l\'autenticità e la forza di ripartire su fondamenta vere.',
    en: { nome: 'The Tower', keyword: 'Rupture · Liberation · Truth' },
  },
  17: {
    nome: 'Le Stelle', arcano: '17_le_stelle',
    keyword: 'Speranza · Ispirazione · Guarigione',
    descrizione: 'Le Stelle appaiono dopo la tempesta: portano speranza, ispirazione e una serenità che guarisce e orienta.',
    ombra: "L'ombra è l'idealismo ingenuo che ignora la realtà, e la delusione che ne segue.",
    dono: 'Il dono è la fiducia, l\'ispirazione e la capacità di riportare luce dove c\'era buio.',
    en: { nome: 'The Star', keyword: 'Hope · Inspiration · Healing' },
  },
  18: {
    nome: 'La Luna', arcano: '18_la_luna',
    keyword: 'Inconscio · Sogno · Mistero',
    descrizione: 'La Luna illumina il mondo notturno, dove le forme si confondono. È l\'immaginazione, il sogno, l\'invito ad attraversare le proprie paure.',
    ombra: "L'ombra è la confusione, l'inganno e il timore di ciò che non si comprende.",
    dono: 'Il dono è l\'immaginazione fertile, l\'intuito notturno e la capacità di navigare il mondo dei sogni.',
    en: { nome: 'The Moon', keyword: 'Unconscious · Dream · Mystery' },
  },
  19: {
    nome: 'Il Sole', arcano: '19_il_sole',
    keyword: 'Gioia · Vitalità · Successo',
    descrizione: 'Il Sole splende pieno: porta vitalità, chiarezza e la gioia di realizzarsi illuminando anche gli altri.',
    ombra: "L'ombra è la vanità, l'eccesso di sé e la dipendenza dal riconoscimento.",
    dono: 'Il dono è il calore, l\'autostima sana e la capacità di portare successo condiviso.',
    en: { nome: 'The Sun', keyword: 'Joy · Vitality · Success' },
  },
  20: {
    nome: 'Il Giudizio', arcano: '20_il_giudizio',
    keyword: 'Risveglio · Chiamata · Rinascita',
    descrizione: 'Il Giudizio è la tromba che risveglia: una nuova consapevolezza, una chiamata a cui rispondere, una rinascita a un livello più alto.',
    ombra: "L'ombra è il giudizio severo verso sé e gli altri e la difficoltà a perdonare il passato.",
    dono: 'Il dono è il discernimento, il rinnovamento profondo e l\'ascolto della propria vocazione.',
    en: { nome: 'Judgement', keyword: 'Awakening · Calling · Rebirth' },
  },
  21: {
    nome: 'Il Mondo', arcano: '21_il_mondo',
    keyword: 'Compimento · Unità · Realizzazione',
    descrizione: 'Il Mondo è il cerchio che abbraccia tutto: il compimento, l\'integrazione delle parti, la gioia di aver trovato il proprio posto.',
    ombra: "L'ombra è l'accontentarsi e la chiusura del cerchio prima del tempo.",
    dono: 'Il dono è la realizzazione piena, la visione d\'insieme e la capacità di danzare con la vita.',
    en: { nome: 'The World', keyword: 'Fulfillment · Unity · Realization' },
  },
  22: {
    nome: 'Il Matto', arcano: '22_il_matto',
    keyword: 'Libertà · Viaggio · Spontaneità',
    descrizione: 'Il Matto cammina leggero verso l\'ignoto. È la libertà assoluta, lo slancio dell\'inizio puro, la fiducia di chi parte senza zavorra.',
    ombra: "L'ombra è l'incoscienza, la fuga e la dispersione di chi non mette radici.",
    dono: 'Il dono è la libertà, la spontaneità e la fiducia nel cammino e nei nuovi inizi.',
    en: { nome: 'The Fool', keyword: 'Freedom · Journey · Spontaneity' },
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
 * Include lo slug `arcano` per recuperare l'immagine della lama.
 * @param {number} n  1..22
 * @param {'it'|'en'} [lang='it']
 * @returns {{numero:number, nome:string, keyword:string, descrizione:string, ombra:string, dono:string, arcano:string}}
 */
export function getSignificato(n, lang = 'it') {
  const base = significati[n];
  if (!base) {
    return { numero: n, nome: '—', keyword: '', descrizione: '', ombra: '', dono: '', arcano: '' };
  }
  const ov = lang === 'en' && base.en ? base.en : {};
  return {
    numero: n,
    nome: ov.nome ?? base.nome,
    keyword: ov.keyword ?? base.keyword,
    descrizione: ov.descrizione ?? base.descrizione,
    ombra: ov.ombra ?? base.ombra,
    dono: ov.dono ?? base.dono,
    arcano: base.arcano || '',
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
