// Verschickt das Anmeldeformular über Web3Forms.
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

const formular = document.querySelector("#mitglied-formular");
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

    // Die gewaehlte Mitgliedschaft merken, BEVOR das Formular geleert wird -
    // der Betrag steht spaeter in der Bestaetigung.
    const art = daten.get("art");

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
          zeigeDank(art);
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

  // Die Bestaetigung nach dem Absenden.
  //
  // Die Anmeldung allein macht noch kein Mitglied - der Beitrag muss noch
  // ueberwiesen werden. Deshalb nennt die Bestaetigung den naechsten
  // Schritt beim Namen, wiederholt den gewaehlten Betrag und fuehrt zur
  // Zahlung. Ohne diesen Hinweis bliebe offen, dass noch etwas fehlt.
  function zeigeDank(art) {
    hinweis.textContent = "";
    hinweis.hidden = false;

    const dank = document.createElement("p");
    dank.className = "dank-titel";
    dank.textContent = "Vielen Dank für Ihre Anmeldung.";
    hinweis.appendChild(dank);

    const schritt = document.createElement("p");
    schritt.textContent =
      "Als Nächstes überweisen Sie den Jahresbeitrag" +
      // Die Auswahl sieht so aus: "Paarmitgliedschaft – CHF 70.– pro Jahr".
      // Fuer den Satz brauchen wir nur den Betrag hinter dem Gedankenstrich.
      (art && art.indexOf("–") > -1
        ? " (" + art.split("–").slice(1).join("–").trim() + ")"
        : "") +
      ". Die Mitgliedschaft gilt ab Zahlungseingang. " +
      "Wir melden uns anschliessend bei Ihnen.";
    hinweis.appendChild(schritt);

    const knopfZuTwint = document.createElement("a");
    knopfZuTwint.className = "knopf knopf-gross dank-knopf";
    knopfZuTwint.href = "#twint";
    const beschriftungTwint = document.createElement("span");
    beschriftungTwint.className = "knopf-text";
    beschriftungTwint.textContent = "Zur Zahlung";
    knopfZuTwint.appendChild(beschriftungTwint);
    hinweis.appendChild(knopfZuTwint);

    // Der neue Knopf braucht seine schiefe Ecke wie alle anderen.
    // schief.js lief schon, als es ihn noch nicht gab.
    if (window.schneideNach) window.schneideNach(knopfZuTwint);

    // Sanft zur Zahlung scrollen, damit der naechste Schritt sichtbar wird
    const ziel = document.querySelector("#twint");
    if (ziel) ziel.scrollIntoView({ behavior: "smooth", block: "center" });
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
