// Blendet Bilder und Texte ein, sobald sie beim Scrollen in den Blick kommen.
//
// Gemacht mit GSAP und ScrollTrigger. Beide liegen als Datei in assets/js/,
// nicht in einer CDN: die Seite soll sich weiterhin per Doppelklick und ohne
// Netz oeffnen lassen.
//
// Der Effekt ist bewusst zurueckhaltend: leicht von unten hereinschieben und
// aufblenden. Nichts dreht oder springt - die Fotos und die grossen Titel
// sollen wirken, nicht die Animation.

// Was eingeblendet wird. Die Reihenfolge spielt keine Rolle, jedes Element
// bekommt seinen eigenen Ausloeser beim Scrollen.
const EINBLEND_KLASSEN = [
  ".bild",          // alle Fotos, auch die im Raster
  ".marke",         // die kleinen Ueberschriften
  ".aussage",       // die grossen Saetze
  ".fliesstext",    // die Begleittexte
  ".feld",          // die Wissensfelder
  ".person",        // die Personen auf "Ueber uns"
];

// Alle Namen hier beginnen mit EINBLEND_. Grund: alle Skripte der Seite
// teilen sich denselben Namensraum. Ein schlichtes DAUER gibt es in
// keyvisual.js schon - zwei gleiche Namen und die Datei laeuft gar nicht.

// Wie weit ein Element von unten hereinkommt, in Pixeln.
const EINBLEND_WEG = 24;

// Wie lange das Einblenden dauert, in Sekunden.
const EINBLEND_DAUER = 0.7;

// Der Abstand zwischen zwei Kacheln im selben Raster, in Sekunden.
// So laufen die sechs Bilder nacheinander auf statt alle gleichzeitig.
const EINBLEND_VERSATZ = 0.12;

// Sammelt alle Elemente, die eingeblendet werden sollen.
function findeElemente() {
  return document.querySelectorAll(EINBLEND_KLASSEN.join(", "));
}

// Sagt dem CSS, dass es die Elemente verstecken darf. Das passiert erst
// hier und nicht im Stylesheet: ohne GSAP - kein Netz, Datei fehlt - bleibt
// die Klasse aus und die Seite ist vollstaendig sichtbar.
function versteckenErlauben() {
  document.documentElement.classList.add("blendet");
}

// Legt fuer ein einzelnes Element den Ausloeser an.
//
// verzoegerung staffelt die Kacheln eines Rasters. Bei allem anderen ist
// sie 0, dann startet das Element sofort, wenn es in den Blick kommt.
function blendeEin(element, verzoegerung) {
  gsap.fromTo(
    element,
    { opacity: 0, y: EINBLEND_WEG },
    {
      opacity: 1,
      y: 0,
      duration: EINBLEND_DAUER,
      delay: verzoegerung,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,

        // "top 90%" heisst: los, sobald die Oberkante des Elements die
        // unteren 10 % des Fensters erreicht. Etwas frueher als die
        // Fenstermitte, damit nichts leer wirkt, wenn jemand schnell scrollt.
        start: "top 90%",

        // Nur einmal. Beim Zurueckscrollen bleibt alles stehen -
        // ein Bild, das erneut aufblendet, wirkt wie ein Fehler.
        once: true,
      },
    }
  );
}

// Startet die Animation fuer alles, was noch nicht laeuft.
//
// Die Funktion steht am Fenster, damit inhalt.js sie noch einmal aufrufen
// kann: das Bilderraster aus dem Studio entsteht erst nach dem Laden.
window.einblendenStarten = function () {
  // Ohne GSAP passiert nichts. Die Seite bleibt dann so, wie sie im HTML
  // steht - vollstaendig lesbar, nur ohne Bewegung.
  if (typeof gsap === "undefined") return;

  // Wer im Betriebssystem weniger Bewegung eingestellt hat, bekommt keine.
  // Dann bleibt alles sofort sichtbar stehen.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // ScrollTrigger muss einmal bei GSAP angemeldet werden, sonst kennt
  // gsap.fromTo die Option scrollTrigger nicht.
  gsap.registerPlugin(ScrollTrigger);

  versteckenErlauben();

  findeElemente().forEach(function (element) {

    // Schon angemeldet? Dann nicht ein zweites Mal. Ohne diese Marke
    // wuerde inhalt.js beim Nachladen alles erneut auf unsichtbar setzen.
    if (element.dataset.blendet === "ja") return;
    element.dataset.blendet = "ja";

    // Kacheln im Raster laufen versetzt an. Der Versatz ergibt sich aus
    // der Position innerhalb des Rasters.
    let verzoegerung = 0;
    const raster = element.closest(".bilder-raster");

    if (raster) {
      const geschwister = Array.prototype.slice.call(raster.children);
      verzoegerung = geschwister.indexOf(element) * EINBLEND_VERSATZ;
    }

    blendeEin(element, verzoegerung);
  });
};

window.einblendenStarten();
