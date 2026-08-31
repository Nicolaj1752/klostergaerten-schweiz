import {defineField, defineType} from 'sanity'

// Eine Zeile in der Liste der Mitgliederbeitraege: links die Art der
// Mitgliedschaft, rechts der Betrag.
export const beitrag = defineType({
  name: 'beitrag',
  title: 'Beitrag',
  type: 'object',

  fields: [
    defineField({
      name: 'bezeichnung',
      title: 'Art der Mitgliedschaft',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'betrag',
      title: 'Betrag',
      type: 'string',
      description: 'Zum Beispiel "CHF 45.– pro Jahr".',
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {title: 'bezeichnung', subtitle: 'betrag'},
  },
})
