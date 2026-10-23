// Alle Übersetzungen der Website: Italienisch, Französisch, Englisch.
//
// Deutsch steht nicht in dieser Liste. Es bleibt im HTML stehen und ist
// damit die Rückfallebene - genau wie bei den Texten aus dem Studio
// (siehe js/inhalt.js). Zu jedem Eintrag steht der deutsche Text als
// Kommentar darüber, damit beim Pflegen klar ist, was gemeint ist.
//
// Die Kennungen (HOME_001, MEM_014, ...) sind dieselben wie in der
// Übersetzungstabelle Klostergaerten_Uebersetzungen_DE_IT_FR_EN.xlsx.
// Im HTML steht die Kennung als Attribut am Element:
//
//   <p class="marke" data-text="HOME_002">Was wir machen</p>
//
// js/sprache.js setzt den passenden Text ein. Fehlt eine Kennung hier,
// bleibt der deutsche Text aus dem HTML stehen - nie eine leere Stelle.
//
// Ein \n im Text wird zu einem echten Zeilenumbruch auf der Seite.
//
// Drei Einträge sind aus zwei Zeilen der Tabelle zusammengesetzt, weil sie
// auf der Seite in einer Zeile stehen: FUSS_PROJEKT (GLOBAL_007 + 011),
// FUSS_DESIGN (GLOBAL_008 + 012) und FUSS_RECHT (GLOBAL_009).
//
// Der Vereinsname in der Kopfzeile (GLOBAL_010) heisst auf Deutsch
// "Verein Klostergärten Schweiz". Die anderen Sprachen tragen den
// öffentlichen Projektnamen, so wie er in der Tabelle freigegeben ist.
//
// Nicht übersetzt und darum nicht hier: die Namen der Personen, die
// Postadresse, die Mailadresse und die Angaben zu einzelnen Klöstern.
// Einzelporträts bleiben in ihrer Regionalsprache.

const UEBERSETZUNGEN = {

  /* ===== Navigation, Kopf- und Fusszeile – auf allen Seiten ===== */

  // Klostergärten Schweiz
  GLOBAL_010: {
    it: "Giardini monastici della Svizzera",
    fr: "Jardins monastiques de Suisse",
    en: "Monastic Gardens of Switzerland"
  },

  // Startseite
  GLOBAL_001: {
    it: "Pagina iniziale",
    fr: "Accueil",
    en: "Home"
  },

  // Wissen
  GLOBAL_002: {
    it: "Conoscenze",
    fr: "Savoirs",
    en: "Knowledge"
  },

  // Mitgliedschaft
  GLOBAL_003: {
    it: "Adesione",
    fr: "Adhésion",
    en: "Membership"
  },

  // Kontakt
  GLOBAL_004: {
    it: "Contatti",
    fr: "Contact",
    en: "Contact"
  },

  // Über uns
  GLOBAL_005: {
    it: "Chi siamo",
    fr: "Qui sommes-nous ?",
    en: "About Us"
  },

  // Werde Mitglied
  GLOBAL_006: {
    it: "Diventa socio",
    fr: "Devenir membre",
    en: "Become a Member"
  },

  // Projekt von: Iris Becher, Barbara van der Meulen, Nicolaj van der Meulen
  FUSS_PROJEKT: {
    it: "Un progetto di: Iris Becher, Barbara van der Meulen, Nicolaj van der Meulen",
    fr: "Un projet de : Iris Becher, Barbara van der Meulen, Nicolaj van der Meulen",
    en: "A project by: Iris Becher, Barbara van der Meulen, Nicolaj van der Meulen"
  },

  // Konzept und Design: nicolasbirrer.ch
  FUSS_DESIGN: {
    it: "Ideazione e design: nicolasbirrer.ch",
    fr: "Conception et design : nicolasbirrer.ch",
    en: "Concept and design: nicolasbirrer.ch"
  },

  // © 2026 Klostergärten Schweiz. All rights reserved.
  FUSS_RECHT: {
    it: "© 2026 Klostergärten Schweiz. Tutti i diritti riservati.",
    fr: "© 2026 Klostergärten Schweiz. Tous droits réservés.",
    en: "© 2026 Klostergärten Schweiz. All rights reserved."
  },


  /* ===== Startseite – index.html ===== */

  // Klostergärten Schweiz
  HOME_001: {
    it: "Giardini monastici della Svizzera",
    fr: "Jardins monastiques de Suisse",
    en: "Monastic Gardens of Switzerland"
  },

  // Was wir machen
  HOME_002: {
    it: "Cosa facciamo",
    fr: "Ce que nous faisons",
    en: "What we do"
  },

  // Wir dokumentieren, erforschen und vermitteln die Klostergärten der
  // Schweiz als lebendige Orte von Wissen, Pflanzen- und Sozialkultur,
  // Ernährung und Spiritualität.
  HOME_003: {
    it: "Documentiamo, studiamo e valorizziamo i giardini monastici della Svizzera come luoghi vivi di conoscenza, cultura botanica e sociale, alimentazione e spiritualità.",
    fr: "Nous documentons, étudions et valorisons les jardins monastiques de Suisse en tant que lieux vivants de savoir, de culture botanique et sociale, d’alimentation et de spiritualité.",
    en: "We document, research and celebrate Switzerland’s monastic gardens as living places of knowledge, botanical and social culture, food heritage and spirituality."
  },

  // Klostergärten gehören zu den ältesten Kulturräumen der Schweiz.
  HOME_007: {
    it: "I giardini monastici sono tra i più antichi spazi culturali della Svizzera.",
    fr: "Les jardins monastiques comptent parmi les plus anciens espaces culturels de Suisse.",
    en: "Monastic gardens are among Switzerland’s oldest cultural spaces."
  },

  // Vision
  HOME_008: {
    it: "Visione",
    fr: "Vision",
    en: "Vision"
  },

  // Das Projekt dokumentiert Klostergärten, ihre Geschichte und ihre
  // gegenwärtige Entwicklung.
  HOME_009: {
    it: "Il progetto documenta i giardini monastici, la loro storia e la loro evoluzione attuale.",
    fr: "Le projet documente les jardins monastiques, leur histoire et leur évolution actuelle.",
    en: "The project documents monastic gardens, their history and their ongoing transformation."
  },

  // Zugleich schafft es einen Ort der Begegnung für Menschen, die sich für
  // Gartenkultur, Biodiversität, Kulinarik, Heilpflanzen, Spiritualität und
  // klösterliche Wissensgeschichte interessieren. So werden bestehende
  // Initiativen sichtbar gemacht, neue Kooperationen angeregt und Impulse
  // für den Erhalt und die Weiterentwicklung dieses einzigartigen
  // Kulturerbes gegeben.
  HOME_010: {
    it: "Al tempo stesso, crea uno spazio d’incontro per le persone interessate alla cultura dei giardini, alla biodiversità, alla gastronomia, alle piante medicinali, alla spiritualità e alla storia dei saperi monastici. In questo modo, dà visibilità alle iniziative esistenti, favorisce nuove collaborazioni e offre impulsi per la conservazione e lo sviluppo di questo patrimonio culturale unico.",
    fr: "Il crée également un espace de rencontre pour les personnes intéressées par l’art des jardins, la biodiversité, la gastronomie, les plantes médicinales, la spiritualité et l’histoire des savoirs monastiques. Il donne ainsi de la visibilité aux initiatives existantes, encourage de nouvelles collaborations et contribue à la préservation et au développement de ce patrimoine culturel unique.",
    en: "It also creates a meeting place for people interested in garden heritage, biodiversity, gastronomy, medicinal plants, spirituality and the history of monastic knowledge. In doing so, it highlights existing initiatives, encourages new collaborations and inspires the preservation and development of this unique cultural heritage."
  },

  // Plattform
  HOME_011: {
    it: "Piattaforma",
    fr: "Plateforme",
    en: "Platform"
  },

  // Hier entsteht ein lebendiges Inventar und Kulturportal, das Forschung,
  // Vermittlung, Vernetzung und gesellschaftliches Engagement zusammenführt.
  HOME_012: {
    it: "Sta nascendo un inventario dinamico e un portale culturale che riunisce ricerca, divulgazione, creazione di reti e impegno sociale.",
    fr: "Un inventaire évolutif et une plateforme culturelle prennent forme, réunissant recherche, transmission des connaissances, mise en réseau et engagement social.",
    en: "A growing inventory and cultural platform is taking shape, bringing together research, knowledge sharing, networking and social engagement."
  },

  // Über Jahrhunderte wurden in Klostergärten Heilpflanzen kultiviert,
  // Nahrung produziert, Wissen bewahrt und Erfahrungen weitergegeben. Heute
  // befindet sich dieses kulturelle Erbe in einem tiefgreifenden Wandel.
  // Einige Klostergärten sind bereits verschwunden, andere haben sich über
  // Jahrhunderte immer wieder neu erfunden.
  HOME_013: {
    it: "Per secoli, nei giardini monastici si sono coltivate piante medicinali, prodotti alimenti, custodite conoscenze e tramandate esperienze. Oggi questo patrimonio culturale attraversa una fase di profonda trasformazione. Alcuni giardini monastici sono già scomparsi, mentre altri hanno saputo reinventarsi più volte nel corso dei secoli.",
    fr: "Pendant des siècles, les jardins monastiques ont été des lieux de culture de plantes médicinales, de production alimentaire, de préservation et de transmission des savoirs. Aujourd’hui, ce patrimoine culturel traverse une période de profonde transformation. Certains jardins monastiques ont déjà disparu, tandis que d’autres se sont réinventés à plusieurs reprises au fil des siècles.",
    en: "For centuries, monastic gardens have been places where medicinal plants were cultivated, food was grown, knowledge was preserved and experience was passed down. Today, this cultural heritage is undergoing profound change. Some monastic gardens have already disappeared, while others have reinvented themselves many times over the centuries."
  },

  // Eindrücke
  HOME_014: {
    it: "Impressioni",
    fr: "Regards",
    en: "Impressions"
  },

  // Wandel
  HOME_015: {
    it: "Trasformazione",
    fr: "Mutation",
    en: "Transformation"
  },

  // Einige Klostergärten sind bereits verschwunden, andere müssen sich an
  // veränderte klimatische und gesellschaftliche Bedingungen anpassen.
  HOME_016: {
    it: "Alcuni giardini monastici sono già scomparsi, mentre altri devono adattarsi a nuove condizioni climatiche e sociali.",
    fr: "Certains jardins monastiques ont déjà disparu, tandis que d’autres doivent s’adapter à de nouvelles réalités climatiques et sociales.",
    en: "Some monastic gardens have already disappeared, while others must adapt to changing climatic and social conditions."
  },

  // Klostergärten sind ein gefährdetes Kulturerbe. Wir dokumentieren sie
  // erstmals umfassend, in einer Buchpublikation (2028). Mitglieder
  // finanzieren, tragen und vernetzen dieses Projekt.
  HOME_017: {
    it: "I giardini monastici costituiscono un patrimonio\nculturale a rischio. Per la prima volta,\nli documentiamo in modo approfondito\nin una pubblicazione prevista per il 2028.\nI membri sostengono finanziariamente il progetto,\ncontribuiscono alla sua realizzazione e favoriscono\nla creazione di una rete di contatti.",
    fr: "Les jardins monastiques constituent un patrimoine\nculturel menacé. Pour la première fois,\nnous les documentons de manière approfondie\ndans une publication prévue pour 2028.\nLes membres apportent leur soutien financier au projet,\ncontribuent à sa réalisation et favorisent\nla création d’un réseau de contacts.",
    en: "Monastic gardens are a cultural heritage at risk.\nFor the first time, we are documenting them in depth\nin a book planned for 2028.\nOur members provide financial support,\ncontribute to the project and help build a network."
  },


  /* ===== Wissen – wissen.html ===== */

  // Hier entsteht ein Inventar zu den Klostergärten der Schweiz sowie eine
  // Sammlung der hiermit verbundenen Wissensfelder.
  KNOW_001: {
    it: "Qui nasce un inventario dei giardini monastici della Svizzera, accompagnato da una raccolta dei diversi ambiti del sapere a essi legati.",
    fr: "Un inventaire des jardins monastiques de Suisse voit le jour, accompagné d’un ensemble de connaissances consacrées aux différents domaines qui leur sont liés.",
    en: "An inventory of Switzerland’s monastic gardens is being developed, together with a collection of knowledge covering the many fields associated with them."
  },

  // Ästhetik & Spiritualität, Klosterbotanik & Heilpflanzen, Kulinarik &
  // Klosterküche sowie Transformation & Entwicklung.
  KNOW_002: {
    it: "Estetica e spiritualità, botanica monastica e piante medicinali, gastronomia e cucina conventuale, trasformazione e sviluppo.",
    fr: "Esthétique et spiritualité, botanique monastique et plantes médicinales, gastronomie et cuisine conventuelle, mutation et développement.",
    en: "Aesthetics and spirituality, monastic botany and medicinal plants, gastronomy and convent cuisine, transformation and development."
  },

  // Wissensgeschichte
  KNOW_003: {
    it: "Storia dei saperi",
    fr: "Histoire des savoirs",
    en: "History of knowledge"
  },

  // Klostergärten sind Orte der Wissensspeicherung und Wissensvermittlung.
  KNOW_004: {
    it: "I giardini monastici sono luoghi di conservazione e trasmissione del sapere.",
    fr: "Les jardins monastiques sont des lieux de conservation et de transmission des savoirs.",
    en: "Monastic gardens are places where knowledge has been preserved and passed on."
  },

  // Über Jahrhunderte wurden hier Kenntnisse über Pflanzen, Ernährung,
  // Heilkunst, Landwirtschaft und Spiritualität bewahrt, weiterentwickelt
  // und weitergegeben.
  KNOW_005: {
    it: "Nel corso dei secoli, hanno custodito, sviluppato e tramandato conoscenze sulle piante, sull’alimentazione, sulle arti curative, sull’agricoltura e sulla spiritualità.",
    fr: "Au fil des siècles, ils ont préservé, enrichi et transmis des connaissances sur les plantes, l’alimentation, les pratiques thérapeutiques, l’agriculture et la spiritualité.",
    en: "Over the centuries, they have safeguarded, developed and shared knowledge about plants, food, healing practices, agriculture and spirituality."
  },

  // Klostergärten-Inventar
  KNOW_006: {
    it: "Inventario dei giardini monastici",
    fr: "Inventaire des jardins monastiques",
    en: "Inventory of monastic gardens"
  },

  // Das lebendige Inventar dokumentiert die Klostergärten der Schweiz als
  // kulturelle, spirituelle, ökologische und historische Räume.
  KNOW_007: {
    it: "L’inventario dinamico documenta i giardini monastici della Svizzera come spazi culturali, spirituali, ecologici e storici.",
    fr: "Cet inventaire évolutif documente les jardins monastiques de Suisse en tant qu’espaces culturels, spirituels, écologiques et historiques.",
    en: "This evolving inventory documents Switzerland’s monastic gardens as cultural, spiritual, ecological and historical spaces."
  },

  // Es macht ihre Vielfalt für Gegenwart und Zukunft sichtbar.
  KNOW_008: {
    it: "Ne rende visibile la varietà, per il presente e per il futuro.",
    fr: "Il met en lumière leur diversité, pour aujourd’hui et pour demain.",
    en: "It reveals their diversity, both for the present and for future generations."
  },

  // Wissensfelder
  KNOW_009: {
    it: "Ambiti del sapere",
    fr: "Domaines de savoir",
    en: "Fields of knowledge"
  },

  // Klostergärten waren seit jeher Experimentierfelder, in denen Wissen aus
  // unterschiedlichen Disziplinen zusammengeführt und praktisch erprobt
  // wurde. Als interdisziplinäre Kompetenzzentren schufen Klöster damit
  // wichtige Grundlagen für eine nachhaltige, vielfältige und an lokale
  // Gegebenheiten angepasste Kultur.
  KNOW_010: {
    it: "Da sempre i giardini monastici sono stati luoghi di sperimentazione, nei quali conoscenze provenienti da diverse discipline venivano riunite e messe in pratica. Come centri di competenza interdisciplinari, i monasteri hanno così contribuito a creare importanti basi per una cultura sostenibile, diversificata e adattata alle condizioni locali.",
    fr: "Depuis toujours, les jardins monastiques sont des lieux d’expérimentation où les connaissances issues de différentes disciplines se rencontrent et se traduisent en pratiques concrètes. Véritables centres de compétences interdisciplinaires, les monastères ont ainsi contribué à poser les fondements d’une culture durable, diversifiée et adaptée aux conditions locales.",
    en: "Monastic gardens have always been places of experimentation, where knowledge from different disciplines was brought together and put into practice. As interdisciplinary centres of expertise, monasteries helped lay important foundations for a sustainable and diverse culture adapted to local conditions."
  },

  // Ästhetik & Spiritualität
  KNOW_011: {
    it: "Estetica e spiritualità",
    fr: "Esthétique et spiritualité",
    en: "Aesthetics and spirituality"
  },

  // Klostergärten verbinden Schönheit, Ordnung und Kontemplation. Sie sind
  // Ausdruck einer Gartenkultur, in der Natur, Symbolik und Spiritualität
  // seit Jahrhunderten miteinander verwoben sind.
  KNOW_012: {
    it: "I giardini monastici uniscono bellezza, ordine e contemplazione. Sono espressione di una cultura del giardino nella quale natura, simbolismo e spiritualità si intrecciano da secoli.",
    fr: "Les jardins monastiques associent beauté, ordre et contemplation. Ils témoignent d’une culture du jardin dans laquelle la nature, le symbolisme et la spiritualité s’entrelacent depuis des siècles.",
    en: "Monastic gardens bring together beauty, order and contemplation. They reflect a garden culture in which nature, symbolism and spirituality have been intertwined for centuries."
  },

  // Klosterbotanik & Heilpflanzen
  KNOW_013: {
    it: "Botanica monastica e piante medicinali",
    fr: "Botanique monastique et plantes médicinales",
    en: "Monastic botany and medicinal plants"
  },

  // Klostergärten bewahren ein einzigartiges Wissen über Heilpflanzen,
  // Kräuter, Kulturpflanzen und Biodiversität. Sie sind lebendige Archive
  // botanischer Erfahrung und pflanzlicher Vielfalt.
  KNOW_014: {
    it: "I giardini monastici custodiscono un patrimonio unico di conoscenze sulle piante medicinali, le erbe, le piante coltivate e la biodiversità. Sono archivi viventi di esperienze botaniche e di diversità vegetale.",
    fr: "Les jardins monastiques abritent un patrimoine unique de connaissances sur les plantes médicinales, les herbes aromatiques, les plantes cultivées et la biodiversité. Ils constituent des archives vivantes des savoirs botaniques et de la diversité végétale.",
    en: "Monastic gardens preserve a unique heritage of knowledge about medicinal plants, herbs, cultivated plants and biodiversity. They are living archives of botanical experience and plant diversity."
  },

  // Transformation & Entwicklung
  KNOW_015: {
    it: "Trasformazione e sviluppo",
    fr: "Mutation et développement",
    en: "Transformation and development"
  },

  // Einige Klostergärten der Schweiz befinden sich gegenwärtig in einem
  // Transformationsprozess. Sie entwickeln sich zu lebendigen Orten sozialer
  // Projekte, gemeinschaftlicher Bildung und neuer Formen des
  // Zusammenlebens. Dabei verbinden sie ihr historisches Erbe mit
  // zukunftsweisenden gesellschaftlichen Aufgaben.
  KNOW_016: {
    it: "Alcuni giardini monastici della Svizzera stanno attualmente attraversando un processo di trasformazione. Si stanno evolvendo in luoghi vivi, dedicati a progetti sociali, alla formazione comunitaria e a nuove forme di convivenza. In questo modo, collegano il loro patrimonio storico a nuove sfide e prospettive per la società.",
    fr: "Certains jardins monastiques de Suisse connaissent actuellement de profondes transformations. Ils deviennent des lieux vivants accueillant des projets sociaux, des initiatives de formation communautaire et de nouvelles formes de vie collective. Ils relient ainsi leur héritage historique aux défis et aux perspectives de la société contemporaine.",
    en: "Some of Switzerland’s monastic gardens are currently undergoing significant change. They are evolving into vibrant places for social projects, community learning and new forms of living together. In this way, they connect their historical heritage with new challenges and opportunities for society."
  },

  // Kulinarik & Klosterküche
  KNOW_017: {
    it: "Gastronomia e cucina conventuale",
    fr: "Gastronomie et cuisine conventuelle",
    en: "Gastronomy and convent cuisine"
  },

  // Von Heilkräutern über Fastenspeisen bis zu regionalen Spezialitäten: Die
  // Klosterküchen der Schweiz erzählen eine Geschichte von Ernährung,
  // Genuss, Selbstversorgung und kulturellem Wissen.
  KNOW_018: {
    it: "Dalle erbe medicinali ai piatti della tradizione quaresimale, fino alle specialità regionali: le cucine conventuali della Svizzera raccontano una storia di alimentazione, gusto, autosufficienza e sapere culturale.",
    fr: "Des plantes médicinales aux plats traditionnels du carême, en passant par les spécialités régionales, les cuisines conventuelles de Suisse racontent une histoire de l’alimentation, du goût, de l’autosuffisance et des savoir-faire culturels.",
    en: "From medicinal herbs and traditional Lenten dishes to regional specialities, Switzerland’s convent kitchens tell a story of food, flavour, self-sufficiency and cultural knowledge."
  },


  /* ===== Mitgliedschaft – mitgliedschaft.html ===== */

  // Mitglied werden
  MEM_001: {
    it: "Diventare soci",
    fr: "Devenir membre",
    en: "Become a member"
  },

  // Werden Sie Mitglied des Vereins Klostergärten Schweiz und helfen Sie
  // mit, ein gefährdetes Kulturerbe zu bewahren und sichtbar zu machen.
  MEM_002: {
    it: "Diventate soci dell’associazione Giardini monastici della Svizzera e contribuite a preservare e valorizzare un patrimonio culturale a rischio.",
    fr: "Devenez membre de l’association Jardins monastiques de Suisse et contribuez à préserver et à valoriser un patrimoine culturel menacé.",
    en: "Become a member of Monastic Gardens of Switzerland and help preserve and celebrate a cultural heritage at risk."
  },

  // Mit Ihrer Mitgliedschaft fördern Sie Projekte zur Erhaltung,
  // Erforschung, Erschliessung und Vernetzung der Klostergärten in der
  // Schweiz. Wir erinnern an verschwundene Anlagen, porträtieren bestehende
  // Klostergärten und machen Transformations- und Sozialprojekte sichtbar.
  MEM_003: {
    it: "Con la vostra adesione sostenete progetti dedicati alla conservazione, alla ricerca, alla documentazione, alla valorizzazione e alla creazione di una rete tra i giardini monastici della Svizzera. Manteniamo viva la memoria dei giardini scomparsi, presentiamo quelli ancora esistenti e diamo visibilità ai progetti di trasformazione e alle iniziative sociali.",
    fr: "Par votre adhésion, vous soutenez des projets consacrés à la conservation, à la recherche, à la documentation, à la valorisation et à la mise en réseau des jardins monastiques de Suisse. Nous entretenons la mémoire des jardins disparus, présentons ceux qui existent encore et donnons de la visibilité aux projets de transformation et aux initiatives sociales.",
    en: "Through your membership, you support projects dedicated to the conservation, research, documentation, promotion and networking of Switzerland’s monastic gardens. We keep the memory of lost gardens alive, showcase those that still exist and bring attention to transformation projects and social initiatives."
  },

  // Publikation 2028
  MEM_004: {
    it: "Pubblicazione 2028",
    fr: "Publication 2028",
    en: "Publication 2028"
  },

  // Aktuell dokumentieren wir erstmals umfassend die Klostergärten der
  // Schweiz.
  MEM_005: {
    it: "Attualmente stiamo realizzando, per la prima volta, una documentazione completa dei giardini monastici della Svizzera.",
    fr: "Nous réalisons actuellement, pour la première fois, une documentation complète des jardins monastiques de Suisse.",
    en: "We are currently undertaking the first comprehensive documentation of Switzerland’s monastic gardens."
  },

  // Die Ergebnisse werden in einer Publikation zusammengeführt, die 2028
  // erscheinen soll. Mit Ihrem Mitgliederbeitrag unterstützen Sie dieses
  // wichtige Vorhaben.
  MEM_006: {
    it: "I risultati confluiranno in una pubblicazione prevista per il 2028. Con la vostra quota associativa contribuite a sostenere questo importante progetto.",
    fr: "Les résultats de ce travail feront l’objet d’une publication prévue pour 2028. Votre cotisation contribue directement à la réalisation de cet important projet.",
    en: "The results will be presented in a publication scheduled for 2028. Your membership fee directly supports this important project."
  },

  // Ihre Vorteile als Mitglied
  MEM_007: {
    it: "I vantaggi dell’adesione",
    fr: "Les avantages de l’adhésion",
    en: "Membership benefits"
  },

  // Sie werden regelmässig über die laufenden Projekte des Vereins
  // informiert.
  MEM_008: {
    it: "Riceverete regolarmente informazioni sui progetti in corso dell’associazione.",
    fr: "Vous recevrez régulièrement des informations sur les projets en cours de l’association.",
    en: "Receive regular updates on the association’s ongoing projects."
  },

  // Sie können an den Aktivitäten des Vereins teilnehmen.
  MEM_009: {
    it: "Potrete partecipare alle attività dell’associazione.",
    fr: "Vous pourrez participer aux activités de l’association.",
    en: "Take part in the association’s activities."
  },

  // Sie sind zur jährlichen Mitgliederversammlung an einem besonderen Ort
  // mit anschliessendem Abendessen eingeladen.
  MEM_010: {
    it: "Sarete invitati all’assemblea annuale dei soci, che si terrà in un luogo speciale e sarà seguita da una cena.",
    fr: "Vous serez invités à l’assemblée générale annuelle, qui se tiendra dans un lieu particulier et sera suivie d’un dîner.",
    en: "Be invited to the annual general meeting, held at a special location and followed by dinner."
  },

  // Sie können an unserer jährlichen Klostergarten-Exkursion teilnehmen.
  MEM_011: {
    it: "Potrete partecipare alla nostra escursione annuale alla scoperta dei giardini monastici.",
    fr: "Vous pourrez prendre part à notre excursion annuelle à la découverte des jardins monastiques.",
    en: "Join our annual excursion to discover monastic gardens."
  },

  // Sie können bei der Erhaltung und Entwicklung eines Klostergartens auf
  // unser Netzwerk und unser Fachwissen zurückgreifen.
  MEM_012: {
    it: "Per la conservazione e lo sviluppo di un giardino monastico, potrete avvalervi della nostra rete di contatti e delle nostre competenze specialistiche.",
    fr: "Pour la conservation ou le développement d’un jardin monastique, vous pourrez bénéficier de notre réseau de contacts et de nos compétences spécialisées.",
    en: "Benefit from our professional expertise and network of contacts when preserving or developing a monastic garden."
  },

  // Die erste Exkursion findet voraussichtlich im Herbst 2027 statt und
  // führt zu einem oder mehreren Klostergärten in der Schweiz.
  MEM_013: {
    it: "La prima escursione è prevista per l’autunno 2027 e porterà alla scoperta di uno o più giardini monastici della Svizzera.",
    fr: "La première excursion est prévue pour l’automne 2027 et permettra de découvrir un ou plusieurs jardins monastiques de Suisse.",
    en: "The first excursion is provisionally planned for autumn 2027 and will visit one or more monastic gardens in Switzerland."
  },

  // Abonnieren Sie unseren Newsletter
  MEM_014: {
    it: "Iscrivetevi alla nostra newsletter",
    fr: "Abonnez-vous à notre newsletter",
    en: "Subscribe to our newsletter"
  },

  // um über Neuigkeiten und Veranstaltungen informiert zu bleiben.
  MEM_015: {
    it: "per rimanere informati sulle novità e sugli eventi.",
    fr: "pour rester informés de nos actualités et de nos événements.",
    en: "to stay informed about news and events."
  },

  // Gönnerinnen und Gönner
  MEM_016: {
    it: "Sostenitrici e sostenitori",
    fr: "Donatrices et donateurs",
    en: "Supporters and donors"
  },

  // Für die Umsetzung unserer Projekte sind wir in besonderem Mass auf
  // Gönnerbeiträge und Spenden angewiesen.
  MEM_017: {
    it: "Per realizzare i nostri progetti, il contributo di sostenitrici, sostenitori e donatori è particolarmente importante.",
    fr: "Le soutien de nos donatrices, donateurs et bienfaiteurs est essentiel à la réalisation de nos projets.",
    en: "The contributions of supporters and donors are particularly important in helping us realise our projects."
  },

  // Gönnerinnen und Gönner können die für 2028 geplante Publikation zu einem
  // Vorzugspreis beziehen. Zudem profitieren sie von einem reduzierten
  // Teilnahmebeitrag für die jährliche Klostergarten-Exkursion.
  MEM_018: {
    it: "Chi sostiene l’associazione potrà acquistare la pubblicazione prevista per il 2028 a un prezzo agevolato. Beneficerà inoltre di una quota di partecipazione ridotta per l’escursione annuale ai giardini monastici.",
    fr: "Les personnes qui soutiennent l’association pourront acquérir à un prix préférentiel la publication prévue pour 2028. Elles bénéficieront également d’un tarif réduit pour l’excursion annuelle à la découverte des jardins monastiques.",
    en: "Supporters will be able to purchase the publication planned for 2028 at a reduced price. They will also benefit from a reduced participation fee for the annual monastic garden excursion."
  },

  // Mitgliederbeiträge
  MEM_019: {
    it: "Quote associative",
    fr: "Cotisations annuelles",
    en: "Annual membership fees"
  },

  // Einzelmitgliedschaft
  MEM_020: {
    it: "Adesione individuale",
    fr: "Membre individuel",
    en: "Individual membership"
  },

  // Paarmitgliedschaft
  MEM_021: {
    it: "Adesione di coppia",
    fr: "Adhésion en couple",
    en: "Couple membership"
  },

  // Juniormitgliedschaft
  MEM_022: {
    it: "Adesione giovani",
    fr: "Jeunes membres",
    en: "Young members"
  },

  // Mitgliedschaft für juristische Personen
  MEM_023: {
    it: "Adesione per persone giuridiche",
    fr: "Personnes morales",
    en: "Organisations and legal entities"
  },

  // Gönnermitgliedschaft
  MEM_024: {
    it: "Adesione come sostenitore",
    fr: "Membre de soutien",
    en: "Supporting membership"
  },

  // CHF 45.– pro Jahr
  MEM_025: {
    it: "CHF 45.– all’anno",
    fr: "CHF 45.– par an",
    en: "CHF 45.– per year"
  },

  // CHF 70.– pro Jahr
  MEM_026: {
    it: "CHF 70.– all’anno",
    fr: "CHF 70.– par an",
    en: "CHF 70.– per year"
  },

  // CHF 25.– pro Jahr
  MEM_027: {
    it: "CHF 25.– all’anno",
    fr: "CHF 25.– par an",
    en: "CHF 25.– per year"
  },

  // CHF 120.– pro Jahr
  MEM_028: {
    it: "CHF 120.– all’anno",
    fr: "CHF 120.– par an",
    en: "CHF 120.– per year"
  },

  // ab CHF 120.– pro Jahr
  MEM_029: {
    it: "A partire da CHF 120.– all’anno",
    fr: "Dès CHF 120.– par an",
    en: "From CHF 120.– per year"
  },

  // Beitrag bezahlen
  MEM_030: {
    it: "Versare la quota associativa",
    fr: "Verser votre cotisation",
    en: "Paying your membership fee"
  },

  // Die Mitgliedschaft gilt ab Eingang des Beitrags. Überweisungen und
  // Spenden sind auch unabhängig von einer Mitgliedschaft willkommen.
  MEM_031: {
    it: "L’adesione diventa effettiva al ricevimento della quota associativa. Sono benvenuti anche versamenti e donazioni indipendentemente dall’adesione all’associazione.",
    fr: "L’adhésion prend effet dès réception de la cotisation. Les versements et les dons sont également les bienvenus, indépendamment d’une adhésion à l’association.",
    en: "Membership becomes effective upon receipt of the membership fee. Contributions and donations are also welcome independently of membership."
  },

  // Newsletter
  MEM_032: {
    it: "Newsletter",
    fr: "Newsletter",
    en: "Newsletter"
  },

  // Bleiben Sie über unsere Projekte, Exkursionen und Veranstaltungen auf
  // dem Laufenden.
  MEM_033: {
    it: "Rimanete aggiornati sui nostri progetti, sulle escursioni e sugli eventi.",
    fr: "Restez informés de nos projets, de nos excursions et de nos événements.",
    en: "Stay informed about our projects, excursions and events."
  },

  // Name und Vorname
  MEM_034: {
    it: "Nome e cognome",
    fr: "Prénom et nom",
    en: "First and last name"
  },

  // E-Mail
  MEM_035: {
    it: "Indirizzo e-mail",
    fr: "Adresse e-mail",
    en: "Email address"
  },

  // Newsletter abonnieren
  MEM_036: {
    it: "Iscriviti alla newsletter",
    fr: "S’abonner à la newsletter",
    en: "Subscribe to the newsletter"
  },


  /* ===== Über uns – ueber-uns.html ===== */

  // Der Verein
  ABOUT_001: {
    it: "L’associazione",
    fr: "L’association",
    en: "The association"
  },

  // Klostergärten Schweiz ist eine Initiative zur Erforschung,
  // Dokumentation, Vernetzung und Vermittlung der Schweizer Klostergärten.
  ABOUT_002: {
    it: "Giardini monastici della Svizzera è un’iniziativa dedicata alla ricerca, alla documentazione, alla creazione di reti e alla divulgazione del patrimonio dei giardini monastici svizzeri.",
    fr: "Jardins monastiques de Suisse est une initiative consacrée à la recherche, à la documentation, à la mise en réseau et à la transmission du patrimoine des jardins monastiques suisses.",
    en: "Monastic Gardens of Switzerland is an initiative dedicated to researching, documenting, connecting and sharing the heritage of Switzerland’s monastic gardens."
  },

  // Der Verein Klostergärten der Schweiz ist aktuell im Aufbau. Er bildet
  // die Trägerschaft und schafft die Grundlage für eine langfristige
  // Zusammenarbeit von Klöstern, Fachpersonen und Interessierten.
  ABOUT_003: {
    it: "L’associazione Giardini monastici della Svizzera è attualmente in fase di costituzione. Essa costituisce l’ente promotore del progetto e pone le basi per una collaborazione duratura tra monasteri, esperti e persone interessate.",
    fr: "L’association Jardins monastiques de Suisse est actuellement en cours de constitution. Elle porte le projet et pose les bases d’une collaboration durable entre les communautés monastiques, les spécialistes et toutes les personnes intéressées.",
    en: "The Monastic Gardens of Switzerland association is currently being established. It provides the organisational foundation for the project and creates the basis for lasting collaboration between monasteries, experts and interested individuals."
  },

  // Projektteam
  ABOUT_004: {
    it: "Il gruppo di progetto",
    fr: "L’équipe du projet",
    en: "The project team"
  },

  // Kunsthistorikerin und Literaturwissenschaftlerin in Basel, seit vielen
  // Jahren im Schweizer Verlagswesen tätig. Als Autorin und Herausgeberin
  // verbindet sie kulturhistorische Recherche mit journalistischer
  // Vermittlung und bringt ihre Erfahrung mit publikumsnahen Buchkonzepten
  // ins Projekt ein.
  ABOUT_008: {
    it: "Storica dell’arte e studiosa di letteratura, vive a Basilea e opera da molti anni nel settore editoriale svizzero. Come autrice e curatrice editoriale, coniuga la ricerca storico-culturale con la divulgazione giornalistica e apporta al progetto la sua esperienza nello sviluppo di pubblicazioni destinate a un vasto pubblico.",
    fr: "Historienne de l’art et spécialiste de littérature, Iris Becher vit à Bâle et travaille depuis de nombreuses années dans le secteur de l’édition suisse. Autrice et éditrice, elle associe la recherche en histoire culturelle à la transmission journalistique des connaissances. Elle apporte au projet son expérience dans la conception de publications destinées à un large public.",
    en: "An art historian and literary scholar, Iris Becher lives in Basel and has worked in the Swiss publishing sector for many years. As an author and editor, she combines cultural-historical research with accessible writing and brings her experience in developing publications for a broad readership to the project."
  },

  // Kunsthistorikerin, Kuratorin und Kulturvermittlerin. Seit 2015 leitet
  // sie den Kulturbereich im Kloster Dornach und seit 2019 dessen
  // Klostergarten – sie verbindet damit kunsthistorische Forschung mit
  // praktischer Erfahrung im Umgang mit klösterlichem Kulturerbe.
  ABOUT_009: {
    it: "Storica dell’arte, curatrice e mediatrice culturale. Dal 2015 dirige il settore culturale del monastero di Dornach e dal 2019 è responsabile anche del suo giardino monastico. Unisce così la ricerca storico-artistica all’esperienza pratica nella gestione e valorizzazione del patrimonio culturale monastico.",
    fr: "Historienne de l’art, commissaire d’exposition et médiatrice culturelle. Depuis 2015, elle dirige le secteur culturel du monastère de Dornach et, depuis 2019, elle est également responsable de son jardin monastique. Elle associe ainsi la recherche en histoire de l’art à une expérience pratique de la gestion et de la valorisation du patrimoine culturel monastique.",
    en: "An art historian, curator and cultural mediator. Since 2015, she has headed the cultural department of the Dornach monastery and, since 2019, has also been responsible for its monastic garden. Her work combines art-historical research with practical experience in managing and promoting monastic cultural heritage."
  },

  // Kunstwissenschaftler mit einer Habilitation zur Klosterkultur des 18.
  // Jahrhunderts und in der Hochschullehre tätig. Er forscht zu Sakralkunst,
  // Bildtheorie und kulinarischer Ästhetik und verbindet die Geschichte
  // sakraler Räume mit Fragen der Ernährung, Pflanzen- und Materialkultur.
  ABOUT_010: {
    it: "Studioso di storia e teoria dell’arte, ha conseguito l’abilitazione con una ricerca sulla cultura monastica del XVIII secolo e svolge attività di insegnamento universitario. Le sue ricerche riguardano l’arte sacra, la teoria dell’immagine e l’estetica gastronomica. Nel suo lavoro collega la storia degli spazi sacri alle questioni dell’alimentazione e della cultura delle piante e dei materiali.",
    fr: "Chercheur en histoire et théorie de l’art, Nicolaj van der Meulen a obtenu son habilitation universitaire avec une étude consacrée à la culture monastique du XVIIIe siècle. Il enseigne également à l’université. Ses recherches portent sur l’art sacré, la théorie de l’image et l’esthétique gastronomique. Dans ses travaux, il établit des liens entre l’histoire des espaces sacrés et les questions liées à l’alimentation, aux plantes et à la culture matérielle.",
    en: "A scholar of art history and theory, Nicolaj van der Meulen completed his habilitation with a study of eighteenth-century monastic culture and teaches at university level. His research focuses on sacred art, image theory and gastronomic aesthetics. In his work, he connects the history of sacred spaces with questions of food, plants and material culture."
  },

  // Wenn Sie an näheren Informationen oder an einer Mitwirkung interessiert
  // sind, schreiben Sie uns.
  ABOUT_011: {
    it: "Se desiderate ricevere maggiori informazioni\no siete interessati a collaborare al progetto,\nscriveteci.",
    fr: "Vous souhaitez en savoir davantage\nou participer au projet ?\nNous serions heureux d’échanger avec vous.",
    en: "Would you like to learn more\nor become involved in the project?\nWe would be delighted to hear from you."
  },

  // Schreiben Sie uns
  ABOUT_012: {
    it: "Contattateci",
    fr: "Contactez-nous",
    en: "Contact us"
  },


  /* ===== Kontakt – kontakt.html ===== */

  // Adresse
  CONTACT_001: {
    it: "Indirizzo",
    fr: "Adresse",
    en: "Address"
  },

  // Mail
  CONTACT_005: {
    it: "E-mail",
    fr: "E-mail",
    en: "Email"
  },

  // Spenden
  CONTACT_007: {
    it: "Donazioni",
    fr: "Dons",
    en: "Donations"
  },

  // Mit TWINT bezahlen
  CONTACT_008: {
    it: "Effettua una donazione con TWINT",
    fr: "Faire un don avec TWINT",
    en: "Donate with TWINT"
  }
};
