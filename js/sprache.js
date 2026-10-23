// Die Sprachwahl: Deutsch, Italienisch, Französisch, Englisch.
//
// Deutsch steht im HTML, die drei anderen Sprachen in
// js/uebersetzungen.js. Dieses Skript tauscht die Texte aus.
//
// Wie die Zuordnung funktioniert: im HTML trägt jedes Element, das
// übersetzt wird, die Kennung aus der Übersetzungstabelle.
//
//   data-text="HOME_002"        -> der Text des Elements
//   data-text-alt="CONTACT_008" -> die Bildbeschreibung (alt) eines Bildes
//   data-text-davor="MEM_013"   -> ein Absatz mit Link mitten im Satz,
//   data-text-link="MEM_014"       dazu data-text-link, data-text-danach
//   data-text-danach="MEM_015"     und data-text-ziel
//
// Der deutsche Text bleibt im HTML stehen und wird nie aus einer Liste
// geholt. Fehlt eine Übersetzung, bleibt er ebenfalls stehen - der
// Besucher sieht nie eine leere Stelle.
//
// Alle Namen hier beginnen mit "sprach" oder "SPRACH_". Grund: alle
// Skripte der Seite teilen sich denselben Namensraum. inhalt.js hat zum
// Beispiel schon eine Funktion setzeText - zwei gleiche Namen, und eine
// der beiden Dateien arbeitet mit der falschen.


/* ===== Die vier Sprachen ===== */

// Deutsch steht zuerst: es ist die Sprache der Website.
const SPRACH_LISTE = ["de", "it", "fr", "en"];

// Unter diesem Namen merkt sich der Browser die gewählte Sprache, damit
// sie beim Wechsel auf eine andere Seite stehen bleibt.
const SPRACH_SPEICHER = "klostergaerten-sprache";

// Der deutsche Stand jedes Elements, bevor es übersetzt wurde. Ohne diese
// Liste gäbe es keinen Weg zurück zu Deutsch.
//
// Gemerkt wird der ganze Inhalt (innerHTML), nicht nur der Text: so
// bleiben die Zeilenumbrüche im Aufruf und der Link im Absatz auf der
// Mitgliedschaft-Seite erhalten.
const sprachGemerkt = new Map();


/* ===== Welche Sprache ist gewählt ===== */

// Erst die Adresse (?sprache=fr), dann die zuletzt gewählte aus dem
// Speicher des Browsers, sonst Deutsch.
//
// Die Adresse steht vorn, damit ein Link in einer bestimmten Sprache
// geteilt werden kann.
function sprachLesen() {
  const ausAdresse = new URLSearchParams(window.location.search).get("sprache");
  if (SPRACH_LISTE.indexOf(ausAdresse) > -1) return ausAdresse;

  // Der Speicher kann gesperrt sein - privates Fenster, strenge
  // Einstellungen, Seite per Doppelklick geöffnet. Dann bleibt es bei
  // Deutsch, statt dass das Skript mit einem Fehler abbricht.
  try {
    const gemerkt = window.localStorage.getItem(SPRACH_SPEICHER);
    if (SPRACH_LISTE.indexOf(gemerkt) > -1) return gemerkt;
  } catch (fehler) {
    console.warn("Die Sprache lässt sich nicht lesen:", fehler);
  }

  return "de";
}

let sprachAktuell = sprachLesen();


/* ===== Kleine Helfer ===== */

// Merkt sich den deutschen Stand eines Elements.
//
// neu = true heisst: der deutsche Text ist eben neu gesetzt worden, der
// gemerkte Stand von vorher ist veraltet. So ruft inhalt.js die
// Sprachwahl auf, nachdem es die Texte aus dem Studio eingesetzt hat.
function sprachMerken(element, neu) {
  if (neu || !sprachGemerkt.has(element)) {
    sprachGemerkt.set(element, element.innerHTML);
  }
}

// Setzt den deutschen Stand wieder ein
function sprachZurueck(element) {
  element.innerHTML = sprachGemerkt.get(element);
}

// Ersetzt den Inhalt eines Elements durch Text. Ein \n in der Übersetzung
// wird dabei zu einem echten Zeilenumbruch.
//
// Vor jedem Umbruch steht ein Leerzeichen - genau wie im HTML. Auf dem
// Handy blendet das CSS die <br> im Aufruf aus, ohne das Leerzeichen
// würden die Wörter dann aneinanderkleben.
function sprachSetzeText(element, text) {
  element.textContent = "";

  const zeilen = String(text).split("\n");

  zeilen.forEach(function (zeile, nummer) {
    if (nummer > 0) {
      element.appendChild(document.createTextNode(" "));
      element.appendChild(document.createElement("br"));
    }
    element.appendChild(document.createTextNode(zeile));
  });
}

// Holt die Übersetzung einer Kennung. Gibt einen leeren Text zurück,
// wenn die Kennung fehlt oder die Sprache dort nicht gepflegt ist.
function sprachText(kennung, sprache) {
  const eintrag = UEBERSETZUNGEN[kennung];
  if (!eintrag || !eintrag[sprache]) return "";
  return eintrag[sprache];
}


/* ===== Die Sprache auf die Seite anwenden ===== */

// Steht als Funktion am Fenster, damit inhalt.js sie noch einmal aufrufen
// kann: nach dem Einsetzen der Texte aus dem Studio steht überall wieder
// Deutsch auf der Seite.
window.spracheAnwenden = function (neuMerken) {
  const sprache = sprachAktuell;

  // Sagt Browser und Screenreader, in welcher Sprache die Seite steht
  document.documentElement.lang = sprache;

  // Die einfachen Texte
  document.querySelectorAll("[data-text]").forEach(function (element) {
    sprachMerken(element, neuMerken);

    const text = sprachText(element.dataset.text, sprache);

    if (sprache === "de" || text === "") {
      sprachZurueck(element);
    } else {
      sprachSetzeText(element, text);
    }
  });

  // Bildbeschreibungen. Sie werden vorgelesen und stehen da, wenn ein
  // Bild nicht lädt - deshalb gehören sie mit übersetzt.
  document.querySelectorAll("[data-text-alt]").forEach(function (bild) {
    if (!bild.dataset.altDeutsch) bild.dataset.altDeutsch = bild.alt;

    const text = sprachText(bild.dataset.textAlt, sprache);
    bild.alt = sprache === "de" || text === "" ? bild.dataset.altDeutsch : text;
  });

  // Der Absatz auf der Mitgliedschaft-Seite, in dem mitten im Satz ein
  // Link steht. Er wird aus drei Teilen gebaut: davor, der Link, danach.
  document.querySelectorAll("[data-text-davor]").forEach(function (element) {
    sprachMerken(element, neuMerken);

    const davor = sprachText(element.dataset.textDavor, sprache);
    const mitte = sprachText(element.dataset.textLink, sprache);
    const danach = sprachText(element.dataset.textDanach, sprache);

    if (sprache === "de" || davor === "" || mitte === "" || danach === "") {
      sprachZurueck(element);
      return;
    }

    element.textContent = "";
    element.appendChild(document.createTextNode(davor));

    // Zwei Umbrüche wie im HTML: der Hinweis auf den Newsletter steht
    // als eigener Absatz unter dem ersten Satz.
    element.appendChild(document.createElement("br"));
    element.appendChild(document.createElement("br"));

    const link = document.createElement("a");
    link.href = element.dataset.textZiel || "#";
    link.textContent = mitte;
    element.appendChild(link);

    // Ein Leerzeichen davor: in der Tabelle beginnt der Schlussteil mit
    // einem Wort, nicht mit einem Satzzeichen wie im Deutschen.
    element.appendChild(document.createTextNode(" " + danach));
  });

  sprachKnoepfeStellen();
};


/* ===== Die Knöpfe der Sprachwahl ===== */

// Stellt die vier Knöpfe auf die gewählte Sprache. Der aktive ist ein
// gefülltes Kästchen, die anderen stehen als Schrift da - das macht das
// CSS über aria-pressed. Screenreader sagen damit zugleich an, welche
// Sprache eingeschaltet ist.
function sprachKnoepfeStellen() {
  document.querySelectorAll(".sprache-knopf").forEach(function (knopf) {
    const aktiv = knopf.dataset.sprache === sprachAktuell;
    knopf.setAttribute("aria-pressed", aktiv ? "true" : "false");
  });
}

// Ein Klick wechselt die Sprache
function sprachWaehlen(kuerzel) {
  sprachAktuell = kuerzel;

  // Merken, damit die Sprache beim Wechsel auf eine andere Seite stehen
  // bleibt. Ist der Speicher gesperrt, gilt sie nur für diese Seite.
  try {
    window.localStorage.setItem(SPRACH_SPEICHER, kuerzel);
  } catch (fehler) {
    console.warn("Die Sprache lässt sich nicht merken:", fehler);
  }

  window.spracheAnwenden(false);

  // Die Texte sind jetzt anders lang und die Knöpfe damit anders hoch:
  // schief.js muss die schiefen Kanten neu schneiden.
  if (window.schneideAlles) window.schneideAlles();
}

// Der Zuhörer sitzt an der Leiste, nicht an den vier Knöpfen: so genügt
// einer, und er bleibt auch nach einem Umbau der Knöpfe bestehen.
const sprachLeiste = document.querySelector(".sprachwahl");

if (sprachLeiste) {
  sprachLeiste.addEventListener("click", function (ereignis) {
    const knopf = ereignis.target.closest(".sprache-knopf");
    if (knopf) sprachWaehlen(knopf.dataset.sprache);
  });
}


/* ===== Beim Laden ===== */

// Die gemerkte Sprache gleich einsetzen. Das läuft vor schief.js, damit
// die schiefen Kanten die fertigen Texte messen.
window.spracheAnwenden(false);
