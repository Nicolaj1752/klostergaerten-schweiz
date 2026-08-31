// Das Burger-Menue und die mitfahrende Kopfzeile.
//
// Der Knopf mit den drei Balken klappt das Menue auf und zu. Auf breiten
// Schirmen ist er ausgeblendet (siehe css/style.css), dort stehen die
// Knoepfe wie bisher nebeneinander.
//
// Die Kopfzeile faehrt beim Runterscrollen weg und beim Hochscrollen
// wieder ein - auf allen Bildschirmgroessen.
//
// Beides schaltet ueber je eine Klasse am <body>: "menue-offen" und
// "kopf-weg". So muss das Skript nichts ueber das Aussehen wissen -
// das steht alles im CSS.

const burger = document.querySelector("#burger");
const hauptmenue = document.querySelector("#hauptmenue");

// Ohne Knopf auf der Seite ist hier nichts zu tun
if (burger) {
  // Oeffnet oder schliesst das Menue
  function schalte(offen) {
    document.body.classList.toggle("menue-offen", offen);

    // aria-expanded sagt Screenreadern, ob das Menue offen ist.
    // aria-label aendert sich mit, damit der Knopf richtig angesagt wird.
    burger.setAttribute("aria-expanded", offen ? "true" : "false");
    burger.setAttribute("aria-label", offen ? "Menü schliessen" : "Menü öffnen");
  }

  burger.addEventListener("click", function () {
    const offen = document.body.classList.contains("menue-offen");
    schalte(!offen);
  });

  // Nach einem Klick auf einen Menuepunkt schliesst sich das Menue.
  // Ohne das bliebe es beim Sprung zu einem Anker auf derselben Seite offen.
  //
  // Der Zuhoerer sitzt am Menue selbst, nicht an den einzelnen Links:
  // inhalt.js baut die Punkte spaeter aus den Studio-Texten neu auf, und
  // dabei gingen Zuhoerer an den alten Links verloren.
  hauptmenue.addEventListener("click", function (ereignis) {
    if (ereignis.target.closest("a")) schalte(false);
  });

  // Mit Escape schliessen
  document.addEventListener("keydown", function (ereignis) {
    if (ereignis.key === "Escape") schalte(false);
  });

  // Ein Klick irgendwo sonst auf der Seite schliesst das Menue ebenfalls.
  // Klicks im Menue selbst und auf den Knopf sind ausgenommen: der Knopf
  // schaltet schon oben um, sonst wuerde er hier gleich wieder zugehen.
  document.addEventListener("click", function (ereignis) {
    if (!document.body.classList.contains("menue-offen")) return;

    const imMenue = hauptmenue.contains(ereignis.target);
    const aufKnopf = burger.contains(ereignis.target);

    if (!imMenue && !aufKnopf) schalte(false);
  });

  // Wird das Fenster breit genug, verschwindet der Knopf. Ein offenes
  // Menue muss dann zurueckgesetzt werden, sonst bleibt die Klasse am
  // body haengen und stoert die breite Ansicht.
  const breit = window.matchMedia("(min-width: 701px)");

  // Nur das Menue wird geschlossen. "kopf-weg" bleibt, wie es ist: die
  // Kopfzeile faehrt auch auf breiten Schirmen mit dem Scrollen weg.
  breit.addEventListener("change", function (ereignis) {
    if (ereignis.matches) schalte(false);
  });

  /* ===== Kopfzeile beim Scrollen ===== */

  // Beim Runterscrollen faehrt die Kopfzeile weg, beim Hochscrollen kommt
  // sie zurueck. Das Aussehen steht im CSS, hier wird nur die Klasse
  // "kopf-weg" am body gesetzt.

  const SCHWELLE = 8; // kleinere Bewegungen ignorieren, sonst zittert es
  const FREI = 90; // so weit oben bleibt die Kopfzeile immer sichtbar

  let letzterStand = window.scrollY;

  window.addEventListener(
    "scroll",
    function () {
      const stand = window.scrollY;
      const weg = stand - letzterStand;

      // Ganz oben ist die Kopfzeile immer da
      if (stand < FREI) {
        document.body.classList.remove("kopf-weg");
        letzterStand = stand;
        return;
      }

      // Kleine Bewegungen und das Federn am Seitenende ueberspringen
      if (Math.abs(weg) < SCHWELLE) return;

      if (weg > 0) {
        // nach unten: wegfahren. Ein offenes Menue geht mit zu, sonst
        // schwebte es ohne seine Kopfzeile weiter.
        document.body.classList.add("kopf-weg");
        schalte(false);
      } else {
        document.body.classList.remove("kopf-weg");
      }

      letzterStand = stand;
    },
    { passive: true }, // sagt dem Browser: das Scrollen wird nicht blockiert
  );
}
