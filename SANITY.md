# Sanity CMS – Einrichtung

Alle Texte und alle Bilder der Website kommen aus Sanity. Der Kunde
bearbeitet sie im Studio, die Website holt sie bei jedem Aufruf ab.

Projekt: `ag1064vs` · Dataset: `production` (public)

## Wie es zusammenhängt

```
studio/schemaTypes/   – welche Felder es gibt (das Studio-Formular)
studio/struktur.ts    – die Liste links im Studio
js/inhalt.js          – holt die Inhalte und setzt sie in die Seite
*.html                – die Zuordnung, im Attribut data-...
```

Jede Seite trägt ihre Kennung im `<body data-seite="…">`. Dieselbe Kennung
ist die ID des Dokuments im Studio:

| Seite | Kennung / Dokument-ID |
|---|---|
| index.html | `seite-start` |
| wissen.html | `seite-wissen` |
| mitgliedschaft.html | `seite-mitgliedschaft` |
| kontakt.html | `seite-kontakt` |
| ueber-uns.html | `seite-ueber-uns` |
| alle (Kopf- und Fusszeile) | `allgemein` |

## Wie ein Feld auf die Seite kommt

Im HTML trägt jedes Element, das aus dem Studio kommt, ein Attribut mit dem
**Feldnamen**:

```html
<p class="marke" data-inhalt="visionMarke">Vision</p>
<img data-bild="schauBild" src="assets/bilder/garten-gross.jpg" alt="…" />
<a data-ziel="aufrufKnopfZiel" href="mitgliedschaft.html">…</a>
<p data-textlink="anmeldungFliesstext">…</p>
```

| Attribut | was es setzt |
|---|---|
| `data-inhalt` | den Text (Zeilenumbrüche werden zu `<br>`) |
| `data-bild` | Bilddatei und Bildbeschreibung |
| `data-ziel` | die Adresse eines Links |
| `data-textlink` | einen Absatz mit Link mitten im Satz |

Listen – Menü, Bilderraster, Wissensfelder, Personen, Vorteile, Beiträge,
das Auswahlfeld im Formular – baut `js/inhalt.js` mit je einer eigenen
Funktion auf. Sie erkennen ihren Platz an der CSS-Klasse (`.bilder-raster`,
`.felder`, …).

**Ein neues Feld einbauen** heisst deshalb immer drei Schritte:

1. Feld in `studio/schemaTypes/seiteXY.ts` anlegen
2. im HTML das passende `data-…="feldname"` setzen
3. Inhalt im Studio eintragen und auf **Publish** klicken

## Der Text im HTML bleibt stehen

Die Texte stehen weiterhin im HTML. Sie sind die Rückfallebene: Wenn Sanity
nicht erreichbar ist, kein Netz da ist oder die Seite per Doppelklick
geöffnet wird, sieht der Besucher trotzdem die vollständige Seite.

Deshalb: **Bei einer Textänderung im Studio den Text im HTML mitziehen**,
sonst laufen beide auseinander.

## Was der Kunde bearbeiten kann

Im Studio stehen links sechs Einträge – die fünf Seiten und die Kopf- und
Fusszeile. Neue Dokumente lassen sich nicht anlegen, es gibt von jedem
genau eines.

Innerhalb einer Seite sind die Felder nach Abschnitten gruppiert und
durchnummeriert, in derselben Reihenfolge wie auf der Website:
„1 – Titelbild“, „2 – Was wir machen“, und so weiter.

Bilder dürfen gross hochgeladen werden. Die Website fragt sie mit
höchstens 1600 Pixel Breite ab, Sanity verkleinert sie unterwegs.

## Wichtig: Änderungen erscheinen erst nach „Publish“

Im Studio gibt es *Draft* und *Published*. Die Website zeigt nur
veröffentlichte Texte.

## Studio starten und veröffentlichen

```bash
cd studio
npm install
npm run dev      # http://localhost:3333
npm run deploy   # https://klostergaerten.sanity.studio
```

## Einstellungen im Sanity-Konto

Beides ist bereits eingerichtet, hier nur zum Nachschlagen:

- **CORS origins** (sanity.io/manage → API → CORS origins), ohne
  „Allow credentials“:
  `https://xn--klostergrten-ncb.ch`, `https://www.xn--klostergrten-ncb.ch`,
  `https://nicolaj1752.github.io`, `http://localhost:8899`
  (die Punycode-Schreibweise ist `klostergärten.ch`, so wie der Browser
  die Domain verschickt)
- **Dataset `production` steht auf public.** Grund: Die Website ist reines
  HTML/JavaScript ohne Server. Ein geheimer Zugangsschlüssel wäre im
  Quelltext für jeden lesbar – deshalb darf es keinen geben. Öffentlich
  heisst: veröffentlichte Inhalte sind lesbar, wie bei jeder Website.
  Schreiben kann weiterhin nur, wer im Studio angemeldet ist.

Die Projekt-ID steht an **zwei** Stellen und muss überall gleich sein:
`studio/sanity.config.ts` → `export const projectId` und
`js/inhalt.js` → `const PROJEKT_ID`.

## Was noch nicht aus Sanity kommt

- Die Meldungen des Anmeldeformulars nach dem Absenden („Vielen Dank für
  Ihre Anmeldung“, die Fehlermeldung, „Zur Zahlung“). Sie stehen in
  `js/anmeldung.js`. Es sind Rückmeldungen auf eine Aktion, keine Seiteninhalte.
- `praesentation.html` – die interne Präsentation, die mit der Taste **P**
  aufgeht. Sie hat eigene Texte und Bilder in `js/praesentation.js`.
- Die Klosterliste in `js/kloester.js`, die im Keyvisual durchläuft.

## Altbestand im Dataset

Aus dem alten Design liegen noch fünf Dokumente im Dataset
(`startseite`, `unterseite-wissen`, `unterseite-projekte`,
`unterseite-ueber-uns`, `unterseite-kontakt`). Ihre Typen gibt es im Schema
nicht mehr, deshalb sind sie im Studio nicht sichtbar. Sie stören nicht und
können gelöscht werden, sobald sicher ist, dass nichts daraus noch gebraucht
wird.

## Falls die Inhalte nicht erscheinen

Die Ursache steht in der Browser-Konsole (F12):

- `Failed to fetch` → CORS fehlt für diese Adresse
- `Status 401` → Dataset ist nicht mehr public
- `Kein Dokument für … gefunden` → falsche Kennung im `<body data-seite>`
  oder im Studio nicht auf Publish geklickt
