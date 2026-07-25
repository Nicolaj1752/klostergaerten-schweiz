// Laesst die grosse Blume langsam und unregelmaessig hin und her drehen.
// Dafuer nutzen wir Perlin Noise: das ergibt eine weiche, natuerliche
// Bewegung statt eines gleichfoermigen Hin und Her.

const blume = document.querySelector("#deko-blume");
const blumeRechts = document.querySelector("#deko-blume-rechts");


/* ===== Perlin Noise (vereinfachte 1D-Variante) ===== */

// Eine Liste von Zufallswerten. Zwischen diesen wird spaeter weich ueberblendet.
const zufallswerte = [];
for (let i = 0; i < 256; i++) {
  zufallswerte.push(Math.random() * 2 - 1); // Werte zwischen -1 und 1
}

// Weichzeichner-Kurve: macht aus einem harten Uebergang einen sanften.
// Ohne diese Funktion wuerde die Bewegung an jedem Stuetzpunkt ruckeln.
function weich(t) {
  return t * t * (3 - 2 * t);
}

// Liefert zu einer Position x einen weichen Zufallswert zwischen -1 und 1
function noise(x) {
  // Ganzzahliger Teil: zwischen welchen zwei Zufallswerten sind wir?
  const index = Math.floor(x);
  // Nachkommateil: wie weit sind wir zwischen den beiden?
  const rest = x - index;

  // Die zwei benachbarten Zufallswerte holen.
  // Das "& 255" sorgt dafuer, dass wir immer innerhalb der Liste bleiben.
  const a = zufallswerte[index & 255];
  const b = zufallswerte[(index + 1) & 255];

  // Weich zwischen den beiden Werten ueberblenden
  const anteil = weich(rest);
  return a + (b - a) * anteil;
}


/* ===== Animation ===== */

const maxWinkel = 3.5;   // hoechster Ausschlag in Grad, deutlich sichtbar
const tempo = 0.00014;   // kleiner = langsamer

// Wird ca. 60 Mal pro Sekunde vom Browser aufgerufen
function animiere(zeit) {
  // Aus der verstrichenen Zeit einen Noise-Wert machen
  const wert = noise(zeit * tempo);

  // Wert (-1 bis 1) in einen Drehwinkel umrechnen
  const winkel = wert * maxWinkel;

  // Auf den Unterseiten gibt es nur die rechte Blume, deshalb pruefen wir das.
  if (blume) {
    blume.style.transform = "rotate(" + winkel + "deg)";
  }

  // Die rechte Blume liest den Noise an einer anderen Stelle (+50),
  // damit sich beide unabhaengig voneinander bewegen.
  const wertRechts = noise(zeit * tempo + 50);
  const winkelRechts = wertRechts * maxWinkel;

  if (blumeRechts) {
    blumeRechts.style.transform = "rotate(" + winkelRechts + "deg)";
  }

  // Naechstes Bild anfordern
  requestAnimationFrame(animiere);
}

// Animation starten
requestAnimationFrame(animiere);
