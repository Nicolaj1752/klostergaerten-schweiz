import {defineField, defineType} from 'sanity'

// Ein Textabschnitt auf einer Unterseite.
// Der Zwischentitel ist freiwillig: ohne ihn ist es ein normaler Absatz.
export const abschnitt = defineType({
  name: 'abschnitt',
  title: 'Abschnitt',
  type: 'object',

  fields: [
    defineField({
      name: 'zwischentitel',
      title: 'Zwischentitel',
      type: 'string',
      description: 'Freiwillig. Zum Beispiel "Klosterbotanik & Heilpflanzen".',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {title: 'zwischentitel', text: 'text'},
    prepare({title, text}) {
      return {
        title: title || 'Absatz ohne Titel',
        subtitle: text ? text.slice(0, 60) + '…' : '',
      }
    },
  },
})
