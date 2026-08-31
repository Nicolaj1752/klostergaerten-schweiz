// Schiefe Kanten fuer Knoepfe, Bilder und Farbbaender.
//
// Dieselbe Regel wie beim Keyvisual: eine zufaellig gewaehlte Ecke wandert
// ein Stueck nach innen, dadurch steht genau eine Kante leicht schief.
// Umgesetzt mit clip-path, deshalb verschiebt sich der Inhalt nicht mit -
// nur die Flaeche wird beschnitten.
//
// Es gibt zwei Arten, den Versatz zu messen:
//
// - Knoepfe rechnen mit einem ANTEIL ihrer Hoehe. Sonst schneidet die
//   Schraege bei einem flachen Knopf in die Schrift.
// - Bilder und Baender rechnen in PIXELN. Sie sind so gross, dass ein
//   Anteil viel zu wuchtig ausfiele.


/* ===== Wie stark die einzelnen Bauteile kippen ===== */

// Die Hoechstwerte sind bewusst zurueckhaltend: bei staerkeren Schraegen
// entstehen einzelne Ausreisser, die aus der Reihe fallen. Die Kante soll
// auffallen, weil sie ueberall da ist - nicht weil sie steil ist.

const KNOPF_MIN = 0.06;   // Anteil der Knopfhoehe
const KNOPF_MAX = 0.08;   // mehr wuerde der Typografie in die Quere kommen

const BILD_MIN = 8;       // Pixel
const BILD_MAX = 11;

// Grosse Flaechen: 20 % zurueckgenommen (war 20 bis 24). Auf dem Handy
// sind die Abschnitte schmaler, dort kam die Schraege der Schrift in den
// Ecken sonst gefaehrlich nahe.
const BAND_MIN = 16;      // Pixel
const BAND_MAX = 19;


/* ===== Die Regel ===== */

// Beschneidet ein Element so, dass eine Ecke um "tief" Pixel nach innen rutscht.
// Mit nurOben kommen nur die beiden oberen Ecken in Frage. Das braucht die
// Fusszeile: unten sitzt der Text zu nah an der Kante und wuerde angeschnitten.
function schiefeEcke(element, tief, nurOben) {
  const auswahl = nurOben ? 2 : 4;
  const ecke = Math.floor(Math.random() * auswahl);

  // Die vier Ecken im Uhrzeigersinn: oben links, oben rechts,
  // unten rechts, unten links.
  const x = ["0", "100%", "100%", "0"];
  const y = ["0", "0", "100%", "100%"];

  // Nach innen heisst bei den oberen Ecken nach unten und umgekehrt.
  if (ecke === 0 || ecke === 1) {
    y[ecke] = tief + "px";
  } else {
    y[ecke] = "calc(100% - " + tief + "px)";
  }

  let punkte = "";
  for (let i = 0; i < 4; i++) {
    if (i > 0) punkte += ", ";
    punkte += x[i] + " " + y[i];
  }

  element.style.clipPath = "polygon(" + punkte + ")";
}


/* ===== Anwenden ===== */

// Versatz in Pixeln
function schneidePixel(auswahl, kleinst, groesst, nurOben) {
  const elemente = document.querySelectorAll(auswahl);
  elemente.forEach(function (element) {
    const tief = kleinst + Math.random() * (groesst - kleinst);
    schiefeEcke(element, tief, nurOben);
  });
}

// Versatz als Anteil der eigenen Hoehe
function schneideAnteil(auswahl, kleinst, groesst) {
  const elemente = document.querySelectorAll(auswahl);
  elemente.forEach(function (element) {
    const anteil = kleinst + Math.random() * (groesst - kleinst);
    schiefeEcke(element, element.offsetHeight * anteil, false);
  });
}

// Schneidet alles auf der Seite. Steht als Funktion am Fenster, damit
// inhalt.js sie noch einmal aufrufen kann: nach dem Einsetzen der Texte
// aus dem Studio sind Knoepfe und Baender anders hoch, und im Raster
// stehen neue Bilder.
window.schneideAlles = function () {
  schneideAnteil(".knopf", KNOPF_MIN, KNOPF_MAX);

  // Die drei Balken des Burger-Knopfs. Sie sind nur wenige Pixel hoch, ein
  // Anteil ihrer Hoehe waere unsichtbar - deshalb feste Pixel, und sehr
  // wenige: mehr als 3 Pixel liessen den Balken spitz zulaufen.
  schneidePixel(".burger-balken", 1, 3);
  schneidePixel(".bild", BILD_MIN, BILD_MAX);
  schneidePixel(".band:not(.fusszeile)", BAND_MIN, BAND_MAX);

  // Die Fusszeile kippt nur oben, links oder rechts. Unten bleibt sie gerade.
  schneidePixel(".fusszeile", BAND_MIN, BAND_MAX, true);
};

window.schneideAlles();


/* ===== Fuer spaeter dazugekommene Knoepfe ===== */

// Dieses Skript laeuft einmal beim Laden. Ein Knopf, der erst danach
// entsteht - etwa die Bestaetigung nach dem Absenden des Formulars -
// bekommt seine schiefe Ecke ueber diese Funktion.
window.schneideNach = function (element) {
  const anteil = KNOPF_MIN + Math.random() * (KNOPF_MAX - KNOPF_MIN);
  schiefeEcke(element, element.offsetHeight * anteil, false);
};
