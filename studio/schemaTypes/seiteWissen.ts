import {defineField, defineType} from 'sanity'

// Alle Texte und Bilder der Wissen-Seite (wissen-neu.html).
// Aufbau wie bei der Startseite: flache Feldnamen, Gruppen nur fuer die
// Ansicht im Studio.
export const seiteWissen = defineType({
  name: 'seiteWissen',
  title: 'Wissen',
  type: 'document',

  fieldsets: [
    {name: 'einleitung', title: '1 – Einleitung', options: {collapsible: true}},
    {name: 'geschichte', title: '2 – Wissensgeschichte', options: {collapsible: true}},
    {name: 'bildAbschnitt', title: '3 – Bild', options: {collapsible: true}},
    {name: 'inventar', title: '4 – Klostergärten-Inventar', options: {collapsible: true}},
    {name: 'felderAbschnitt', title: '5 – Wissensfelder', options: {collapsible: true}},
  ],

  fields: [
    defineField({
      name: 'seitentitel',
      title: 'Titel im Browser-Tab',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // ----- 1 Einleitung -----
    defineField({
      name: 'einleitungAussage',
      title: 'Grosse Aussage',
      type: 'text',
      rows: 4,
      fieldset: 'einleitung',
    }),
    defineField({
      name: 'einleitungFliesstext',
      title: 'Begleittext',
      type: 'text',
      rows: 5,
      fieldset: 'einleitung',
    }),

    // ----- 2 Wissensgeschichte -----
    defineField({
      name: 'geschichteMarke',
      title: 'Kleine Überschrift',
      type: 'string',
      fieldset: 'geschichte',
    }),
    defineField({
      name: 'geschichteAussage',
      title: 'Grosse Aussage',
      type: 'text',
      rows: 4,
      fieldset: 'geschichte',
    }),
    defineField({
      name: 'geschichteFliesstext',
      title: 'Begleittext',
      type: 'text',
      rows: 6,
      fieldset: 'geschichte',
    }),

    // ----- 3 Bild -----
    defineField({
      name: 'bild',
      title: 'Bild zwischen den Abschnitten',
      type: 'bild',
      fieldset: 'bildAbschnitt',
      description: 'Läuft über die ganze Breite, wie das grosse Bild auf der Startseite.',
    }),

    // ----- 4 Inventar -----
    defineField({
      name: 'inventarMarke',
      title: 'Kleine Überschrift',
      type: 'string',
      fieldset: 'inventar',
    }),
    defineField({
      name: 'inventarAussage',
      title: 'Grosse Aussage',
      type: 'text',
      rows: 4,
      fieldset: 'inventar',
    }),
    defineField({
      name: 'inventarFliesstext',
      title: 'Begleittext',
      type: 'text',
      rows: 4,
      fieldset: 'inventar',
    }),

    // ----- 5 Wissensfelder -----
    defineField({
      name: 'felderMarke',
      title: 'Kleine Überschrift',
      type: 'string',
      fieldset: 'felderAbschnitt',
    }),
    defineField({
      name: 'felderEinleitung',
      title: 'Einleitender Text',
      type: 'text',
      rows: 6,
      fieldset: 'felderAbschnitt',
    }),
    defineField({
      name: 'felder',
      title: 'Die Wissensfelder',
      type: 'array',
      of: [{type: 'feld'}],
      fieldset: 'felderAbschnitt',
      description:
        'Bei genau vier Feldern stehen sie als Kreuz: eines oben, zwei in der Mitte, eines unten. Die Reihenfolge hier ist die Lesereihenfolge.',
    }),
  ],

  preview: {
    prepare() {
      return {title: 'Wissen'}
    },
  },
})
