// Holt die Texte aus dem Sanity CMS und schreibt sie in die Seite.
//
// Wichtig: Es steht kein Passwort in dieser Datei. Das Dataset ist
// oeffentlich lesbar, deshalb genuegt eine normale Adresse zum Abfragen.

// ----- Zugangsdaten des Projekts -----
// Diese ID muss mit der in studio/sanity.config.ts uebereinstimmen.
const PROJEKT_ID = "ag1064vs";
const DATASET = "production";

// Die Abfrage (GROQ): hole das eine Startseiten-Dokument.
const ABFRAGE = `*[_type == "startseite"][0]{
  heroTitel,
  menue,
  spalteLinks,
  spalteRechts,
  kontaktLinkText,
  kontaktLinkZiel
}`;

// Adresse zusammenbauen. encodeURIComponent sorgt dafuer, dass
// Sonderzeichen der Abfrage die Adresse nicht kaputt machen.
const ADRESSE =
  "https://" + PROJEKT_ID + ".apicdn.sanity.io/v2021-10-21/data/query/" +
  DATASET + "?query=" + encodeURIComponent(ABFRAGE);


/* ===== Texte in die Seite schreiben ===== */

// Setzt den grossen Titel im Foto
function zeigeTitel(text) {
  if (!text) return;
  document.querySelector("#hero-titel").textContent = text;
}

// Baut die Menuepunkte auf der pinken Blume
function zeigeMenue(punkte) {
  if (!punkte) return;

  const liste = document.querySelector("#menu-links");
  liste.innerHTML = "";

  punkte.forEach(function (punkt) {
    const eintrag = document.createElement("li");
    const link = document.createElement("a");

    link.textContent = punkt.beschriftung;
    link.href = punkt.ziel;

    eintrag.appendChild(link);
    liste.appendChild(eintrag);
  });
}

// Fuellt eine Textspalte: Ueberschrift und Absaetze
function zeigeSpalte(spalte, bereichId) {
  if (!spalte) return;

  const bereich = document.querySelector(bereichId);
  const titel = bereich.querySelector("h2");
  const absatzBereich = bereich.querySelector(".absaetze");

  titel.textContent = spalte.ueberschrift;

  // Alte Absaetze entfernen, dann neue einsetzen
  absatzBereich.innerHTML = "";

  spalte.absaetze.forEach(function (text) {
    const absatz = document.createElement("p");
    absatz.textContent = text;
    absatzBereich.appendChild(absatz);
  });
}

// Setzt den kursiven Kontakt-Link unter der linken Spalte
function zeigeKontaktLink(text, ziel) {
  const link = document.querySelector("#kontakt-link");
  if (!text) {
    link.style.display = "none";
    return;
  }
  link.textContent = text;
  link.href = ziel || "#kontakt";
}


/* ===== Daten laden ===== */

fetch(ADRESSE)
  .then(function (antwort) {
    if (!antwort.ok) {
      throw new Error("Sanity antwortet mit Status " + antwort.status);
    }
    return antwort.json();
  })
  .then(function (daten) {
    const inhalt = daten.result;

    // Noch kein Dokument im Studio angelegt: Texte aus dem HTML stehen lassen
    if (!inhalt) {
      console.warn("Kein Startseiten-Dokument in Sanity gefunden.");
      return;
    }

    zeigeTitel(inhalt.heroTitel);
    zeigeMenue(inhalt.menue);
    zeigeSpalte(inhalt.spalteLinks, "#spalte-links");
    zeigeSpalte(inhalt.spalteRechts, "#spalte-rechts");
    zeigeKontaktLink(inhalt.kontaktLinkText, inhalt.kontaktLinkZiel);
  })
  .catch(function (fehler) {
    // Wenn etwas schiefgeht, bleiben die Texte aus dem HTML stehen.
    // So sieht der Besucher nie eine leere Seite.
    console.error("Texte konnten nicht geladen werden:", fehler);
  });
