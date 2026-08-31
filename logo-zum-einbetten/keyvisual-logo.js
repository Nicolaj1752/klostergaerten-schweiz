// Das generative Logo zum Mitnehmen.
//
// Dieselbe Zeichnung wie auf klostergaerten.ch, aber fuer eine fremde
// Seite zurechtgeschnitten: ohne Klosternamen, ohne Maus, ohne die
// Schalter der Website. Alle 2 Sekunden entsteht eine neue Variante, ein
// Klick wuerfelt sofort weiter.
//
// Die Regeln der Zeichnung sind unveraendert:
//
// 1. Vier Balken bilden die Mauer. Eine Ecke wird nach innen versetzt,
//    dadurch steht genau eine Seite schief (5 bis 15 Grad).
// 2. Der Kreis ist die Mitte des Gartens und sitzt jedes Mal woanders.
// 3. Durch die Kreismitte laufen zwei Balken in Hintergrundfarbe. Wo sie
//    die Mauer kreuzen, schneiden sie vier Eingaenge heraus. Weil beide
//    durch den Kreis gehen, zeigen alle vier zur Mitte.
//
// EINBAU
//
//   <svg class="logo-visual"></svg>
//   <script src="keyvisual-logo.js"></script>
//
// Das SVG braucht eine Groesse aus dem CSS, sonst gibt es nichts zu
// zeichnen. Die Zeichnung misst ihre Flaeche und fuellt sie ganz aus.
//
// FARBEN
//
// Die Mauer und der Kreis nehmen die Schriftfarbe ihrer Umgebung
// (currentColor). Die beiden Balken muessen die Farbe des HINTERGRUNDS
// haben - die kann das Skript nicht erraten, sie kommt aus einer
// CSS-Variablen:
//
//   .logo-visual { color: #082302; --logo-grund: #FDFFEA; }
//
// Ohne die Variable gilt der Wert in GRUND weiter unten.
//
// SEITEN, DIE IHR DOM SPAETER AUFBAUEN (React, Vue, Astro, Router)
//
// Das Skript startet von allein alles, was beim Laden schon da ist.
// Kommt das SVG erst spaeter, ruf es selbst auf:
//
//   starteLogo(document.querySelector("#mein-logo"));

(function () {
  "use strict";

  /* ===== Einstellungen ===== */

  // Bei dieser Breite gelten die Masse darunter genau in Pixeln. Ist die
  // Flaeche kleiner oder groesser, skaliert alles im selben Verhaeltnis.
  const REFERENZ = 1400;

  // Strichstaerke von Mauer und Kreis. Sie ist hier kraeftiger als beim
  // grossen Keyvisual der Website (dort 19.5): die Linien wandern mit der
  // Breite mit, im kleinen Logo waeren sie sonst fadenduenn.
  const STRICH = 56.4;

  const EINGANG = 105; // Breite der vier Eingaenge
  const RADIUS = 92; // Radius des Kreises
  const ABSTAND = 1.7; // Abstand des Kreises zur Mauer, in Radien

  const WINKEL_MIN = 5; // schiefe Seite: kleinster Winkel in Grad
  const WINKEL_MAX = 15; // und groesster

  // Fallback, falls die Seite keine CSS-Variable setzt
  const GRUND = "#FDFFEA";

  const DAUER = 700; // Millisekunden fuer die Verwandlung
  const PAUSE = 2000; // danach wird neu gewuerfelt

  // Wer im Betriebssystem weniger Bewegung eingestellt hat, bekommt eine
  // Variante und danach Ruhe.
  const RUHIG = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ===== Kleine Helfer ===== */

  function zufall(min, max) {
    return min + Math.random() * (max - min);
  }

  // Weiche Bremse: schnell los, sanft ankommen
  function bremse(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  // Setzt eine Position zwischen zwei Raendern. Ist zu wenig Platz da,
  // landet sie in der Mitte.
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

  // Fuer SVG braucht es createElementNS, mit createElement bleibt es leer.
  function macheElement(name, attribute) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", name);
    for (const schluessel in attribute) {
      el.setAttribute(schluessel, attribute[schluessel]);
    }
    return el;
  }

  /* ===== Eine Variante wuerfeln ===== */

  // Gewuerfelt werden nur die Entscheidungen, nicht die Koordinaten. So
  // laesst sich dieselbe Form in jeder Groesse neu ausrechnen.
  function wuerfleForm() {
    return {
      ecke: Math.floor(zufall(0, 4)), // welche Ecke wandert
      senkrecht: Math.random() < 0.5, // senkrecht oder waagrecht
      winkel: zufall(WINKEL_MIN, WINKEL_MAX),
      kreisX: Math.random(),
      kreisY: Math.random(),
    };
  }

  // Rechnet eine Form in vier Eckpunkte und die Kreismitte um. Heraus
  // kommen Anteile von 0 bis 1 - unabhaengig von der Groesse und dadurch
  // sauber ineinander mischbar.
  function berechnePunkte(form, breite, hoehe) {
    const faktor = breite / REFERENZ;
    const radius = RADIUS * faktor;

    // Das Viereck ist die AUSSENKANTE der Mauer und liegt auf dem Rand
    // der Flaeche. Die Mauer waechst von hier nach innen.
    const ecken = [
      [0, 0],
      [breite, 0],
      [breite, hoehe],
      [0, hoehe],
    ];

    // Gemessen wird der Winkel an der kurzen Seite, sonst wuerden 15 Grad
    // auf der langen Seite die Form sprengen.
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

    // Die versetzte Ecke zieht eine Wand schraeg nach innen. Auf genau
    // dieser Seite braucht der Kreis mehr Abstand, sonst schneidet die
    // Wand ihn an.
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

    const punkte = [];
    ecken.forEach(function (punkt) {
      punkte.push(punkt[0] / breite, punkt[1] / hoehe);
    });
    punkte.push(mitteX / breite, mitteY / hoehe);
    return punkte;
  }

  /* ===== Ein Logo zum Leben erwecken ===== */

  function starteLogo(svg) {
    // Die Teile werden einmal erstellt und danach nur noch mit neuen
    // Werten gefuettert. Reihenfolge: erst die Mauer, dann die Balken,
    // die die Eingaenge herausschneiden, zuletzt der Kreis.
    //
    // Die Mauer bekommt einen INNENLIEGENDEN Strich, so wie in Figma.
    // SVG kann das nicht direkt, deshalb der Umweg: der Pfad wird doppelt
    // so dick gezeichnet und auf die Flaeche des Vierecks beschnitten.
    // Uebrig bleibt genau die innere Haelfte. Ein mittiger Strich waere
    // falsch - an der schiefen Ecke ragt seine Gehrungsspitze ueber den
    // Bildrand und hinterlaesst dort ein gerades Stueck.
    const schnittId = "logo-" + Math.round(Math.random() * 1e9);

    const schnittForm = macheElement("path", {});
    const schnitt = macheElement("clipPath", { id: schnittId });
    schnitt.appendChild(schnittForm);
    svg.appendChild(schnitt);

    const mauerWeg = macheElement("path", {
      fill: "none",
      stroke: "currentColor",
      "clip-path": "url(#" + schnittId + ")",
    });

    const balkenQuer = macheElement("line", {});
    const balkenHoch = macheElement("line", {});
    const kreis = macheElement("circle", {
      fill: "none",
      stroke: "currentColor",
    });

    // Die Balken haben die Farbe des Hintergrunds. Als Stil gesetzt, nicht
    // als Attribut: nur so loest der Browser die CSS-Variable auf.
    balkenQuer.style.stroke = "var(--logo-grund, " + GRUND + ")";
    balkenHoch.style.stroke = "var(--logo-grund, " + GRUND + ")";

    svg.appendChild(mauerWeg);
    svg.appendChild(balkenQuer);
    svg.appendChild(balkenHoch);
    svg.appendChild(kreis);

    // Der Zustand dieses einen Logos
    let form = wuerfleForm(); // die Form, zu der hin verwandelt wird
    let punkte = []; // was gerade gezeichnet wird
    let vonPunkte = null; // Stand beim letzten Wurf
    let startZeit = 0;

    let breite = 0;
    let hoehe = 0;

    // Laeuft gerade eine Verwandlung? Nur dann wird gezeichnet - in der
    // Ruhezeit zwischen zwei Wuerfen kostet das Logo nichts.
    let laeuft = false;

    // Schreibt die aktuellen Werte in die vier Teile
    function male() {
      const faktor = breite / REFERENZ;
      const strich = STRICH * faktor;

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

      const mitteX = punkte[8] * breite;
      const mitteY = punkte[9] * hoehe;

      // Doppelte Dicke, davon wird die aeussere Haelfte weggeschnitten
      mauerWeg.setAttribute("d", weg);
      mauerWeg.setAttribute("stroke-width", 2 * strich);
      schnittForm.setAttribute("d", weg);

      // Die Balken ragen ueber den Bildrand hinaus. Enden sie genau dort,
      // wo die Mauer endet, bleiben in den halb gedeckten Randpixeln
      // Reste stehen - eine haarfeine Kante mitten im Eingang.
      const ueber = strich;

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
      kreis.setAttribute("stroke-width", strich);
    }

    // Ein Bild. Laeuft noch eine Verwandlung, bestellt es das naechste.
    function bild(zeit) {
      if (breite <= 0 || hoehe <= 0) {
        laeuft = false;
        return;
      }

      // Das Raster des SVG entspricht genau den Pixeln der Flaeche.
      // Dadurch fuellt die Zeichnung ihren Platz immer ganz aus.
      svg.setAttribute("viewBox", "0 0 " + breite + " " + hoehe);

      const ziel = berechnePunkte(form, breite, hoehe);

      // Nie unter 0: faellt der Zeitstempel dieses Bildes vor den Moment
      // des Wurfs, rechnete die Mischung sonst ueber ihren Startpunkt
      // hinaus - die Mauer kippt dann kurz zu einem Dreieck zusammen.
      const anteil = RUHIG ? 1 : Math.max(0, (zeit - startZeit) / DAUER);

      if (vonPunkte && anteil < 1) {
        punkte = mische(vonPunkte, ziel, bremse(anteil));
      } else {
        punkte = ziel;
        vonPunkte = null;
      }

      male();

      if (vonPunkte) {
        requestAnimationFrame(bild);
      } else {
        laeuft = false;
      }
    }

    // Startet die Schleife, falls sie nicht schon laeuft
    function zeichne() {
      if (laeuft) return;
      laeuft = true;
      requestAnimationFrame(bild);
    }

    // Wuerfelt eine neue Variante. Der aktuelle Stand wird zum
    // Startpunkt, damit auch mitten in einer Bewegung nichts springt.
    function wuerfleNeu() {
      // Ohne vorherigen Stand gibt es nichts zu mischen - dann erscheint
      // die neue Form sofort.
      vonPunkte = punkte.length > 0 ? punkte : null;

      form = wuerfleForm();
      startZeit = performance.now();
      zeichne();
    }

    // Die Groesse kommt aus dem CSS. Statt sie in jedem Bild neu zu
    // messen - das erzwingt jedes Mal ein Layout - meldet sich der
    // Beobachter, wenn sie sich aendert. Er meldet sich auch gleich beim
    // Start und liefert damit das erste Bild.
    new ResizeObserver(function (eintraege) {
      const kasten = eintraege[0].contentRect;
      breite = kasten.width;
      hoehe = kasten.height;
      zeichne();
    }).observe(svg);

    // Die Uhr laeuft nur, solange das Logo im Bild ist. Ist es weg
    // gescrollt, wuerfelt es nicht weiter.
    let uhr = null;

    new IntersectionObserver(function (eintraege) {
      clearInterval(uhr);
      uhr = null;

      if (RUHIG) return;
      if (!eintraege[0].isIntersecting) return;

      uhr = setInterval(wuerfleNeu, PAUSE);
    }).observe(svg);

    // Ein Klick wuerfelt sofort weiter
    svg.addEventListener("click", wuerfleNeu);
  }

  /* ===== Start ===== */

  function starteAlle() {
    document.querySelectorAll(".logo-visual").forEach(function (svg) {
      starteLogo(svg);
    });
  }

  // Beim Laden alles nehmen, was schon da ist. Wird das Skript spaeter
  // nachgeladen, ist das Dokument laengst fertig - dann sofort.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", starteAlle);
  } else {
    starteAlle();
  }

  // Fuer Seiten, die ihr DOM erst spaeter aufbauen
  window.starteLogo = starteLogo;
})();
