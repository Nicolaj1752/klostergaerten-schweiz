// Holt die Texte einer Unterseite aus dem Sanity CMS.
//
// Welche Seite gemeint ist, steht im HTML: <body data-seite="wissen">.
// So kommen alle vier Unterseiten mit dieser einen Datei aus.

const PROJEKT_ID = "ag1064vs";
const DATASET = "production";

// Welche Seite wird gerade angezeigt?
const SEITE = document.body.dataset.seite;

// Die Abfrage holt genau das Dokument dieser Seite.
// Die Anführungszeichen um die Seite sind wichtig, sonst sucht GROQ nach einem Feld.
const ABFRAGE =
  '*[_type == "unterseite" && seite == "' + SEITE + '"][0]{' +
  "titel, spalteLinks, spalteRechts, anschrift, email" +
  "}";

const ADRESSE =
  "https://" + PROJEKT_ID + ".apicdn.sanity.io/v2021-10-21/data/query/" +
  DATASET + "?query=" + encodeURIComponent(ABFRAGE);


/* ===== Texte in die Seite schreiben ===== */

// Baut die Abschnitte einer Spalte auf
function zeigeSpalte(abschnitte, bereichId) {
  const bereich = document.querySelector(bereichId);
  if (!bereich) return;

  // Ohne Inhalt bleibt der Ersatztext aus dem HTML stehen
  if (!abschnitte || abschnitte.length === 0) return;

  bereich.innerHTML = "";

  abschnitte.forEach(function (teil) {
    const block = document.createElement("div");
    block.className = "abschnitt";

    // Zwischentitel ist freiwillig
    if (teil.zwischentitel) {
      const titel = document.createElement("h2");
      titel.textContent = teil.zwischentitel;
      block.appendChild(titel);
    }

    const absatz = document.createElement("p");
    absatz.textContent = teil.text;
    block.appendChild(absatz);

    bereich.appendChild(block);
  });
}

// Zeigt Anschrift und E-Mail auf der Kontaktseite
function zeigeKontakt(anschrift, email) {
  const bereich = document.querySelector("#kontakt-angaben");
  if (!bereich) return;
  if (!anschrift && !email) return;

  bereich.innerHTML = "";

  // Jede Zeile der Anschrift einzeln ausgeben
  if (anschrift) {
    const zeilen = anschrift.split("\n");
    zeilen.forEach(function (zeile) {
      const p = document.createElement("div");
      p.textContent = zeile;
      bereich.appendChild(p);
    });
  }

  if (email) {
    const link = document.createElement("a");
    link.href = "mailto:" + email;
    link.textContent = email;

    const zeile = document.createElement("div");
    zeile.style.marginTop = "10px";
    zeile.appendChild(link);
    bereich.appendChild(zeile);
  }
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

    if (!inhalt) {
      console.warn("Kein Inhalt für die Seite '" + SEITE + "' in Sanity gefunden.");
      return;
    }

    if (inhalt.titel) {
      document.querySelector("#unter-titel").textContent = inhalt.titel;
      document.title = inhalt.titel + " – Klostergärten Schweiz";
    }

    zeigeSpalte(inhalt.spalteLinks, "#spalte-links");
    zeigeSpalte(inhalt.spalteRechts, "#spalte-rechts");
    zeigeKontakt(inhalt.anschrift, inhalt.email);
  })
  .catch(function (fehler) {
    // Bei einem Fehler bleiben die Texte aus dem HTML stehen.
    console.error("Texte konnten nicht geladen werden:", fehler);
  });
