import {defineField, defineType} from 'sanity'

// Was auf jeder Seite gleich ist: die Kopfzeile ganz oben und die
// Fusszeile ganz unten. Es gibt genau ein Dokument dieses Typs.
//
// Eine Aenderung hier wirkt sich auf alle fuenf Seiten aus.
export const allgemein = defineType({
  name: 'allgemein',
  title: 'Kopf- und Fusszeile',
  type: 'document',

  fieldsets: [
    {name: 'kopf', title: 'Kopfzeile', options: {collapsible: true}},
    {name: 'fuss', title: 'Fusszeile', options: {collapsible: true}},
  ],

  fields: [
    // ----- Kopfzeile -----
    defineField({
      name: 'vereinsname',
      title: 'Vereinsname oben links',
      type: 'string',
      fieldset: 'kopf',
      description: 'Führt auf allen Unterseiten zurück zur Startseite.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'menue',
      title: 'Menü oben rechts',
      type: 'array',
      fieldset: 'kopf',
      of: [{type: 'menuepunkt'}],
      validation: (Rule) =>
        Rule.max(6).warning('Mehr als sechs Punkte passen auf schmalen Bildschirmen kaum nebeneinander.'),
    }),

    // ----- Fusszeile -----
    defineField({
      name: 'fussMenue',
      title: 'Menü in der Fusszeile',
      type: 'array',
      fieldset: 'fuss',
      of: [{type: 'menuepunkt'}],
    }),

    defineField({
      name: 'fussProjekt',
      title: 'Zeile "Projekt von"',
      type: 'text',
      rows: 2,
      fieldset: 'fuss',
    }),

    defineField({
      name: 'fussGestaltung',
      title: 'Zeile "Konzept und Design"',
      type: 'string',
      fieldset: 'fuss',
    }),

    defineField({
      name: 'fussRecht',
      title: 'Copyright-Zeile zuunterst',
      type: 'string',
      fieldset: 'fuss',
    }),
  ],

  preview: {
    prepare() {
      return {title: 'Kopf- und Fusszeile', subtitle: 'Gilt für alle Seiten'}
    },
  },
})
