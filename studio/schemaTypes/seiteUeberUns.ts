import {defineField, defineType} from 'sanity'

// Alle Texte der Seite "Über uns" (ueber-uns-neu.html).
export const seiteUeberUns = defineType({
  name: 'seiteUeberUns',
  title: 'Über uns',
  type: 'document',

  fieldsets: [
    {name: 'verein', title: '1 – Der Verein', options: {collapsible: true}},
    {name: 'team', title: '2 – Projektteam', options: {collapsible: true}},
    {name: 'aufruf', title: '3 – Aufruf', options: {collapsible: true}},
  ],

  fields: [
    defineField({
      name: 'seitentitel',
      title: 'Titel im Browser-Tab',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // ----- 1 Der Verein -----
    defineField({
      name: 'vereinMarke',
      title: 'Kleine Überschrift',
      type: 'string',
      fieldset: 'verein',
    }),
    defineField({
      name: 'vereinAussage',
      title: 'Grosse Aussage',
      type: 'text',
      rows: 4,
      fieldset: 'verein',
    }),
    defineField({
      name: 'vereinFliesstext',
      title: 'Begleittext',
      type: 'text',
      rows: 6,
      fieldset: 'verein',
    }),

    // ----- 2 Projektteam -----
    defineField({
      name: 'teamMarke',
      title: 'Kleine Überschrift',
      type: 'string',
      fieldset: 'team',
    }),
    defineField({
      name: 'personen',
      title: 'Die Personen',
      type: 'array',
      of: [{type: 'feld'}],
      fieldset: 'team',
      description: 'Der Titel ist der Name, der Text die Kurzbiografie. Sie stehen nebeneinander.',
    }),

    // ----- 3 Aufruf -----
    defineField({
      name: 'aufrufText',
      title: 'Text',
      type: 'text',
      rows: 5,
      fieldset: 'aufruf',
      description: 'Jeder Zeilenumbruch hier wird auch auf der Website zu einem Umbruch.',
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
      description: 'Zum Beispiel mailto:info@klostergärten.ch?subject=Klostergärten Schweiz',
    }),
  ],

  preview: {
    prepare() {
      return {title: 'Über uns'}
    },
  },
})
