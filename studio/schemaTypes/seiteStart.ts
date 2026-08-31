import {defineField, defineType} from 'sanity'

// Alle Texte und Bilder der Startseite (index.html).
// Es gibt genau ein Dokument dieses Typs.
//
// Die Feldnamen sind mit Absicht flach - kein Feld steckt in einem
// anderen. Derselbe Name steht im HTML im Attribut data-inhalt, dadurch
// findet inhalt.js jedes Feld ohne Umweg. Die Gruppen unten sind nur
// fuer die Ansicht im Studio da und aendern die Namen nicht.
export const seiteStart = defineType({
  name: 'seiteStart',
  title: 'Startseite',
  type: 'document',

  fieldsets: [
    {name: 'hero', title: '1 – Titelbild', options: {collapsible: true}},
    {name: 'machen', title: '2 – Was wir machen', options: {collapsible: true}},
    {name: 'schau', title: '3 – Grosses Bild', options: {collapsible: true}},
    {name: 'vision', title: '4 – Vision', options: {collapsible: true}},
    {name: 'plattform', title: '5 – Plattform', options: {collapsible: true}},
    {name: 'eindruecke', title: '6 – Eindrücke', options: {collapsible: true}},
    {name: 'wandel', title: '7 – Wandel', options: {collapsible: true}},
    {name: 'aufruf', title: '8 – Aufruf', options: {collapsible: true}},
  ],

  fields: [
    // ----- Name im Browser-Tab -----
    defineField({
      name: 'seitentitel',
      title: 'Titel im Browser-Tab',
      type: 'string',
      description: 'Steht oben im Reiter des Browsers und in den Suchergebnissen.',
      validation: (Rule) => Rule.required(),
    }),

    // ----- 1 Titelbild -----
    defineField({
      name: 'titel',
      title: 'Grosser Titel',
      type: 'string',
      fieldset: 'hero',
      description:
        'Steht ganz gross unter der Zeichnung, auf einer Zeile. Kurz halten: die Schrift richtet sich nach der Fensterbreite, ein langer Titel wird dadurch klein.',
      validation: (Rule) => Rule.required().max(40),
    }),

    // ----- 2 Was wir machen -----
    defineField({
      name: 'machenMarke',
      title: 'Kleine Überschrift',
      type: 'string',
      fieldset: 'machen',
    }),
    defineField({
      name: 'machenAussage',
      title: 'Grosse Aussage',
      type: 'text',
      rows: 4,
      fieldset: 'machen',
    }),
    defineField({
      name: 'machenKnopfText',
      title: 'Beschriftung des Knopfs',
      type: 'string',
      fieldset: 'machen',
    }),
    defineField({
      name: 'machenKnopfZiel',
      title: 'Ziel des Knopfs',
      type: 'string',
      fieldset: 'machen',
      description: 'Der Dateiname der Seite, zum Beispiel mitgliedschaft-neu.html.',
    }),

    // ----- 3 Grosses Bild -----
    defineField({
      name: 'schauBild',
      title: 'Grosses Bild',
      type: 'bild',
      fieldset: 'schau',
    }),
    defineField({
      name: 'schauInfo',
      title: 'Angaben unter dem Bild',
      type: 'array',
      of: [{type: 'string'}],
      fieldset: 'schau',
      description: 'Jede Zeile einzeln, zum Beispiel "Kloster Dornach, SO".',
    }),
    defineField({
      name: 'schauText',
      title: 'Text rechts neben den Angaben',
      type: 'text',
      rows: 3,
      fieldset: 'schau',
    }),

    // ----- 4 Vision -----
    defineField({
      name: 'visionMarke',
      title: 'Kleine Überschrift',
      type: 'string',
      fieldset: 'vision',
    }),
    defineField({
      name: 'visionAussage',
      title: 'Grosse Aussage',
      type: 'text',
      rows: 4,
      fieldset: 'vision',
    }),
    defineField({
      name: 'visionFliesstext',
      title: 'Begleittext',
      type: 'text',
      rows: 8,
      fieldset: 'vision',
    }),

    // ----- 5 Plattform -----
    defineField({
      name: 'plattformMarke',
      title: 'Kleine Überschrift',
      type: 'string',
      fieldset: 'plattform',
    }),
    defineField({
      name: 'plattformAussage',
      title: 'Grosse Aussage',
      type: 'text',
      rows: 4,
      fieldset: 'plattform',
    }),
    defineField({
      name: 'plattformFliesstext',
      title: 'Begleittext',
      type: 'text',
      rows: 8,
      fieldset: 'plattform',
    }),

    // ----- 6 Eindruecke -----
    defineField({
      name: 'eindrueckeMarke',
      title: 'Kleine Überschrift',
      type: 'string',
      fieldset: 'eindruecke',
    }),
    defineField({
      name: 'eindrueckeBilder',
      title: 'Bilder',
      type: 'array',
      of: [{type: 'bild'}],
      fieldset: 'eindruecke',
      description:
        'Sie stehen in einem Raster nebeneinander. Am besten eine durch drei teilbare Anzahl, sonst bleibt in der letzten Reihe eine Lücke.',
    }),

    // ----- 7 Wandel -----
    defineField({
      name: 'wandelMarke',
      title: 'Kleine Überschrift',
      type: 'string',
      fieldset: 'wandel',
    }),
    defineField({
      name: 'wandelAussage',
      title: 'Grosse Aussage',
      type: 'text',
      rows: 4,
      fieldset: 'wandel',
    }),

    // ----- 8 Aufruf -----
    defineField({
      name: 'aufrufText',
      title: 'Text',
      type: 'text',
      rows: 6,
      fieldset: 'aufruf',
      description:
        'Jeder Zeilenumbruch hier wird auch auf der Website zu einem Umbruch. Die Zeilen sind bewusst von Hand gesetzt.',
    }),
    defineField({
      name: 'aufrufKnopfText',
      title: 'Beschriftung des Knopfs',
      type: 'string',
      fieldset: 'aufruf',
    }),
    defineField({
      name: 'aufrufKnopfZiel',
      title: 'Ziel des Knopfs',
      type: 'string',
      fieldset: 'aufruf',
    }),
  ],

  preview: {
    select: {title: 'titel'},
    prepare({title}) {
      return {title: 'Startseite', subtitle: title}
    },
  },
})
