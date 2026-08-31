import {defineField, defineType} from 'sanity'

// Ein Absatz, in dem mitten im Satz ein Link steht.
//
// Warum vier Felder statt eines Textfeldes: die Website setzt die Texte mit
// textContent ein, damit nichts Fremdes in die Seite geraten kann. Damit
// laesst sich kein Link mitten in einen Text schreiben. Deshalb wird der
// Absatz hier in seine drei Teile zerlegt - davor, der Link, danach.
//
// Wird nur der Teil "davor" ausgefuellt, erscheint ein ganz normaler Absatz
// ohne Link.
export const textMitLink = defineType({
  name: 'textMitLink',
  title: 'Text mit Link',
  type: 'object',

  fields: [
    defineField({
      name: 'davor',
      title: 'Text davor',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'linkText',
      title: 'Beschriftung des Links',
      type: 'string',
      description: 'Der Teil des Satzes, der anklickbar ist. Leer lassen für einen Absatz ohne Link.',
    }),

    defineField({
      name: 'linkZiel',
      title: 'Ziel des Links',
      type: 'string',
      description: 'Zum Beispiel mailto:info@klostergärten.ch oder https://…',
    }),

    defineField({
      name: 'danach',
      title: 'Text danach',
      type: 'text',
      rows: 4,
    }),
  ],

  preview: {
    select: {davor: 'davor', linkText: 'linkText'},
    prepare({davor, linkText}) {
      const anfang = davor || linkText || 'Leer'
      return {title: anfang.slice(0, 60) + '…'}
    },
  },
})
