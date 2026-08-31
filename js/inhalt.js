// Holt alle Texte und Bilder aus dem Sanity-Studio und setzt sie in die Seite.
//
// Es steht kein Passwort in dieser Datei. Das Dataset ist oeffentlich
// lesbar, deshalb genuegt eine normale Adresse zum Abfragen. Ein geheimer
// Schluessel waere hier fuer jeden im Quelltext sichtbar - es darf also
// keinen geben.
//
// Wie die Zuordnung funktioniert: im HTML traegt jedes Element, das aus
// dem Studio kommt, ein Attribut mit dem Namen des Feldes.
//
//   data-inhalt="visionAussage"   -> der Text des Feldes
//   data-bild="schauBild"         -> Bild und Bildbeschreibung
//   data-ziel="aufrufKnopfZiel"   -> die Adresse eines Links
//   data-textlink="..."           -> ein Absatz mit Link mitten im Satz
//
// Der Text im HTML bleibt trotzdem stehen. Er ist die Rueckfallebene:
// geht etwas schief - kein Netz, Studio nicht erreichbar, Seite per
// Doppelklick geoeffnet -, sieht der Besucher nie eine leere Seite.


/* ===== Zugangsdaten des Projekts ===== */

// Diese ID muss mit der in studio/sanity.config.ts uebereinstimmen.
const PROJEKT_ID = "ag1064vs";
const DATASET = "production";

// Groesste Breite, in der Fotos geholt werden. Sanity verkleinert groessere
// Bilder darauf, kleinere laesst es in Ruhe. So bleibt die Seite schnell,
// auch wenn im Studio ein sehr grosses Foto hochgeladen wird.
const BILD_BREITE = 1600;

// Welche Seite ist das? Die Kennung steht im <body data-seite="...">
// und ist zugleich die Kennung des Dokuments im Studio.
const SEITE = document.body.dataset.seite;

// Die Abfrage (GROQ): das Dokument dieser Seite und dazu die gemeinsame
// Kopf- und Fusszeile, beides in einem Rutsch.
//
// Das SANITY_ im Namen ist noetig: anmeldung.js hat auf derselben Seite
// schon eine Konstante ADRESSE, zwei gleiche Namen waeren ein Fehler.
const SANITY_ABFRAGE =
  '{"allgemein": *[_id == "allgemein"][0],' +
  ' "seite": *[_id == "' + SEITE + '"][0]}';

// encodeURIComponent sorgt dafuer, dass die Anfuehrungszeichen und
// Klammern der Abfrage die Adresse nicht kaputt machen.
const SANITY_ADRESSE =
  "https://" + PROJEKT_ID + ".apicdn.sanity.io/v2021-10-21/data/query/" +
  DATASET + "?query=" + encodeURIComponent(SANITY_ABFRAGE);


/* ===== Kleine Helfer ===== */

// Baut aus der Kennung eines Sanity-Bildes die Adresse der Bilddatei.
// Die Kennung sieht so aus:  image-a1b2c3d4-1600x1067-jpg
function bildAdresse(bild) {
  if (!bild || !bild.asset) return "";

  // Vier Teile: das Wort "image", die Kennung, die Groesse, das Format
  const teile = bild.asset._ref.split("-");

  return (
    "https://cdn.sanity.io/images/" + PROJEKT_ID + "/" + DATASET + "/" +
    teile[1] + "-" + teile[2] + "." + teile[3] +
    "?w=" + BILD_BREITE + "&auto=format"
  );
}

// Haengt Text hinten an ein Element an. Ein Zeilenumbruch im Studio wird
// dabei zu einem echten Umbruch auf der Seite.
//
// Warum nicht einfach innerHTML: so bleibt Text immer Text. Aus dem Studio
// kann nichts in die Seite geraten, was dort nicht hingehoert.
function haengeText(element, text) {
  const zeilen = String(text).split("\n");

  zeilen.forEach(function (zeile, nummer) {
    if (nummer > 0) element.appendChild(document.createElement("br"));
    element.appendChild(document.createTextNode(zeile));
  });
}

// Ersetzt den ganzen Inhalt eines Elements durch Text
function setzeText(element, text) {
  element.textContent = "";
  haengeText(element, text);
}


/* ===== Einzelne Felder einsetzen ===== */

// Jedes Element mit data-inhalt bekommt den Text des gleichnamigen Feldes
function zeigeTexte(daten) {
  document.querySelectorAll("[data-inhalt]").forEach(function (element) {
    const wert = daten[element.dataset.inhalt];

    // Fehlt das Feld im Studio, bleibt der Text aus dem HTML stehen
    if (typeof wert === "string" && wert !== "") setzeText(element, wert);
  });
}

// Jedes Bild mit data-bild bekommt Datei und Bildbeschreibung
function zeigeBilder(daten) {
  document.querySelectorAll("[data-bild]").forEach(function (element) {
    const bild = daten[element.dataset.bild];
    const adresse = bildAdresse(bild);

    if (!adresse) return;

    element.src = adresse;
    if (bild.alt) element.alt = bild.alt;
  });
}

// Jeder Link mit data-ziel bekommt seine Adresse
function zeigeZiele(daten) {
  document.querySelectorAll("[data-ziel]").forEach(function (element) {
    const wert = daten[element.dataset.ziel];
    if (typeof wert === "string" && wert !== "") element.href = wert;
  });
}

// Ein Absatz, in dem mitten im Satz ein Link steht. Er kommt aus dem
// Studio in drei Teilen - davor, der Link, danach (siehe textMitLink.ts).
function zeigeTextLinks(daten) {
  document.querySelectorAll("[data-textlink]").forEach(function (element) {
    const wert = daten[element.dataset.textlink];
    if (!wert) return;

    element.textContent = "";

    if (wert.davor) haengeText(element, wert.davor);

    if (wert.linkText) {
      const link = document.createElement("a");
      link.href = wert.linkZiel || "#";
      link.textContent = wert.linkText;
      element.appendChild(link);
    }

    if (wert.danach) haengeText(element, wert.danach);
  });
}


/* ===== Listen aufbauen ===== */

// Das Menue oben rechts in der Kopfzeile
function zeigeKopfMenue(punkte) {
  const liste = document.querySelector(".kopf-menue");
  if (!liste || !punkte) return;

  liste.innerHTML = "";

  punkte.forEach(function (punkt) {
    const eintrag = document.createElement("li");

    // Punkte, die auf breiten Schirmen doppelt waeren - etwa "Startseite",
    // die dort schon links als Vereinsname steht - bekommen die Klasse
    // "nur-menue". Das CSS blendet sie dort aus.
    if (punkt.nurImKlappmenue) eintrag.className = "nur-menue";

    const link = document.createElement("a");
    link.className = "knopf";
    link.href = punkt.ziel;

    const text = document.createElement("span");
    text.className = "knopf-text";
    text.textContent = punkt.beschriftung;

    link.appendChild(text);
    eintrag.appendChild(link);
    liste.appendChild(eintrag);
  });
}

// Das Menue unten in der Fusszeile
function zeigeFussMenue(punkte) {
  const bereich = document.querySelector(".fuss-menue");
  if (!bereich || !punkte) return;

  bereich.innerHTML = "";

  punkte.forEach(function (punkt) {
    const link = document.createElement("a");
    link.href = punkt.ziel;
    link.textContent = punkt.beschriftung;
    bereich.appendChild(link);
  });
}

// Die Angaben unter dem grossen Bild der Startseite
function zeigeSchauInfo(zeilen) {
  const bereich = document.querySelector(".schau-info");
  if (!bereich || !zeilen) return;

  bereich.innerHTML = "";

  zeilen.forEach(function (zeile) {
    const eintrag = document.createElement("div");
    eintrag.textContent = zeile;
    bereich.appendChild(eintrag);
  });
}

// Das Bilderraster im Abschnitt "Eindruecke"
function zeigeEindruecke(bilder) {
  const raster = document.querySelector(".bilder-raster");
  if (!raster || !bilder) return;

  raster.innerHTML = "";

  bilder.forEach(function (eintrag) {
    const rahmen = document.createElement("div");
    rahmen.className = "bild bild-laedt";   // bild-laedt ist die Ladeanimation

    const foto = document.createElement("img");
    foto.loading = "lazy";
    foto.src = bildAdresse(eintrag);
    foto.alt = eintrag.alt || "";

    rahmen.appendChild(foto);
    raster.appendChild(rahmen);
  });
}

// Die Kaesten aus Titel und Text: die Wissensfelder auf der Wissen-Seite
// und die Personen auf "Ueber uns". Beide sehen gleich aus, nur die Namen
// der Personen tragen zusaetzlich die Klasse "feld-name".
function zeigeFelder(felder, zusatzKlasse) {
  const bereich = document.querySelector(".felder");
  if (!bereich || !felder) return;

  bereich.innerHTML = "";

  felder.forEach(function (eintrag) {
    const kasten = document.createElement("article");
    kasten.className = "feld";

    const titel = document.createElement("h2");
    titel.className = zusatzKlasse ? "feld-titel " + zusatzKlasse : "feld-titel";
    titel.textContent = eintrag.titel;

    const text = document.createElement("p");
    text.className = "fliesstext";
    text.textContent = eintrag.text;

    kasten.appendChild(titel);
    kasten.appendChild(text);
    bereich.appendChild(kasten);
  });
}

// Die Aufzaehlung der Mitgliedervorteile
function zeigeVorteile(punkte) {
  const liste = document.querySelector(".vorteile");
  if (!liste || !punkte) return;

  liste.innerHTML = "";

  punkte.forEach(function (punkt) {
    const eintrag = document.createElement("li");
    eintrag.textContent = punkt;
    liste.appendChild(eintrag);
  });
}

// Die Liste der Mitgliederbeitraege: links die Art, rechts der Betrag
function zeigeBeitraege(beitraege) {
  const liste = document.querySelector(".beitraege");
  if (!liste || !beitraege) return;

  liste.innerHTML = "";

  beitraege.forEach(function (eintrag) {
    const zeile = document.createElement("div");
    zeile.className = "beitrag";

    const art = document.createElement("dt");
    art.textContent = eintrag.bezeichnung;

    const betrag = document.createElement("dd");
    betrag.textContent = eintrag.betrag;

    zeile.appendChild(art);
    zeile.appendChild(betrag);
    liste.appendChild(zeile);
  });
}

// Das Auswahlfeld "Art der Mitgliedschaft" im Anmeldeformular
function zeigeArten(arten) {
  const auswahl = document.querySelector('select[name="art"]');
  if (!auswahl || !arten) return;

  auswahl.innerHTML = "";

  arten.forEach(function (art) {
    const eintrag = document.createElement("option");
    eintrag.textContent = art;
    auswahl.appendChild(eintrag);
  });
}


/* ===== Alles zusammensetzen ===== */

function zeigeAlles(allgemein, seite) {
  // Beide Dokumente in einen Topf. Die Feldnamen ueberschneiden sich
  // nicht, deshalb genuegt eine gemeinsame Liste.
  const daten = Object.assign({}, allgemein, seite);

  // Erst die einzelnen Felder ueberall auf der Seite
  zeigeTexte(daten);
  zeigeBilder(daten);
  zeigeZiele(daten);
  zeigeTextLinks(daten);

  // Der Name im Reiter des Browsers
  if (daten.seitentitel) document.title = daten.seitentitel;

  // Die Mailadresse auf der Kontaktseite steht als Text da und ist
  // zugleich der Link. Das "mailto:" entsteht deshalb hier - im Studio
  // ist so nur die Adresse selbst zu pflegen, an einer Stelle.
  const mailLink = document.querySelector("#mail-link");
  if (mailLink && daten.mailAdresse) {
    mailLink.href = "mailto:" + daten.mailAdresse;
  }

  // Dann die Listen. Was es auf dieser Seite nicht gibt, ueberspringen
  // die Funktionen von selbst.
  zeigeKopfMenue(daten.menue);
  zeigeFussMenue(daten.fussMenue);
  zeigeSchauInfo(daten.schauInfo);
  zeigeEindruecke(daten.eindrueckeBilder);
  zeigeFelder(daten.felder, "");
  zeigeFelder(daten.personen, "feld-name");
  zeigeVorteile(daten.vorteile);
  zeigeBeitraege(daten.beitraege);
  zeigeArten(daten.formularArten);
}

// schief.js und bilder.js laufen einmal beim Laden - da stehen noch die
// Texte aus dem HTML. Nach dem Einsetzen sind Knoepfe und Baender anders
// hoch und es gibt neue Bilder, deshalb muessen beide noch einmal ran.
function nacharbeiten() {
  if (window.schneideAlles) window.schneideAlles();
  if (window.bilderBeobachten) window.bilderBeobachten();
}


/* ===== Daten laden ===== */

fetch(SANITY_ADRESSE)
  .then(function (antwort) {
    if (!antwort.ok) {
      throw new Error("Sanity antwortet mit Status " + antwort.status);
    }
    return antwort.json();
  })
  .then(function (daten) {
    const inhalt = daten.result;

    // Noch nichts im Studio angelegt: Texte aus dem HTML stehen lassen
    if (!inhalt || (!inhalt.allgemein && !inhalt.seite)) {
      console.warn("Kein Dokument für " + SEITE + " in Sanity gefunden.");
      return;
    }

    zeigeAlles(inhalt.allgemein, inhalt.seite);
    nacharbeiten();
  })
  .catch(function (fehler) {
    // Bei einem Fehler bleiben die Texte aus dem HTML stehen.
    // So sieht der Besucher nie eine leere Seite.
    console.error("Inhalte konnten nicht geladen werden:", fehler);
  });
