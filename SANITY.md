# Sanity CMS – Einrichtung

Die Texte der Startseite kommen aus Sanity. Der Kunde bearbeitet sie im
Studio, die Website holt sie beim Laden ab.

## Was noch zu tun ist

### 1. Zugriff auf das Projekt `ag1064vs`

Der Account `nicolasbirrer@gmail.com` hat aktuell **keinen Zugriff** auf dieses
Projekt (`sanity projects list` zeigt es nicht, die API antwortet mit 401).

Entweder:

- Der Projekt-Besitzer lädt dich ein: sanity.io/manage → Projekt → Members → Invite
- Oder du legst ein eigenes Projekt an und trägst dessen ID ein (siehe Punkt 4)

### 2. Studio installieren und starten

```bash
cd studio
npm install
npm run dev
```

Das Studio läuft dann auf http://localhost:3333

### 3. CORS freischalten (wichtig!)

Ohne diesen Schritt kann die Website die Texte nicht laden – der Browser
blockiert die Anfrage. Unter sanity.io/manage → Projekt → **API** → **CORS origins**
diese beiden Adressen eintragen (ohne "Allow credentials"):

```
https://nicolaj1752.github.io
http://localhost:8899
```

Die zweite nur, wenn du lokal mit `python3 -m http.server 8899` testest.

### 4. Dataset öffentlich stellen

Unter sanity.io/manage → Projekt → **API** → **Datasets** muss `production`
auf **public** stehen. Grund: Die Website ist reines HTML/JavaScript ohne
Server. Ein geheimer Zugangsschlüssel wäre im Quelltext für jeden lesbar –
deshalb darf es keinen geben.

Öffentlich heisst: veröffentlichte Texte sind lesbar, wie bei jeder Website.
Schreiben kann weiterhin nur, wer im Studio angemeldet ist.

### 5. Projekt-ID ändern (nur falls nötig)

Die ID steht an **zwei** Stellen und muss überall gleich sein:

- `studio/sanity.config.ts` → `export const projectId`
- `inhalte.js` → `const PROJEKT_ID`

### 6. Studio veröffentlichen

```bash
cd studio
npm run deploy
```

Danach erreichbar unter https://klostergaerten.sanity.studio
Der Kunde meldet sich dort mit seiner E-Mail an.

## Was der Kunde bearbeiten kann

| Feld | Wo es erscheint |
|---|---|
| Grosser Titel im Foto | Der pinke Titel unten im Gartenfoto |
| Menüpunkte | Die Punkte auf der pinken Blume oben rechts |
| Linke Textspalte | Überschrift + beliebig viele Absätze |
| Rechte Textspalte | Überschrift + beliebig viele Absätze |
| Kontakt-Link | Der kursive Link unter der linken Spalte |

Absätze können hinzugefügt, gelöscht und umsortiert werden.

## Free Plan – was zu beachten ist

Der Free Plan reicht für dieses Projekt vollständig aus:

- 3 Benutzer, 2 Datasets, 10 GB Bandbreite pro Monat
- Studio-Hosting auf `*.sanity.studio` ist enthalten
- **Kein** Webhook-Deploy: Nach einer Textänderung wird die Website nicht
  automatisch neu gebaut. Das ist hier egal, weil die Texte bei jedem
  Seitenaufruf frisch geholt werden.

## Wichtig: Änderungen erscheinen erst nach "Publish"

Im Studio gibt es *Draft* und *Published*. Die Website zeigt nur
veröffentlichte Texte. Der Kunde muss nach dem Bearbeiten auf **Publish**
klicken.

## Falls die Texte nicht erscheinen

Die Website ist so gebaut, dass sie bei einem Fehler die Texte aus
`index.html` stehen lässt – der Besucher sieht nie eine leere Seite.
Die Ursache steht dann in der Browser-Konsole (F12):

- `Failed to fetch` → CORS fehlt (Punkt 3)
- `Status 401` → Dataset ist nicht public (Punkt 4)
- `Kein Startseiten-Dokument gefunden` → im Studio noch nichts angelegt
  oder nicht auf Publish geklickt
