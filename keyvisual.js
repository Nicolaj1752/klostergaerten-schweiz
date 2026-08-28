// Das generative Keyvisual: ein Klostergarten von oben.
//
// Die Regeln, nach denen jede Variante entsteht:
//
// 1. Vier Balken bilden die Mauer. Eine Ecke wird nach innen versetzt,
//    dadurch steht genau eine Seite schief (5 bis 15 Grad).
// 2. Der Kreis ist die Mitte des Gartens und sitzt jedes Mal woanders.
// 3. Durch die Kreismitte laufen zwei Balken in Hintergrundfarbe. Wo sie die
//    Mauer kreuzen, schneiden sie vier Eingaenge heraus. Weil beide Balken
//    durch den Kreis gehen, zeigen alle vier Eingaenge zur Mitte.
//
// Dazu die Bewegung:
// - Der Kreis folgt der Maus ein Stueck weit. Die Eingaenge wandern mit,
//   weil sie immer auf den Kreis zeigen.
// - Ein Klick wuerfelt eine neue Variante. Die Ecken und der Kreis wandern
//   dorthin, statt zu springen.
//
// Die Zeichnung misst ihre eigene Flaeche und fuellt sie ganz aus. Deshalb
// funktioniert dieselbe Funktion gross als Keyvisual und klein als Logo.

/* ===== Einstellungen ===== */

// Bei dieser Breite gelten die Masse darunter genau in Pixeln. Ist die
// Flaeche kleiner oder groesser, wird alles im gleichen Verhaeltnis mitskaliert.
const REFERENZ = 1400;

// Die Strichstaerke der ganzen Zeichnung. Mauer und Kreis werden beide
// damit gezeichnet - hier anpassen, wenn die Linien dicker oder duenner
// werden sollen. Alle anderen Masse skalieren nicht mit.
const STRICH = 17;

const EINGANG = 105; // Breite der vier Eingaenge
const RADIUS = 92; // Radius des Kreises
const ABSTAND = 1.7; // Abstand des Kreises zur Mauer, in Radien

// Die Beschriftung neben dem Kreis
const LUECKE = 34; // Abstand vom Kreisrand zur Schrift
const ZEILE = 1.35; // Zeilenabstand, mal Schriftgroesse

const WINKEL_MIN = 5; // schiefe Seite: kleinster Winkel in Grad
const WINKEL_MAX = 15; // und groesster

const GRUEN = "#082302";
const CREME = "#FDFFEA";

const DAUER = 700; // Millisekunden fuer die Verwandlung
const PAUSE = 8000; // danach wuerfelt es von allein weiter
const FOLGE = 0.03; // wie weit der Kreis der Maus folgt (Anteil der Breite)
const TRAEGHEIT = 0.06; // je kleiner, desto traeger folgt der Kreis

// Wer im Betriebssystem weniger Bewegung eingestellt hat, bekommt keine.
const RUHIG = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ===== Kleine Helfer ===== */

// Zufallszahl zwischen min und max
function zufall(min, max) {
  return min + Math.random() * (max - min);
}

// Weiche Bremse: schnell los, sanft ankommen
function bremse(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Setzt eine Position zwischen zwei Raendern. Vorne und hinten koennen
// verschieden gross sein. Ist zu wenig Platz da, landet sie in der Mitte.
function platziere(anteil, laenge, vorne, hinten) {
  const spanne = laenge - vorne - hinten;
  if (spanne <= 0) return laenge / 2;
  return vorne + anteil * spanne;
}

// Mischt zwei Zahlenlisten. t = 0 ergibt a, t = 1 ergibt b.
function mische(a, b, t) {
  const ergebnis = [];
  for (let i = 0; i < a.length; i++) {
    ergebnis.push(a[i] + (b[i] - a[i]) * t);
  }
  return ergebnis;
}

// Erstellt ein SVG-Element. Fuer SVG braucht es createElementNS,
// mit createElement wuerde nichts sichtbar.
function macheElement(name, attribute) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", name);
  for (const schluessel in attribute) {
    el.setAttribute(schluessel, attribute[schluessel]);
  }
  return el;
}

/* ===== Eine Variante wuerfeln ===== */

// Gewuerfelt werden nur die Entscheidungen, nicht die Koordinaten. So laesst
// sich dieselbe Form spaeter in jeder Fenstergroesse neu ausrechnen.
function wuerfleForm() {
  return {
    ecke: Math.floor(zufall(0, 4)), // welche Ecke wandert
    senkrecht: Math.random() < 0.5, // senkrecht oder waagrecht
    winkel: zufall(WINKEL_MIN, WINKEL_MAX),
    kreisX: Math.random(),
    kreisY: Math.random(),
  };
}

// Rechnet eine Form in vier Eckpunkte und die Kreismitte um.
// Herauskommen Anteile von 0 bis 1, damit die Werte unabhaengig von der
// Fenstergroesse sind und sich sauber ineinander mischen lassen.
function berechnePunkte(form, breite, hoehe) {
  const faktor = breite / REFERENZ;
  const mauer = STRICH * faktor;
  const radius = RADIUS * faktor;

  // Das Viereck ist die AUSSENKANTE der Mauer und liegt genau auf dem Rand
  // der Flaeche. Die Mauer waechst von hier nach innen (siehe zeichne).
  // Dadurch ist der Titel darunter automatisch buendig.
  const ecken = [
    [0, 0],
    [breite, 0],
    [breite, hoehe],
    [0, hoehe],
  ];

  // Wie weit die Ecke wandert. Gemessen wird der Winkel an der kurzen Seite,
  // sonst wuerden 15 Grad auf der langen Seite die Form sprengen.
  const kurzeSeite = Math.min(breite, hoehe);
  const versatz = kurzeSeite * Math.tan((form.winkel * Math.PI) / 180);

  const istLinks = form.ecke === 0 || form.ecke === 3;
  const istOben = form.ecke === 0 || form.ecke === 1;

  if (form.senkrecht) {
    // die waagrechte Seite kippt
    ecken[form.ecke][1] += istOben ? versatz : -versatz;
  } else {
    // die senkrechte Seite kippt
    ecken[form.ecke][0] += istLinks ? versatz : -versatz;
  }

  // Die versetzte Ecke zieht eine Wand schraeg nach innen. Auf genau dieser
  // Seite braucht der Kreis mehr Abstand, sonst schneidet die Wand ihn an.
  let obenPlus = 0;
  let untenPlus = 0;
  let linksPlus = 0;
  let rechtsPlus = 0;

  if (form.senkrecht) {
    if (istOben) obenPlus = versatz;
    else untenPlus = versatz;
  } else {
    if (istLinks) linksPlus = versatz;
    else rechtsPlus = versatz;
  }

  const abstand = radius * ABSTAND;
  const mitteX = platziere(
    form.kreisX,
    breite,
    abstand + linksPlus,
    abstand + rechtsPlus,
  );
  const mitteY = platziere(
    form.kreisY,
    hoehe,
    abstand + obenPlus,
    abstand + untenPlus,
  );

  // Alles als Anteil zurueckgeben
  const punkte = [];
  ecken.forEach(function (punkt) {
    punkte.push(punkt[0] / breite, punkt[1] / hoehe);
  });
  punkte.push(mitteX / breite, mitteY / hoehe);
  return punkte;
}

/* ===== Mausposition ===== */

// Von -1 (links/oben) bis 1 (rechts/unten). Wird von allen Visuals geteilt.
let mausX = 0;
let mausY = 0;

window.addEventListener("mousemove", function (ereignis) {
  mausX = (ereignis.clientX / window.innerWidth) * 2 - 1;
  mausY = (ereignis.clientY / window.innerHeight) * 2 - 1;
});

/* ===== Ein Visual zum Leben erwecken ===== */

function starteKeyvisual(svg) {
  // Die vier Teile werden einmal erstellt und danach nur noch mit neuen
  // Werten gefuettert. Das ist fluessiger, als bei jedem Bild alles neu
  // aufzubauen. Die Reihenfolge ist wichtig: erst die Mauer, dann die
  // Balken, die die Eingaenge herausschneiden, und zuletzt der Kreis.
  // Die Mauer bekommt einen INNENLIEGENDEN Strich, so wie in Figma.
  // SVG kann das nicht direkt, deshalb der Umweg: der Pfad wird doppelt so
  // dick gezeichnet und anschliessend auf die Flaeche des Vierecks
  // beschnitten. Uebrig bleibt genau die innere Haelfte.
  //
  // Ein mittiger Strich waere hier falsch: an einer schiefen Ecke ragt seine
  // Gehrungsspitze ueber den Bildrand hinaus, wird dort abgeschnitten und
  // hinterlaesst ein kurzes gerades Stueck in der Ecke.
  const schnittId = "garten-" + Math.round(Math.random() * 1e9);

  const schnittForm = macheElement("path", {});
  const schnitt = macheElement("clipPath", { id: schnittId });
  schnitt.appendChild(schnittForm);
  svg.appendChild(schnitt);

  const mauerWeg = macheElement("path", {
    fill: "none",
    stroke: GRUEN,
    "clip-path": "url(#" + schnittId + ")",
  });
  const balkenQuer = macheElement("line", { stroke: CREME });
  const balkenHoch = macheElement("line", { stroke: CREME });
  const kreis = macheElement("circle", { fill: "none", stroke: GRUEN });

  // Die Beschriftung kommt zuletzt und liegt damit ueber allem anderen.
  const beschriftung = macheElement("text", { class: "garten-name" });

  svg.appendChild(mauerWeg);
  svg.appendChild(balkenQuer);
  svg.appendChild(balkenHoch);
  svg.appendChild(kreis);
  svg.appendChild(beschriftung);

  // Der Zustand dieses einen Visuals
  let form = wuerfleForm(); // die Form, zu der hin animiert wird
  let vonPunkte = null; // Stand beim letzten Klick
  let startZeit = 0; // wann die Verwandlung begann
  let punkte = []; // was gerade gezeichnet wird

  // Der weich nachgezogene Mausversatz
  let folgtX = 0;
  let folgtY = 0;

  // Der Zustand der Beschriftung
  let zeilenElemente = []; // ein <tspan> pro Zeile
  let textBreite = 0; // gemessene Breite, 0 heisst "neu messen"
  let schriftHoehe = 18; // Schriftgroesse in Pixeln, kommt aus dem CSS

  // Zieht ein zufaelliges Kloster und schreibt es in die Beschriftung.
  // Zuoberst steht die Nummer auf einer eigenen Zeile, darunter Name und
  // Ort. Der Orden kommt nur dazu, wenn einer bekannt ist.
  function waehleKloster() {
    const platz = Math.floor(zufall(0, KLOESTER.length));
    const kloster = KLOESTER[platz];

    // Die Nummer ist die Position in der Liste. Dreistellig, damit alle
    // Nummern gleich breit sind und die Zeilen nicht verspringen.
    const nummer = String(platz + 1).padStart(3, "0");

    // Das Zeichen davor ist das Numero-Zeichen U+2116 (№). Satoshi zeichnet
    // es mit dem unterstrichenen o. Nicht zu verwechseln mit N + º
    // (U+00BA): dort fehlt der Strich unter dem o.
    const zeilen = ["№ " + nummer, kloster.name, kloster.ort];
    if (kloster.orden) zeilen.push(kloster.orden);

    // Alte Zeilen wegwerfen, neue anlegen
    beschriftung.textContent = "";
    zeilenElemente = [];

    zeilen.forEach(function (text) {
      const zeile = macheElement("tspan", {});
      zeile.textContent = text;
      beschriftung.appendChild(zeile);
      zeilenElemente.push(zeile);
    });

    // Die Schriftgroesse steht im CSS (dieselbe wie beim Vereinsnamen).
    // Von hier kommt der Zeilenabstand, deshalb wird sie ausgelesen.
    schriftHoehe = parseFloat(getComputedStyle(beschriftung).fontSize);
    textBreite = 0;
  }

  waehleKloster();

  // Wuerfelt eine neue Variante. Der aktuelle Stand wird zum Startpunkt,
  // damit auch mitten in einer Bewegung nichts springt.
  function wuerfleNeu(zeit) {
    vonPunkte = punkte;
    form = wuerfleForm();
    startZeit = zeit;
    waehleKloster();
  }

  // Alle PAUSE Millisekunden wuerfelt das Visual von allein weiter.
  // Nach einem Klick beginnt die Pause von vorn.
  let uhr = null;

  function starteUhr() {
    if (RUHIG) return;
    clearInterval(uhr);
    uhr = setInterval(function () {
      wuerfleNeu(performance.now());
    }, PAUSE);
  }

  svg.addEventListener("click", function () {
    wuerfleNeu(performance.now());
    starteUhr();
  });

  starteUhr();

  // Wird rund 60 Mal pro Sekunde aufgerufen
  function animiere(zeit) {
    const flaeche = svg.getBoundingClientRect();
    const breite = flaeche.width;
    const hoehe = flaeche.height;

    // Ohne Flaeche gibt es nichts zu zeichnen (z. B. verstecktes Element)
    if (breite > 0 && hoehe > 0) {
      // Das Raster des SVG entspricht genau den Pixeln der Flaeche.
      // Dadurch fuellt der Garten seinen Platz immer ganz aus.
      svg.setAttribute("viewBox", "0 0 " + breite + " " + hoehe);

      // Ziel ausrechnen und, falls eine Verwandlung laeuft, dorthin mischen
      const ziel = berechnePunkte(form, breite, hoehe);
      const anteil = RUHIG ? 1 : (zeit - startZeit) / DAUER;

      if (vonPunkte && anteil < 1) {
        punkte = mische(vonPunkte, ziel, bremse(anteil));
      } else {
        punkte = ziel;
        vonPunkte = null;
      }

      // Maus weich nachziehen
      folgtX += (mausX - folgtX) * TRAEGHEIT;
      folgtY += (mausY - folgtY) * TRAEGHEIT;

      zeichne(breite, hoehe);
    }

    requestAnimationFrame(animiere);
  }

  // Schreibt die aktuellen Werte in die vier SVG-Teile
  function zeichne(breite, hoehe) {
    const faktor = breite / REFERENZ;

    // Anteile zurueck in Pixel rechnen
    let weg = "";
    for (let i = 0; i < 8; i += 2) {
      weg +=
        (i === 0 ? "M " : " L ") +
        punkte[i] * breite +
        " " +
        punkte[i + 1] * hoehe;
    }
    weg += " Z";

    // Die Kreismitte wandert ein Stueck in Richtung Maus. Beide Achsen
    // rechnen mit der Breite, sonst wuerde die Bewegung oval.
    const versatz = RUHIG ? 0 : breite * FOLGE;
    const mitteX = punkte[8] * breite + folgtX * versatz;
    const mitteY = punkte[9] * hoehe + folgtY * versatz;

    // Doppelte Dicke, davon wird die aeussere Haelfte weggeschnitten.
    mauerWeg.setAttribute("d", weg);
    mauerWeg.setAttribute("stroke-width", 2 * STRICH * faktor);
    schnittForm.setAttribute("d", weg);

    // Die Balken ragen ueber den Bildrand hinaus. Wuerden sie genau dort
    // enden wo die Mauer endet, blieben in den halb gedeckten Randpixeln
    // Reste der Mauer stehen - eine haarfeine Kante im Eingang.
    const ueber = STRICH * faktor;

    balkenQuer.setAttribute("x1", -ueber);
    balkenQuer.setAttribute("y1", mitteY);
    balkenQuer.setAttribute("x2", breite + ueber);
    balkenQuer.setAttribute("y2", mitteY);
    balkenQuer.setAttribute("stroke-width", EINGANG * faktor);

    balkenHoch.setAttribute("x1", mitteX);
    balkenHoch.setAttribute("y1", -ueber);
    balkenHoch.setAttribute("x2", mitteX);
    balkenHoch.setAttribute("y2", hoehe + ueber);
    balkenHoch.setAttribute("stroke-width", EINGANG * faktor);

    kreis.setAttribute("cx", mitteX);
    kreis.setAttribute("cy", mitteY);
    kreis.setAttribute("r", RADIUS * faktor);
    kreis.setAttribute("stroke-width", STRICH * faktor);

    // ===== Die Beschriftung beim Kreis =====

    // Am liebsten steht sie seitlich auf der Hoehe der Kreismitte - genau
    // dort, wo der waagrechte Balken die Mauer zu einem Eingang oeffnet.
    // Dort liegt nie ein Mauerstueck hinter der Schrift.

    // Einmal messen, danach steht die Breite fest. Solange das SVG noch
    // keine Flaeche hat, kommt 0 zurueck und es wird im naechsten Bild
    // erneut versucht.
    if (textBreite === 0) textBreite = beschriftung.getBBox().width;

    const radius = RADIUS * faktor;
    const luecke = LUECKE * faktor;
    const zeilenAbstand = schriftHoehe * ZEILE;
    const anzahl = zeilenElemente.length;

    // Die Mauer waechst nach innen. Um diese Dicke bleibt die Schrift vom
    // Rand weg, sonst saesse sie bei langen Namen auf der gruenen Linie.
    const wand = STRICH * faktor;

    // Der Platz zwischen Kreis und Mauer, auf allen vier Seiten
    const platzRechts = breite - wand - (mitteX + radius + luecke);
    const platzLinks = mitteX - radius - luecke - wand;
    const platzUnten = hoehe - wand - (mitteY + radius + luecke);
    const platzOben = mitteY - radius - luecke - wand;

    let anker;
    let textX;
    let textY;

    if (Math.max(platzLinks, platzRechts) >= textBreite) {
      // Genug Platz daneben: der Block steht mittig zur Kreismitte. Das
      // 0.35-fache der Schriftgroesse hebt die erste Grundlinie so an, dass
      // er optisch mittig sitzt und nicht zu tief haengt.
      if (platzRechts >= platzLinks) {
        anker = "start";
        textX = mitteX + radius + luecke;
      } else {
        anker = "end";
        textX = mitteX - radius - luecke;
      }
      textY = mitteY - ((anzahl - 1) * zeilenAbstand) / 2 + schriftHoehe * 0.35;
    } else {
      // Zu schmal daneben - dann ueber oder unter den Kreis. Dort steht die
      // ganze Bildbreite zur Verfuegung. Ohne diesen Ausweg wuerde der Text
      // beim Klemmen in den Rand auf dem Kreis landen.
      anker = "middle";
      textX = mitteX;

      if (platzUnten >= platzOben) {
        textY = mitteY + radius + luecke + schriftHoehe;
      } else {
        textY = mitteY - radius - luecke - (anzahl - 1) * zeilenAbstand;
      }
    }

    // Zum Schluss in den Bildrand klemmen: die linke Kante darf hoechstens
    // so weit rechts liegen, dass rechts noch alles hineinpasst - und nie
    // weiter links als die Mauer. Die zweite Regel gewinnt. Ein Text, der
    // breiter ist als das Bild, beginnt dadurch am linken Rand und laeuft
    // rechts hinaus: Nummer und Namensanfang bleiben so immer lesbar.
    let linkeKante = textX;
    if (anker === "end") linkeKante = textX - textBreite;
    if (anker === "middle") linkeKante = textX - textBreite / 2;

    let zielLinks = Math.min(linkeKante, breite - wand - textBreite);
    if (zielLinks < wand) zielLinks = wand;
    textX += zielLinks - linkeKante;

    // Dasselbe von oben und unten. Die Oberkante der Schrift liegt rund
    // 0.8 Schriftgroessen ueber der Grundlinie, die Unterkante 0.25 darunter.
    const obenKante = textY - schriftHoehe * 0.8;
    const blockHoehe = (anzahl - 1) * zeilenAbstand + schriftHoehe * 1.05;

    let zielOben = Math.min(obenKante, hoehe - wand - blockHoehe);
    if (zielOben < wand) zielOben = wand;
    textY += zielOben - obenKante;

    beschriftung.setAttribute("text-anchor", anker);

    zeilenElemente.forEach(function (zeile, i) {
      zeile.setAttribute("x", textX);
      zeile.setAttribute("y", textY + i * zeilenAbstand);
    });
  }

  requestAnimationFrame(animiere);
}

/* ===== Start ===== */

// Jedes <svg class="keyvisual"> auf der Seite bekommt seine eigene Variante.
const visuals = document.querySelectorAll(".keyvisual");

visuals.forEach(function (svg) {
  starteKeyvisual(svg);
});
