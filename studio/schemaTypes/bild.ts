import {defineField, defineType} from 'sanity'

// Ein Foto mit seiner Bildbeschreibung.
//
// Die Beschreibung ist Pflicht: sie wird vorgelesen, wenn jemand die Seite
// nicht sehen kann, und sie erscheint, solange das Foto noch laedt.
//
// Die Fotos duerfen gross hochgeladen werden. Sanity liefert sie
// verkleinert aus - die Website fragt sie mit hoechstens 1600 Pixel
// Breite an (siehe inhalt.js).
export const bild = defineType({
  name: 'bild',
  title: 'Bild',
  type: 'image',

  fields: [
    defineField({
      name: 'alt',
      title: 'Bildbeschreibung',
      type: 'string',
      description: 'Was ist zu sehen? Ein kurzer Satz, zum Beispiel "Klostergarten in voller Blüte".',
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {imageUrl: 'asset.url', title: 'alt'},
  },
})
