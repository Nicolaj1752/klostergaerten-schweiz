import {defineField, defineType} from 'sanity'

// Eine Unterseite: wissen, projekte, über uns oder kontakt.
// Der Aufbau ist bei allen gleich: Titel oben, darunter Textabschnitte.
export const unterseite = defineType({
  name: 'unterseite',
  title: 'Unterseite',
  type: 'document',

  fields: [
    defineField({
      name: 'seite',
      title: 'Welche Seite?',
      type: 'string',
      description: 'Bestimmt, auf welcher Seite dieser Inhalt erscheint. Nicht ändern.',
      options: {
        list: [
          {title: 'wissen', value: 'wissen'},
          {title: 'projekte', value: 'projekte'},
          {title: 'über uns', value: 'ueber-uns'},
          {title: 'kontakt', value: 'kontakt'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'titel',
      title: 'Titel der Seite',
      type: 'string',
      description: 'Erscheint gross oben auf der Seite.',
      validation: (Rule) => Rule.required(),
    }),

    // ----- Linke Spalte -----
    defineField({
      name: 'spalteLinks',
      title: 'Linke Spalte',
      type: 'array',
      description: 'Die Abschnitte der linken Spalte.',
      of: [{type: 'abschnitt'}],
    }),

    // ----- Rechte Spalte -----
    defineField({
      name: 'spalteRechts',
      title: 'Rechte Spalte',
      type: 'array',
      description: 'Die Abschnitte der rechten Spalte. Kann leer bleiben.',
      of: [{type: 'abschnitt'}],
    }),

    // ----- Kontaktangaben, nur fuer die Kontaktseite -----
    defineField({
      name: 'anschrift',
      title: 'Anschrift',
      type: 'text',
      rows: 4,
      description: 'Nur für die Kontaktseite. Jede Zeile wird einzeln angezeigt.',
      hidden: ({parent}) => parent?.seite !== 'kontakt',
    }),
    defineField({
      name: 'email',
      title: 'E-Mail-Adresse',
      type: 'string',
      description: 'Nur für die Kontaktseite.',
      hidden: ({parent}) => parent?.seite !== 'kontakt',
    }),
  ],

  preview: {
    select: {title: 'titel', seite: 'seite'},
    prepare({title, seite}) {
      return {title: title || 'Ohne Titel', subtitle: seite}
    },
  },
})
