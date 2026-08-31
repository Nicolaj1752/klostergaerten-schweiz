// Die Praesentation.
//
// Dieselbe Datei macht zwei Dinge, je nachdem, auf welcher Seite sie laeuft:
//
// - Auf den normalen Seiten der Website oeffnet die Taste P die Praesentation.
// - Auf der Praesentation selbst blaettern die Pfeiltasten, Escape fuehrt
//   zurueck zur Website.
//
// Woran das Skript merkt, wo es ist: nur praesentation.html enthaelt Folien.

const folien = document.querySelectorAll(".folie");
const zaehler = document.querySelector("#folie-zaehler");

// Welche Folie gerade zu sehen ist, von 0 an gezaehlt
let aktuell = 0;


/* ===== Blaettern ===== */

// Zeigt eine Folie und versteckt die anderen. Vor der ersten und hinter
// der letzten ist Schluss - es geht bewusst nicht im Kreis weiter, sonst
// steht man beim Vortragen unversehens wieder am Anfang.
function zeige(nummer) {
  if (nummer < 0) nummer = 0;
  if (nummer > folien.length - 1) nummer = folien.length - 1;

  aktuell = nummer;

  folien.forEach(function (folie, i) {
    folie.classList.toggle("folie-an", i === aktuell);
  });

  zaehler.textContent = aktuell + 1 + " / " + folien.length;

  // Eine Folie mit der Klasse "ohne-zaehler" zeigt keine Nummer - das
  // grosse Keyvisual am Schluss soll ganz fuer sich stehen.
  zaehler.hidden = folien[aktuell].classList.contains("ohne-zaehler");

  // Eine Folie, die ihre Zeilen nacheinander einblendet, faengt wieder
  // von vorn an, sobald man sie neu betritt.
  folien[aktuell].querySelectorAll(".schritt").forEach(function (schritt) {
    schritt.classList.remove("schritt-an");
  });

  schneideKnoepfe();
  schalteTakt();
}

/* ===== Ein Schritt vor und zurueck ===== */

// Nicht jeder Schritt ist eine neue Folie: hat die aktuelle noch eine
// verborgene Zeile, kommt zuerst die. Erst wenn alle stehen, geht es
// weiter zur naechsten Folie.
function weiter() {
  const naechste = folien[aktuell].querySelector(".schritt:not(.schritt-an)");

  if (naechste) {
    naechste.classList.add("schritt-an");
    return;
  }

  // Auf der letzten Folie ist Schluss. Ohne diese Zeile wuerde zeige()
  // die Folie neu aufbauen und die eingeblendeten Zeilen wieder loeschen.
  if (aktuell === folien.length - 1) return;

  zeige(aktuell + 1);
}

// Rueckwaerts dasselbe in umgekehrter Reihenfolge: zuerst verschwindet
// die zuletzt gezeigte Zeile wieder.
function zurueck() {
  const gezeigte = folien[aktuell].querySelectorAll(".schritt-an");

  if (gezeigte.length > 0) {
    gezeigte[gezeigte.length - 1].classList.remove("schritt-an");
    return;
  }

  // Auf der ersten Folie ebenso
  if (aktuell === 0) return;

  zeige(aktuell - 1);
}

// Die schiefe Ecke eines Knopfs rechnet mit seiner Hoehe. Auf einer
// versteckten Folie ist die 0, der Knopf bliebe rechteckig - darum
// bekommt er seine Ecke erst, wenn seine Folie sichtbar wird.
function schneideKnoepfe() {
  // Beim allerersten Aufruf ist schief.js noch nicht geladen
  if (!window.schneideNach) return;

  folien[aktuell].querySelectorAll(".knopf").forEach(function (knopf) {
    window.schneideNach(knopf);
  });
}


/* ===== Tasten ===== */

document.addEventListener("keydown", function (ereignis) {
  // In einem Eingabefeld bleibt jede Taste ein ganz normaler Buchstabe
  const feld = document.activeElement;
  if (feld && (feld.tagName === "INPUT" || feld.tagName === "TEXTAREA")) return;

  // Tastenkuerzel des Browsers (Cmd-P zum Drucken) nicht abfangen
  if (ereignis.metaKey || ereignis.ctrlKey || ereignis.altKey) return;

  // Auf der Website: P oeffnet die Praesentation
  if (folien.length === 0) {
    if (ereignis.key === "p" || ereignis.key === "P") {
      window.location.href = "praesentation.html";
    }
    return;
  }

  // In der Praesentation: vor, zurueck oder raus
  if (ereignis.key === "ArrowRight" || ereignis.key === "ArrowDown") {
    weiter();
  } else if (ereignis.key === "ArrowLeft" || ereignis.key === "ArrowUp") {
    zurueck();
  } else if (ereignis.key === "Escape") {
    window.location.href = "redesign.html";
  }
});


/* ===== Klicken ===== */

// Beim Vortragen ist ein Klick oft naeher als die Tastatur: er blaettert
// vorwaerts. Nur auf der Praesentation, sonst wuerde jeder Klick auf der
// Website etwas ausloesen.
if (folien.length > 0) {
  document.addEventListener("click", function (ereignis) {
    // Knoepfe und Visuals haben ihre eigene Aufgabe. Ohne diese Zeile
    // wuerde jeder Druck auf einen Knopf zugleich weiterblaettern.
    if (ereignis.target.closest(".knopf, .keyvisual")) return;

    weiter();
  });
}


/* ===== Folie 1: altes und neues Typografie-System ===== */

// Beide Fassungen stehen im HTML. Der Knopf schaltet um, welche zu sehen
// ist - das Aussehen steht alles im CSS.
const typoKnopf = document.querySelector("#typo-knopf");
const folieTypo = document.querySelector("#folie-typo");

if (typoKnopf) {
  typoKnopf.addEventListener("click", function () {
    const neu = folieTypo.classList.toggle("zeigt-neu");

    typoKnopf.querySelector(".knopf-text").textContent = neu
      ? "Altes System"
      : "Neues System";
  });
}


/* ===== Folie 6: das Logo neu wuerfeln ===== */

const logoKnopf = document.querySelector("#logo-knopf");
const logoVisual = document.querySelector("#logo-visual");

if (logoKnopf) {
  logoKnopf.addEventListener("click", function () {
    logoVisual.steuerung.wuerfle();
  });
}


/* ===== Folie 7: sechs Logos im selben Takt ===== */

// Die sechs wuerfeln nicht jedes fuer sich, sondern gemeinsam - darum
// diese eine Uhr statt der eingebauten in keyvisual.js (data-ohne-uhr).
const TAKT = 2600; // Millisekunden zwischen zwei Wuerfen

const folieLogos = document.querySelector("#folie-logos");
const logoVisuals = document.querySelectorAll("#folie-logos .keyvisual");

let takt = null;

function wuerfleAlle() {
  logoVisuals.forEach(function (svg) {
    svg.steuerung.wuerfle();
  });
}

// Die Uhr laeuft nur, solange die Folie mit den Logos zu sehen ist. Auf
// einer versteckten Folie zeichnet nichts, das Wuerfeln waere verschenkt.
function schalteTakt() {
  clearInterval(takt);
  takt = null;

  if (!folieLogos || !folieLogos.classList.contains("folie-an")) return;

  takt = setInterval(wuerfleAlle, TAKT);
}


/* ===== Los geht's ===== */

// Die erste Folie
if (folien.length > 0) zeige(0);
