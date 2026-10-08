// Die Animationsseite.
//
// Sie gehoert nicht zur Website, sondern dient dazu, kurze Filme fuers
// Netz aufzunehmen: Hochformat 2K (1440 x 2560), Hintergrund immer das
// Creme der Website. Mit der Taste I ist sie von jeder Seite aus zu
// erreichen.
//
// Drei Animationen, die Pfeiltasten wechseln zwischen ihnen:
//
//   1 Logo    - "Klostergärten Schweiz" wuerfelt jede Sekunde neu
//   2 Garten  - das grosse Keyvisual mit dem Klosternamen darunter,
//               wie auf der Startseite auf dem Handy
//   3 Liste   - zwei Spalten, in die nacheinander an zufaelligen
//               Stellen Kloster einlaufen
//   4 Sechs   - sechs Gaerten in zwei Spalten und drei Reihen, ohne
//               Schrift, die gemeinsam weiterwuerfeln
//
// Gezeichnet wird auf eine Leinwand (<canvas>) statt als SVG. Grund: nur
// eine Leinwand laesst sich direkt als Film aufzeichnen. Die Formen
// kommen trotzdem aus js/keyvisual.js - wuerfleForm und berechnePunkte
// rechnen dort die Regeln aus, hier werden sie nur gezeichnet. So bleibt
// das Logo im Film dasselbe wie auf der Website.

/* ===== Format und Tempo ===== */

// Die Groesse des Films in Pixeln. Hochformat 2K.
const BILD_BREITE = 1440;
const BILD_HOEHE = 2560;

// Was die Leinwand gerade misst. Nur der Export der Logo-Schleife stellt
// sie kurz auf andere Formate um und danach wieder zurueck. Die drei
// anderen Animationen sind fuers Hochformat gebaut und rechnen darum
// weiter mit den beiden Zahlen darueber.
let flaecheBreite = BILD_BREITE;
let flaecheHoehe = BILD_HOEHE;

const BILDRATE = 60; // Bilder pro Sekunde in der Aufnahme

// Der Rand, an dem alles haengt - wie --seitenrand auf der Website
const BILD_RAND = BILD_BREITE * 0.07;

// Wie oft die einzelnen Animationen weiterruecken, in Millisekunden
const LOGO_TAKT = 1000; // das Logo wuerfelt jede Sekunde neu
const GARTEN_TAKT = 1000; // der grosse Garten ebenso
const LISTE_TAKT = 260; // Abstand zwischen zwei Paaren in der Liste
const LISTE_PAAR = 2; // so viele Kloster kommen auf einmal dazu
const LISTE_HALT = 2000; // Pause, wenn die Liste voll ist
const SECHS_TAKT = 2000; // die sechs Gaerten wuerfeln gemeinsam weiter

// Wie nah der Kreis an die Mauer darf. 1 hiesse: so nah wie auf der
// Website. Kleinere Werte ziehen ihn zur Bildmitte, so bleibt auch beim
// aeussersten Wurf ein Rand zwischen Kreis und Mauer. Im Film faellt ein
// Kreis, der an der Mauer klebt, viel staerker auf als auf der Website.
const KREIS_INNEN = 0.8;

// In der flachen Logoform rueckt er noch weiter nach innen: nach oben und
// unten hat sie viel weniger Platz, derselbe Wert liesse den Kreis dort
// trotzdem an der Mauer kleben. Gilt fuer das Logo und die sechs Gaerten,
// beide haben dieselbe Form.
const LOGO_KREIS = 0.6;

// Das Seitenverhaeltnis der Zeichnung im Logo: breiter als hoch. Derselbe
// Wert steht als aspect-ratio bei .logo-visual in css/praesentation.css.
const FORM_VERHAELTNIS = 1.9;

// So viele Zeilen haelt der grosse Garten unter der Zeichnung frei:
// Nummer, Name, Ort und Orden. Kloster ohne Orden haben nur drei - der
// Platz bleibt trotzdem derselbe, damit die Zeichnung nicht springt.
const GARTEN_ZEILEN = 4;

// Kreis und Eingaenge im grossen Garten, gemeinsam vergroessert. 1 waere
// so wie auf der Website. Auf der ganzen Bildhoehe wirken beide sonst
// kleiner, als sie auf dem Handy erscheinen.
const GARTEN_KREIS_GROSS = 1.15;

// Die Strichstaerke der Zeichnung. Die Grundstaerke steht als STRICH in
// js/keyvisual.js, diese Zahlen verstaerken sie - genau wie data-strich
// im HTML der Website.
const LOGO_STRICH = 2.4; // im kleinen Logo, sonst zu fein
const GARTEN_STRICH = 1.35; // derselbe Wert wie auf dem Handy
const SECHS_STRICH = 2; // die sechs sind kleiner und brauchen mehr

const SCHRIFT = '"Satoshi", "Helvetica Neue", Arial, sans-serif';

/* ===== Die Leinwand ===== */

const leinwand = document.querySelector("#leinwand");
const ctx = leinwand.getContext("2d");


/* ===== Kleine Helfer ===== */

// Stellt die Leinwand auf ein Format um. Die Zahlen an <canvas> sind die
// echten Bildpunkte des Films - wie gross die Leinwand auf dem Schirm
// erscheint, entscheidet allein das CSS.
function setzeFlaeche(breite, hoehe) {
  flaecheBreite = breite;
  flaecheHoehe = hoehe;

  leinwand.width = breite;
  leinwand.height = hoehe;
}

// Der Seitenrand fuer die aktuelle Flaeche. Er waechst mit der Breite
// mit, damit das Logo in jedem Format gleich viel Luft hat.
function rand() {
  return flaecheBreite * 0.07;
}

// Setzt Schriftgroesse und -staerke fuers naechste Schreiben. Die
// Sperrung ist ein Anteil der Groesse, wie letter-spacing im CSS.
function schrift(groesse, staerke, sperrung) {
  ctx.font = staerke + " " + groesse + "px " + SCHRIFT;

  // Aeltere Browser kennen letterSpacing nicht - dort bleibt die Zeile
  // eben etwas weiter, sonst aendert sich nichts.
  if ("letterSpacing" in ctx) {
    ctx.letterSpacing = (sperrung || 0) * groesse + "px";
  }
}

// Wie breit eine Zeile in der aktuellen Schrift ist
function breiteVon(text) {
  return ctx.measureText(text).width;
}

// Dieselben Zeilen wie im Keyvisual: Nummer, Name, Ort und, falls
// bekannt, der Orden. Die Nummer ist die Position in der Liste.
function klosterZeilen(platz) {
  const kloster = KLOESTER[platz];
  const nummer = String(platz + 1).padStart(3, "0");

  const zeilen = ["№ " + nummer, kloster.name, kloster.ort];
  if (kloster.orden) zeilen.push(kloster.orden);

  return zeilen;
}

// Mischt eine Liste von Zahlen durch (Fisher-Yates). Die Liste wird
// dabei selbst veraendert.
function mischeReihenfolge(liste) {
  for (let i = liste.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const merk = liste[i];
    liste[i] = liste[j];
    liste[j] = merk;
  }
}

// Bricht einen Text auf hoechstens so viele Zeilen um. Passt er nicht,
// laeuft die letzte Zeile lieber ueber - ein abgeschnittener
// Klostername waere schlimmer als eine zu lange Zeile.
function umbrich(text, breite, hoechstens) {
  const woerter = text.split(" ");
  const zeilen = [];
  let zeile = "";

  for (let i = 0; i < woerter.length; i++) {
    const versuch = zeile === "" ? woerter[i] : zeile + " " + woerter[i];

    // Passt nicht mehr, und es gibt noch eine Zeile uebrig
    if (
      zeile !== "" &&
      zeilen.length < hoechstens - 1 &&
      breiteVon(versuch) > breite
    ) {
      zeilen.push(zeile);
      zeile = woerter[i];
    } else {
      zeile = versuch;
    }
  }

  zeilen.push(zeile);
  return zeilen;
}

/* ===== Ein Garten auf der Leinwand ===== */

// Ein Garten merkt sich seine Form und die vorherige, damit er sich
// weich dorthin verwandelt statt zu springen - wie das Keyvisual.
function macheGarten() {
  return {
    form: wuerfleForm(),
    von: null, // Stand beim letzten Wurf
    seit: 0, // wann der Wurf war
    punkte: [], // was gerade gezeichnet wird
  };
}

// Setzt einen Garten ohne Verwandlung auf eine neue Form. Das braucht
// der Wechsel der Animation: sie soll gleich dastehen und nicht aus dem
// Stand herueberwandern, den sie hatte, als man sie zuletzt sah.
function setzeGarten(garten, zeit) {
  garten.punkte = [];
  wuerfleGarten(garten, zeit);
}

// Eine neue Variante. Der aktuelle Stand wird zum Startpunkt.
function wuerfleGarten(garten, zeit) {
  nimmForm(garten, wuerfleForm(), zeit);
}

// Dasselbe mit einer Form, die schon feststeht. Das braucht der Export
// der Logo-Schleife: dort ist die Reihenfolge vorher gewuerfelt, damit
// der letzte Wurf wieder bei der ersten Form ankommt.
function nimmForm(garten, form, zeit) {
  garten.von = garten.punkte.length > 0 ? garten.punkte : null;
  garten.form = form;
  garten.seit = zeit;
}

// Die Punkte fuer dieses Bild: das Ziel, oder unterwegs dorthin.
// berechnePunkte kommt aus js/keyvisual.js und liefert Anteile von 0
// bis 1, mische und bremse ebenfalls.
function punkteJetzt(garten, zeit, breite, hoehe) {
  const ziel = berechnePunkte(garten.form, breite, hoehe);
  const anteil = Math.max(0, (zeit - garten.seit) / DAUER);

  if (garten.von && anteil < 1) {
    garten.punkte = mische(garten.von, ziel, bremse(anteil));
  } else {
    garten.punkte = ziel;
    garten.von = null;
  }

  return garten.punkte;
}

// Zieht die Kreismitte ein Stueck zur Bildmitte. Sonst kann ein Wurf den
// Kreis so weit nach aussen setzen, dass er fast an der Mauer klebt.
// anteil 1 laesst alles, wie es ist, kleinere Werte halten mehr Rand.
// Die Mauer bleibt unberuehrt, nur der Kreis rueckt nach.
function kreisNachInnen(punkte, anteil) {
  const naeher = punkte.slice();
  naeher[8] = 0.5 + (punkte[8] - 0.5) * anteil;
  naeher[9] = 0.5 + (punkte[9] - 0.5) * anteil;
  return naeher;
}

// Zeichnet einen Klostergarten in das Rechteck ab x, y.
// Die drei Regeln, in dieser Reihenfolge: die Mauer aus vier Balken,
// die zwei Balken in Hintergrundfarbe, die die vier Eingaenge
// herausschneiden, und zuletzt der Kreis in der Mitte.
// kreisFaktor vergroessert Kreis und Eingaenge gemeinsam - beide
// gehoeren zusammen, ein groesserer Kreis mit gleich schmalen Eingaengen
// saehe verrutscht aus. Ohne Angabe gilt 1, also die Masse der Website.
function zeichneGarten(x, y, breite, hoehe, punkte, strichFaktor, kreisFaktor) {
  const faktor = breite / REFERENZ;
  const dick = STRICH * faktor * strichFaktor;
  const gross = kreisFaktor || 1;
  const mitteX = punkte[8] * breite;
  const mitteY = punkte[9] * hoehe;

  ctx.save();
  ctx.translate(x, y);

  // Das Viereck ist die Aussenkante der Mauer
  ctx.beginPath();
  for (let i = 0; i < 8; i += 2) {
    const eckeX = punkte[i] * breite;
    const eckeY = punkte[i + 1] * hoehe;
    if (i === 0) ctx.moveTo(eckeX, eckeY);
    else ctx.lineTo(eckeX, eckeY);
  }
  ctx.closePath();

  // Die Mauer waechst nach innen. Die Leinwand kann nur mittig
  // zeichnen, deshalb derselbe Umweg wie im SVG: doppelt so dick
  // zeichnen und auf die Flaeche beschneiden. Uebrig bleibt die
  // innere Haelfte.
  ctx.save();
  ctx.clip();
  ctx.strokeStyle = GRUEN;
  ctx.lineWidth = 2 * dick;
  ctx.stroke();
  ctx.restore();

  // Die beiden Balken gehen durch die Kreismitte. Sie ragen etwas
  // ueber den Rand hinaus, sonst bliebe in den Eingaengen eine
  // haarfeine Kante der Mauer stehen.
  ctx.strokeStyle = CREME;
  ctx.lineWidth = EINGANG * faktor * gross;
  ctx.beginPath();
  ctx.moveTo(-dick, mitteY);
  ctx.lineTo(breite + dick, mitteY);
  ctx.moveTo(mitteX, -dick);
  ctx.lineTo(mitteX, hoehe + dick);
  ctx.stroke();

  // Der Kreis ist die Mitte des Gartens
  ctx.strokeStyle = GRUEN;
  ctx.lineWidth = dick;
  ctx.beginPath();
  ctx.arc(mitteX, mitteY, RADIUS * faktor * gross, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

/* ===== Animation 1: das Logo ===== */

// "Klostergärten Schweiz" auf zwei Zeilen, die Zeichnung steht hinter
// dem zweiten Wort - wie das Logo in der Praesentation. Jede Sekunde
// eine neue Variante, sonst passiert nichts.

const logoGarten = macheGarten();
let logoGewuerfelt = 0;

function starteLogo(zeit) {
  logoGewuerfelt = zeit;
  setzeGarten(logoGarten, zeit);
}

function zeichneLogo(zeit) {
  if (zeit - logoGewuerfelt >= LOGO_TAKT) {
    logoGewuerfelt = zeit;
    wuerfleGarten(logoGarten, zeit);
  }

  zeichneLogoBild(zeit);
}

// Die reine Zeichnung, ohne eigenen Takt. Sie rechnet mit der aktuellen
// Flaeche und passt darum in jedes Exportformat.
function zeichneLogoBild(zeit) {
  // Die Schriftgroesse wird so gewaehlt, dass der breitere der beiden
  // Bloecke genau in die Zielbreite passt. Gemessen wird bei einer
  // Probegroesse, danach eine Regel: doppelt so gross, doppelt so breit.
  const ziel = flaecheBreite - 2 * rand();
  const probe = 100;

  schrift(probe, 900, -0.02);
  const wortOben = breiteVon("Klostergärten");

  // Die zweite Zeile traegt die Zeichnung: 0.3 em Abstand, dann eine
  // Zeichnung von 1.35 em Hoehe im Verhaeltnis 1.9 zu 1.
  const wortUnten =
    breiteVon("Schweiz") + probe * (0.3 + 1.35 * FORM_VERHAELTNIS);
  const groesse = (probe * ziel) / Math.max(wortOben, wortUnten);

  schrift(groesse, 900, -0.02);

  const breiteOben = breiteVon("Klostergärten");
  const breiteUnten =
    breiteVon("Schweiz") + groesse * (0.3 + 1.35 * FORM_VERHAELTNIS);
  const links = (flaecheBreite - Math.max(breiteOben, breiteUnten)) / 2;

  // Zwei Zeilen im Zeilenabstand 0.95, zusammen mittig im Bild
  const zeilenAbstand = groesse * 0.95;
  const grundlinie = flaecheHoehe / 2 - zeilenAbstand / 2 + groesse * 0.36;

  ctx.fillStyle = GRUEN;
  ctx.textBaseline = "alphabetic";
  ctx.fillText("Klostergärten", links, grundlinie);
  ctx.fillText("Schweiz", links, grundlinie + zeilenAbstand);

  // Die Oberkante der Zeichnung liegt auf der x-Hoehe des Worts
  // daneben. Die x-Hoehe bringt die Schrift selbst mit, deshalb wird
  // sie hier gemessen statt geschaetzt.
  const xHoehe = ctx.measureText("x").actualBoundingBoxAscent;
  const gartenHoehe = groesse * 1.35;
  const gartenBreite = gartenHoehe * FORM_VERHAELTNIS;
  const gartenX = links + breiteVon("Schweiz") + groesse * 0.3;
  const gartenY = grundlinie + zeilenAbstand - xHoehe;

  const punkte = punkteJetzt(logoGarten, zeit, gartenBreite, gartenHoehe);
  const naeher = kreisNachInnen(punkte, LOGO_KREIS);
  zeichneGarten(
    gartenX,
    gartenY,
    gartenBreite,
    gartenHoehe,
    naeher,
    LOGO_STRICH,
  );
}

/* ===== Animation 2: der grosse Garten ===== */

// Wie die Startseite auf dem Handy: die Zeichnung gross, darunter die
// Angaben zum Kloster. Beides wechselt gemeinsam.

const grosserGarten = macheGarten();
let gartenGewuerfelt = 0;
let gartenZeilen = [];

function starteGarten(zeit) {
  gartenGewuerfelt = zeit;
  setzeGarten(grosserGarten, zeit);
  gartenZeilen = klosterZeilen(Math.floor(Math.random() * KLOESTER.length));
}

function zeichneGartenBild(zeit) {
  if (zeit - gartenGewuerfelt >= GARTEN_TAKT) {
    gartenGewuerfelt = zeit;
    wuerfleGarten(grosserGarten, zeit);
    gartenZeilen = klosterZeilen(Math.floor(Math.random() * KLOESTER.length));
  }

  // Die Angaben sind so gross wie der Vereinsname in der Kopfzeile,
  // gemessen an der Bildbreite statt in festen Pixeln.
  const textGroesse = BILD_BREITE * 0.046;
  const zeilenAbstand = textGroesse * 1.35;

  // Der Platz fuer den Text ist immer gleich hoch, auch wenn ein Kloster
  // ohne Orden nur drei Zeilen hat. Sonst spraenge die Zeichnung bei
  // jedem Wechsel ein Stueck hoch oder runter - im Film faellt das als
  // Unruhe auf.
  const textHoehe = GARTEN_ZEILEN * zeilenAbstand;

  // Zeichnung und Angaben stehen als ein Block mittig im Bild
  const breite = BILD_BREITE - 2 * BILD_RAND;
  const hoehe = BILD_HOEHE * 0.62;
  const oben = (BILD_HOEHE - hoehe - BILD_RAND * 0.8 - textHoehe) / 2;

  const punkte = punkteJetzt(grosserGarten, zeit, breite, hoehe);
  const naeher = kreisNachInnen(punkte, KREIS_INNEN);
  zeichneGarten(
    BILD_RAND,
    oben,
    breite,
    hoehe,
    naeher,
    GARTEN_STRICH,
    GARTEN_KREIS_GROSS,
  );

  ctx.fillStyle = GRUEN;
  ctx.textBaseline = "alphabetic";
  schrift(textGroesse, 600, 0);

  // Eine Zeile pro Angabe, buendig mit der linken Kante der Zeichnung
  gartenZeilen.forEach(function (text, i) {
    const y = oben + hoehe + BILD_RAND * 0.8 + textGroesse + i * zeilenAbstand;
    ctx.fillText(text, BILD_RAND, y);
  });
}

/* ===== Animation 3: die Liste ===== */

// Zwei Spalten mit festen Plaetzen. Die Plaetze werden in zufaelliger
// Reihenfolge besetzt, einer nach dem anderen. Ist die Seite voll,
// bleibt sie kurz stehen und faengt dann von vorn an.

const LISTE_SPALTEN = 2;
const LISTE_GROESSE = BILD_BREITE * 0.023; // klein, aber noch lesbar
const LISTE_ZEILE = LISTE_GROESSE * 1.3;
const LISTE_PLATZ_ZEILEN = 4; // Nummer, Name (bis zu zwei Zeilen), Ort
const LISTE_LUECKE = LISTE_GROESSE * 1.2; // Abstand zwischen zwei Plaetzen

// Die Masse eines Platzes ergeben sich daraus
const LISTE_SPALTE_BREITE =
  (BILD_BREITE - 2 * BILD_RAND - BILD_RAND * (LISTE_SPALTEN - 1)) /
  LISTE_SPALTEN;
const LISTE_PLATZ_HOEHE = LISTE_PLATZ_ZEILEN * LISTE_ZEILE + LISTE_LUECKE;
const LISTE_REIHEN = Math.floor(
  (BILD_HOEHE - 2 * BILD_RAND) / LISTE_PLATZ_HOEHE,
);

// Ein Eintrag pro besetztem Platz, sonst null
let listePlaetze = [];
let listeFolge = []; // in welcher Reihenfolge die Plaetze drankommen
let listeKloester = []; // welche Kloster gezogen werden
let listeStand = 0; // wie viele schon stehen
let listeGesetzt = 0; // wann der letzte dazukam

function starteListe(zeit) {
  const anzahl = LISTE_REIHEN * LISTE_SPALTEN;

  listePlaetze = [];
  listeFolge = [];

  for (let i = 0; i < anzahl; i++) {
    listePlaetze.push(null);
    listeFolge.push(i);
  }

  // Beides gemischt: zufaellige Plaetze und zufaellige Kloster
  mischeReihenfolge(listeFolge);

  listeKloester = [];
  for (let i = 0; i < KLOESTER.length; i++) {
    listeKloester.push(i);
  }
  mischeReihenfolge(listeKloester);

  listeStand = 0;
  listeGesetzt = zeit;
}

// Legt das naechste Kloster auf seinen Platz. Die Zeilen werden hier
// einmal umgebrochen und gemerkt, nicht bei jedem Bild neu.
function setzeNaechstes(zeit) {
  const platz = listeFolge[listeStand];
  const kloster = listeKloester[listeStand % listeKloester.length];
  const zeilen = klosterZeilen(kloster);

  schrift(LISTE_GROESSE, 600, 0);
  const name = umbrich(zeilen[1], LISTE_SPALTE_BREITE, 2);

  listePlaetze[platz] = {
    nummer: zeilen[0],
    name: name,
    ort: zeilen[2],
    seit: zeit,
  };

  listeStand++;
  listeGesetzt = zeit;
}

function zeichneListe(zeit) {
  const voll = listeStand >= listePlaetze.length;

  // Immer zwei auf einmal, das laesst die Liste zuegiger einlaufen
  if (!voll && zeit - listeGesetzt >= LISTE_TAKT) {
    for (let i = 0; i < LISTE_PAAR && listeStand < listePlaetze.length; i++) {
      setzeNaechstes(zeit);
    }
  }

  // Ist die Seite voll, bleibt sie kurz stehen und beginnt von vorn
  if (voll && zeit - listeGesetzt >= LISTE_HALT) {
    starteListe(zeit);
    return;
  }

  ctx.fillStyle = GRUEN;
  ctx.textBaseline = "alphabetic";

  listePlaetze.forEach(function (eintrag, i) {
    if (!eintrag) return;

    const spalte = i % LISTE_SPALTEN;
    const reihe = Math.floor(i / LISTE_SPALTEN);
    const x = BILD_RAND + spalte * (LISTE_SPALTE_BREITE + BILD_RAND);
    const y = BILD_RAND + reihe * LISTE_PLATZ_HOEHE + LISTE_GROESSE;

    // Kurz eingeblendet statt hart gesetzt - sonst zuckt die Liste
    const anteil = Math.min(1, (zeit - eintrag.seit) / 220);
    ctx.globalAlpha = anteil;

    // Die Nummer etwas fetter als der Rest, wie im Keyvisual
    schrift(LISTE_GROESSE, 700, 0);
    ctx.fillText(eintrag.nummer, x, y);

    schrift(LISTE_GROESSE, 500, 0);
    eintrag.name.forEach(function (zeile, n) {
      ctx.fillText(zeile, x, y + (n + 1) * LISTE_ZEILE);
    });

    ctx.fillText(eintrag.ort, x, y + (eintrag.name.length + 1) * LISTE_ZEILE);

    ctx.globalAlpha = 1;
  });
}

/* ===== Animation 4: sechs Gaerten ===== */

// Zwei Spalten, drei Reihen, keine Schrift - nur die Formen. Alle sechs
// wuerfeln gemeinsam weiter, wie die Logos auf Folie 7 der Praesentation.
// Gemeinsam und nicht jede fuer sich: sechs eigene Rhythmen wirken
// unruhig, im selben Takt wird der Wechsel zur Figur.

const SECHS_SPALTEN = 2;
const SECHS_REIHEN = 3;

// Der Abstand zwischen zwei Reihen. Er ist ungefaehr so gross wie eine
// Form hoch ist - dadurch hat jede Form oben und unten so viel Luft wie
// sie selbst misst und die flachen Formen verschmelzen nicht zu Baendern.
const SECHS_LUECKE = BILD_RAND * 3;


// Die sechs Gaerten. Jeder merkt sich seine eigene Form.
const sechsGaerten = [];

for (let i = 0; i < SECHS_SPALTEN * SECHS_REIHEN; i++) {
  sechsGaerten.push(macheGarten());
}

let sechsGewuerfelt = 0;

function starteSechs(zeit) {
  sechsGewuerfelt = zeit;

  sechsGaerten.forEach(function (garten) {
    setzeGarten(garten, zeit);
  });
}

function zeichneSechs(zeit) {
  // Im Lauf wird gewuerfelt, nicht gesetzt: dabei sollen sich die Formen
  // ineinander verwandeln.
  if (zeit - sechsGewuerfelt >= SECHS_TAKT) {
    sechsGewuerfelt = zeit;

    sechsGaerten.forEach(function (garten) {
      wuerfleGarten(garten, zeit);
    });
  }

  // Die Breite ergibt sich aus den Spalten, die Hoehe aus dem
  // Verhaeltnis des Logos - die Form ist also genau so breit und hoch
  // wie die Zeichnung neben dem Schriftzug.
  const breite =
    (BILD_BREITE - BILD_RAND * (SECHS_SPALTEN + 1)) / SECHS_SPALTEN;
  const hoehe = breite / FORM_VERHAELTNIS;

  // Weil die Formen flach sind, fuellen sie das Hochformat nicht aus.
  // Die drei Reihen stehen darum als Block mittig im Bild.
  const blockHoehe = SECHS_REIHEN * hoehe + (SECHS_REIHEN - 1) * SECHS_LUECKE;
  const oben = (BILD_HOEHE - blockHoehe) / 2;

  sechsGaerten.forEach(function (garten, i) {
    const spalte = i % SECHS_SPALTEN;
    const reihe = Math.floor(i / SECHS_SPALTEN);
    const x = BILD_RAND + spalte * (breite + BILD_RAND);
    const y = oben + reihe * (hoehe + SECHS_LUECKE);

    const punkte = punkteJetzt(garten, zeit, breite, hoehe);
    const naeher = kreisNachInnen(punkte, LOGO_KREIS);
    zeichneGarten(x, y, breite, hoehe, naeher, SECHS_STRICH);
  });
}

/* ===== Die vier Animationen ===== */

const ANIMATIONEN = [
  { name: "Logo", starte: starteLogo, zeichne: zeichneLogo },
  { name: "Garten", starte: starteGarten, zeichne: zeichneGartenBild },
  { name: "Liste", starte: starteListe, zeichne: zeichneListe },
  { name: "Sechs Gärten", starte: starteSechs, zeichne: zeichneSechs },
];

let aktuell = 0;

const anzeige = document.querySelector("#anzeige");

// Faengt die gewaehlte Animation von vorn an
function zeige(nummer) {
  // Im Kreis: nach der letzten kommt wieder die erste
  aktuell = (nummer + ANIMATIONEN.length) % ANIMATIONEN.length;

  ANIMATIONEN[aktuell].starte(performance.now());
  anzeige.textContent =
    aktuell + 1 + " / " + ANIMATIONEN.length + " · " + ANIMATIONEN[aktuell].name;
}

// Wird rund 60 Mal pro Sekunde aufgerufen
function bild(zeit) {
  // Der Hintergrund ist immer das Creme der Website
  ctx.fillStyle = CREME;
  ctx.fillRect(0, 0, flaecheBreite, flaecheHoehe);

  // Waehrend des Exports laeuft die Schleife nach ihrem eigenen Plan,
  // sonst die Animation, die gerade gewaehlt ist.
  if (schleifeLaeuft) {
    zeichneSchleife(zeit);
  } else {
    ANIMATIONEN[aktuell].zeichne(zeit);
    zeigeDauer(zeit);
  }

  requestAnimationFrame(bild);
}

/* ===== Aufnahme ===== */

// Aufgezeichnet wird der Bildstrom der Leinwand. Der Browser liefert
// je nach Hersteller ein anderes Format - genommen wird das erste, das
// er kann. Safari kann MP4, Chrome und Firefox WebM.
const FORMATE = [
  { typ: "video/mp4;codecs=avc1", endung: "mp4" },
  { typ: "video/mp4", endung: "mp4" },
  { typ: "video/webm;codecs=vp9", endung: "webm" },
  { typ: "video/webm;codecs=vp8", endung: "webm" },
  { typ: "video/webm", endung: "webm" },
];

const knopf = document.querySelector("#aufnahme-knopf");
const knopfText = knopf.querySelector(".knopf-text");

let aufnahme = null; // laeuft gerade eine?
let stuecke = []; // die Bruchstuecke des Films
let begonnen = 0; // wann die Aufnahme begann
let dateiName = ""; // was im Dateinamen hinter "klostergaerten-" steht
let danach = null; // was nach dem Speichern geschehen soll

// Das erste Format, das dieser Browser aufnehmen kann
function findeFormat() {
  for (let i = 0; i < FORMATE.length; i++) {
    if (MediaRecorder.isTypeSupported(FORMATE[i].typ)) return FORMATE[i];
  }
  return null;
}

// Beginnt eine Aufnahme der Leinwand, so wie sie gerade ist. Der Strom
// wird jedes Mal neu geholt: er merkt sich die Groesse der Leinwand, und
// beim Export wechselt die von Format zu Format.
function beginneAufnahme(name) {
  const format = findeFormat();

  if (!format) {
    knopfText.textContent = "Browser kann nicht aufnehmen";
    return false;
  }

  const strom = leinwand.captureStream(BILDRATE);
  stuecke = [];
  dateiName = name;

  aufnahme = new MediaRecorder(strom, {
    mimeType: format.typ,
    videoBitsPerSecond: 20000000, // hohe Qualitaet, die Datei darf gross sein
  });

  aufnahme.ondataavailable = function (ereignis) {
    if (ereignis.data.size > 0) stuecke.push(ereignis.data);
  };

  // Der Film ist erst fertig, wenn der Browser die letzten Bruchstuecke
  // abgeliefert hat - deshalb wird hier gespeichert und nicht schon beim
  // Stoppen. Erst danach geht es beim Export mit dem naechsten Format
  // weiter.
  aufnahme.onstop = function () {
    speichere(format);

    if (danach) {
      const weiter = danach;
      danach = null;
      weiter();
    }
  };

  aufnahme.start();
  begonnen = performance.now();

  document.body.classList.add("nimmt-auf");
  return true;
}

function beendeAufnahme() {
  if (!aufnahme) return;

  aufnahme.stop();
  aufnahme = null;

  document.body.classList.remove("nimmt-auf");
}

// Zeichnet sofort ein Bild, statt auf das naechste der laufenden
// Schleife zu warten. Das braucht jede Aufnahme: eine frisch umgestellte
// Leinwand ist leer, und das erste Bild des Films waere sonst schwarz.
function zeichneSofort(zeichner, zeit) {
  ctx.fillStyle = CREME;
  ctx.fillRect(0, 0, flaecheBreite, flaecheHoehe);
  zeichner(zeit);
}

// Der Knopf: die laufende Animation aufnehmen
function starteAufnahme() {
  // Die laufende Animation faengt von vorn an, damit der Film sauber
  // beginnt und nicht mitten in einer Bewegung.
  zeige(aktuell);
  zeichneSofort(ANIMATIONEN[aktuell].zeichne, performance.now());

  beginneAufnahme(ANIMATIONEN[aktuell].name.toLowerCase());
}

function stoppeAufnahme() {
  beendeAufnahme();
  knopfText.textContent = "Aufnahme starten";
}

// Legt die Bruchstuecke zu einer Datei zusammen und laedt sie herunter
function speichere(format) {
  const datei = new Blob(stuecke, { type: format.typ });
  const adresse = URL.createObjectURL(datei);

  // Der Name traegt die Aufnahme und die Uhrzeit, damit sich zwei
  // Aufnahmen nicht gegenseitig ueberschreiben.
  const stempel = new Date()
    .toISOString()
    .slice(0, 16)
    .replace(/[-:T]/g, "")
    .replace(/(\d{8})(\d{4})/, "$1-$2");

  const link = document.createElement("a");
  link.href = adresse;
  link.download =
    "klostergaerten-" + dateiName + "-" + stempel + "." + format.endung;
  link.click();

  // Der Browser braucht den Verweis noch einen Moment
  setTimeout(function () {
    URL.revokeObjectURL(adresse);
  }, 10000);
}

// Schreibt die laufende Zeit in den Knopf
function zeigeDauer(zeit) {
  if (!aufnahme) return;

  const sekunden = Math.floor((zeit - begonnen) / 1000);
  const minuten = Math.floor(sekunden / 60);
  const rest = String(sekunden % 60).padStart(2, "0");

  knopfText.textContent = "Aufnahme stoppen · " + minuten + ":" + rest;
}

knopf.addEventListener("click", function () {
  if (schleifeLaeuft) return; // waehrend des Exports macht der Knopf nichts

  if (aufnahme) stoppeAufnahme();
  else starteAufnahme();
});

/* ===== Die Logo-Schleife in allen Formaten ===== */

// Ein Knopfdruck, vier Dateien: dasselbe Logo mit fuenf Wuerfen, einmal
// in jedem Format, das gebraucht wird.
//
// Die Schleife ist so gebaut, dass sie sich nahtlos wiederholt. Dafuer
// stehen die fuenf Formen vorher fest, und der fuenfte Wurf fuehrt zur
// ersten zurueck. Das letzte Bild ist damit dasselbe wie das erste.
//
// Der Takt ist um die Dauer einer Verwandlung nach vorn geschoben: so
// steht am Anfang und am Ende dieselbe fertige Form, und jede Form wird
// gleich lang gehalten. Deshalb muss DAUER (aus keyvisual.js) kuerzer
// sein als LOGO_TAKT - sonst begaenne der erste Wurf vor dem Start.

const SCHLEIFE_WUERFE = 5;
const SCHLEIFE_DAUER = SCHLEIFE_WUERFE * LOGO_TAKT;

// Die Formate. Alle in 2K gerechnet, quer entsprechend breiter.
const SCHLEIFE_FORMATE = [
  { name: "hochformat", breite: 1440, hoehe: 2560 }, // 9:16, Stories und Reels
  { name: "feed", breite: 1440, hoehe: 1800 }, // 4:5, der hohe Beitrag
  { name: "quadrat", breite: 1440, hoehe: 1440 }, // 1:1
  { name: "querformat", breite: 2560, hoehe: 1440 }, // 16:9, Web und Video
];

const schleifeKnopf = document.querySelector("#schleife-knopf");
const schleifeKnopfText = schleifeKnopf.querySelector(".knopf-text");

let schleifeLaeuft = false;
let schleifeNummer = 0; // welches Format gerade dran ist
let schleifeStart = 0; // wann die laufende Aufnahme begann
let schleifeFormen = []; // die fuenf Formen dieser Schleife
let schleifeSchritt = 0; // wie viele Wuerfe schon waren

// Der Zeitpunkt des Wurfs Nummer i, vom Start der Schleife an gerechnet
function wurfZeit(i) {
  return LOGO_TAKT - DAUER + i * LOGO_TAKT;
}

function starteSchleife() {
  if (aufnahme || schleifeLaeuft) return;

  if (!findeFormat()) {
    schleifeKnopfText.textContent = "Browser kann nicht aufnehmen";
    return;
  }

  schleifeLaeuft = true;
  schleifeNummer = 0;

  // Fuenf Formen, die in jedem Format dieselben sind - so zeigen alle
  // vier Dateien dieselbe Schleife, nur anders beschnitten.
  schleifeFormen = [];
  for (let i = 0; i < SCHLEIFE_WUERFE; i++) {
    schleifeFormen.push(wuerfleForm());
  }

  naechstesFormat();
}

// Stellt das naechste Format ein und nimmt eine Schleife auf
function naechstesFormat() {
  if (schleifeNummer >= SCHLEIFE_FORMATE.length) {
    beendeSchleife();
    return;
  }

  const format = SCHLEIFE_FORMATE[schleifeNummer];
  setzeFlaeche(format.breite, format.hoehe);

  // Auf Anfang: die erste Form steht sofort, ohne Verwandlung
  schleifeSchritt = 0;
  schleifeStart = performance.now();
  logoGarten.punkte = [];
  nimmForm(logoGarten, schleifeFormen[0], schleifeStart);

  zeichneSofort(zeichneLogoBild, schleifeStart);

  schleifeKnopfText.textContent =
    format.name +
    " · " +
    (schleifeNummer + 1) +
    " / " +
    SCHLEIFE_FORMATE.length;

  // Das naechste Format kommt dran, sobald diese Datei gespeichert ist
  danach = function () {
    schleifeNummer++;
    naechstesFormat();
  };

  // Klappt die Aufnahme nicht, bleibt der Export nicht haengen
  if (!beginneAufnahme("logo-" + format.name)) {
    danach = null;
    beendeSchleife();
  }
}

// Ein Bild der laufenden Schleife
function zeichneSchleife(zeit) {
  const seit = zeit - schleifeStart;

  // Faellige Wuerfe nachholen. Der letzte fuehrt zur ersten Form zurueck,
  // deshalb der Rest: nach dem fuenften Wurf steht wieder Form 0.
  while (
    schleifeSchritt < SCHLEIFE_WUERFE &&
    seit >= wurfZeit(schleifeSchritt)
  ) {
    const wann = schleifeStart + wurfZeit(schleifeSchritt);
    schleifeSchritt++;

    nimmForm(
      logoGarten,
      schleifeFormen[schleifeSchritt % SCHLEIFE_WUERFE],
      wann,
    );
  }

  zeichneLogoBild(zeit);

  // Fertig: die letzte Verwandlung ist genau jetzt angekommen
  if (seit >= SCHLEIFE_DAUER) beendeAufnahme();
}

// Alles zurueck auf Anfang: Standardformat und die gewaehlte Animation
function beendeSchleife() {
  schleifeLaeuft = false;

  setzeFlaeche(BILD_BREITE, BILD_HOEHE);
  zeige(aktuell);

  schleifeKnopfText.textContent = "Logo-Schleife exportieren";
}

schleifeKnopf.addEventListener("click", starteSchleife);

/* ===== Tasten ===== */

document.addEventListener("keydown", function (ereignis) {
  // Tastenkuerzel des Browsers nicht abfangen
  if (ereignis.metaKey || ereignis.ctrlKey || ereignis.altKey) return;

  // Waehrend des Exports laeuft alles nach Plan - keine Taste dazwischen
  if (schleifeLaeuft) return;

  if (ereignis.key === "ArrowRight" || ereignis.key === "ArrowDown") {
    zeige(aktuell + 1);
  } else if (ereignis.key === "ArrowLeft" || ereignis.key === "ArrowUp") {
    zeige(aktuell - 1);
  } else if (ereignis.key === "r" || ereignis.key === "R") {
    if (aufnahme) stoppeAufnahme();
    else starteAufnahme();
  } else if (ereignis.key === "s" || ereignis.key === "S") {
    starteSchleife();
  } else if (ereignis.key === "Escape") {
    window.location.href = "index.html";
  }
});

/* ===== Los geht's ===== */

// Erst zeichnen, wenn Satoshi geladen ist: sonst misst das Logo die
// Ersatzschrift aus und faellt in der ersten Sekunde zu gross aus.
function los() {
  setzeFlaeche(BILD_BREITE, BILD_HOEHE);
  zeige(0);
  requestAnimationFrame(bild);
}

if (document.fonts) {
  document.fonts.ready.then(los);
} else {
  los();
}
