# Klostergärten – Archiv-Website

Eine einfache Website, die ein Archiv von Klostergärten zeigt.

## Projektziel

Besucher sollen Klostergärten durchstöbern und einzelne Einträge (Bild, Ort,
Beschreibung) ansehen können. Kein Login, keine Datenbank, kein Backend.

## Code-Konventionen

**Wichtigste Regel: anfängerfreundlicher Code.**

- Reines HTML, CSS und JavaScript (Vanilla). Keine Frameworks, kein Build-Schritt,
  keine npm-Pakete. Die Seite muss sich durch Doppelklick auf `index.html` öffnen lassen.
- Sprache der Website: Deutsch.
- Einfache Konstrukte bevorzugen:
  - `let` / `const` statt komplexer Muster
  - klassische `for`-Schleifen oder `forEach` statt verketteter `map/filter/reduce`
  - `document.querySelector` und `addEventListener` – keine cleveren Abkürzungen
  - keine Klassen, keine Module, keine async/await-Ketten, wenn es einfacher geht
- **Kurze Kommentare** über jedem Abschnitt und über kniffligen Zeilen.
  Ein Satz reicht. Kommentare erklären das *Warum*, nicht die Syntax.
- Sprechende Namen auf Deutsch oder Englisch, aber konsistent innerhalb einer Datei.
- CSS: einfache Klassennamen (`.garten-karte`), keine Verschachtelungs-Tricks,
  keine CSS-Frameworks. Flexbox/Grid sind ok.
- Lieber etwas mehr Code, der offensichtlich ist, als wenig Code, der clever ist.

## Dateistruktur

```
index.html      – Startseite mit Übersicht aller Gärten
style.css       – gesamtes Styling
script.js       – Anzeige-Logik (Liste rendern, Suche)
daten.js        – die Garten-Daten als einfaches Array
bilder/         – Fotos der Gärten
```

## Daten

Die Gärten stehen in `daten.js` als Array von Objekten. Ein Eintrag sieht so aus:

```js
{
  id: 1,
  name: "Kräutergarten St. Gallen",
  ort: "St. Gallen",
  jahr: 1750,
  beschreibung: "Kurzer Text zum Garten.",
  bild: "bilder/stgallen.jpg"
}
```

Neue Gärten werden einfach an dieses Array angehängt – keine weiteren Schritte nötig.
