import {defineField, defineType} from 'sanity'

// Ein Kasten mit Titel und Text. Zweimal gebraucht: fuer die vier
// Wissensfelder auf der Wissen-Seite und fuer die drei Personen im
// Projektteam auf "Über uns".
export const feld = defineType({
  name: 'feld',
  title: 'Feld',
  type: 'object',

  fields: [
    defineField({
      name: 'titel',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {title: 'titel', text: 'text'},
    prepare({title, text}) {
      return {
        title: title || 'Ohne Titel',
        subtitle: text ? text.slice(0, 60) + '…' : '',
      }
    },
  },
})
