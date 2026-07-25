import {defineField, defineType} from 'sanity'

// Eine Textspalte: Überschrift plus beliebig viele Absätze.
// Wird von der linken und der rechten Spalte benutzt.
export const textspalte = defineType({
  name: 'textspalte',
  title: 'Textspalte',
  type: 'object',

  fields: [
    defineField({
      name: 'ueberschrift',
      title: 'Überschrift',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'absaetze',
      title: 'Absätze',
      type: 'array',
      description: 'Jeder Eintrag wird zu einem eigenen Absatz auf der Website.',
      of: [{type: 'text', rows: 4}],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],

  preview: {
    select: {title: 'ueberschrift', absaetze: 'absaetze'},
    prepare({title, absaetze}) {
      const anzahl = absaetze ? absaetze.length : 0
      return {title: title || 'Ohne Überschrift', subtitle: anzahl + ' Absätze'}
    },
  },
})
