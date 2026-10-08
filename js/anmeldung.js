// Verschickt das Newsletter-Formular über Web3Forms.
//
// Die Seite liegt auf GitHub Pages und hat keinen eigenen Server. Ein
// Browser darf von sich aus keine Mail verschicken, deshalb nimmt der
// Dienst Web3Forms die Daten entgegen und leitet sie als Mail an die
// Vereinsadresse weiter.
//
// Ohne dieses Skript funktioniert das Formular auch - dann laedt der
// Browser aber die Antwortseite von Web3Forms. Das Skript verhindert das
// und laesst die Person auf der Seite, mit einer Meldung darunter.

/* ===== Einstellungen ===== */

const ZIEL = "https://api.web3forms.com/submit";
const ADRESSE = "info@klostergärten.ch"; // steht in den Meldungen unten

/* ===== Das Formular ===== */

const formular = document.querySelector("#newsletter-formular");
const hinweis = document.querySelector("#formular-hinweis");

// Ohne Formular auf der Seite ist hier nichts zu tun
if (formular) {
  const knopf = formular.querySelector("button");
  const knopfText = knopf.querySelector(".knopf-text");
  const beschriftung = knopfText.textContent;

  formular.addEventListener("submit", function (ereignis) {
    // Der Browser wuerde sonst die Antwortseite des Dienstes laden
    ereignis.preventDefault();

    // Waehrend des Sendens den Knopf sperren, sonst schickt ein zweiter
    // Klick die Anmeldung ein zweites Mal.
    knopf.disabled = true;
    knopfText.textContent = "Wird gesendet …";

    zeigeHinweis("");

    const daten = new FormData(formular);

    fetch(ZIEL, {
      method: "POST",
      body: daten,
    })
      .then(function (antwort) {
        return antwort.json();
      })
      .then(function (ergebnis) {
        if (ergebnis.success) {
          formular.reset();
          zeigeDank();
        } else {
          // Der Dienst hat geantwortet, aber etwas stimmt nicht - meist ein
          // fehlender oder falscher Schluessel.
          zeigeFehler();
        }
      })
      .catch(function () {
        // Gar keine Verbindung zustande gekommen
        zeigeFehler();
      })
      .finally(function () {
        knopf.disabled = false;
        knopfText.textContent = beschriftung;
      });
  });

  // Die Bestaetigung nach dem Absenden. Sie steht an der Stelle des
  // Formulars, damit nach dem Klick sichtbar etwas passiert ist.
  function zeigeDank() {
    hinweis.textContent = "";
    hinweis.hidden = false;

    const dank = document.createElement("p");
    dank.className = "dank-titel";
    dank.textContent = "Vielen Dank für Ihre Anmeldung.";
    hinweis.appendChild(dank);

    const schritt = document.createElement("p");
    schritt.textContent =
      "Sie erhalten unseren Newsletter ab der nächsten Ausgabe. " +
      "Möchten Sie Mitglied werden, überweisen Sie den Jahresbeitrag " +
      "mit TWINT und schreiben uns an " +
      ADRESSE +
      ".";
    hinweis.appendChild(schritt);
  }

  // Bei einem Fehler nennen wir die Mailadresse: so geht niemand verloren,
  // nur weil der Dienst gerade nicht erreichbar ist.
  function zeigeFehler() {
    zeigeHinweis(
      "Das hat leider nicht geklappt. Bitte schreiben Sie uns direkt an " +
        ADRESSE +
        ".",
    );
  }

  // Leerer Text blendet den Hinweis wieder aus
  function zeigeHinweis(text) {
    hinweis.textContent = text;
    hinweis.hidden = text === "";
  }
}
