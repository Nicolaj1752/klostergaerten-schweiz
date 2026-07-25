import {defineField, defineType} from 'sanity'

// Alle Texte der Startseite. Es gibt nur ein Dokument dieses Typs.
export const startseite = defineType({
  name: 'startseite',
  title: 'Startseite',
  type: 'document',

  fields: [
    // ----- Titel im Foto -----
    defineField({
      name: 'heroTitel',
      title: 'Grosser Titel im Foto',
      type: 'string',
      description:
        'Erscheint gross im Gartenfoto. Kurz halten: sehr lange Titel werden auf dem Handy klein.',
      validation: (Rule) => Rule.required().max(30),
    }),

    // ----- Menuepunkte -----
    defineField({
      name: 'menue',
      title: 'Menüpunkte',
      type: 'array',
      description: 'Die Punkte auf der pinken Blume oben rechts.',
      of: [
        defineField({
          name: 'menuepunkt',
          title: 'Menüpunkt',
          type: 'object',
          fields: [
            defineField({
              name: 'beschriftung',
              title: 'Beschriftung',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'ziel',
              title: 'Ziel (Link)',
              type: 'string',
              description: 'Zum Beispiel #kontakt oder https://...',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'beschriftung', subtitle: 'ziel'},
          },
        }),
      ],
      validation: (Rule) => Rule.max(6).warning('Mehr als 6 Punkte passen kaum auf die Blume.'),
    }),

    // ----- Linke Textspalte -----
    defineField({
      name: 'spalteLinks',
      title: 'Linke Textspalte',
      type: 'textspalte',
    }),

    // ----- Rechte Textspalte -----
    defineField({
      name: 'spalteRechts',
      title: 'Rechte Textspalte',
      type: 'textspalte',
    }),

    // ----- Link unter der linken Spalte -----
    defineField({
      name: 'kontaktLinkText',
      title: 'Kontakt-Link Beschriftung',
      type: 'string',
      description: 'Der kursive Link unter der linken Spalte, z.B. "schreiben Sie uns!"',
    }),
    defineField({
      name: 'kontaktLinkZiel',
      title: 'Kontakt-Link Ziel',
      type: 'string',
      description: 'Zum Beispiel mailto:info@example.ch oder #kontakt',
    }),
  ],

  preview: {
    select: {title: 'heroTitel'},
    prepare({title}) {
      return {title: title || 'Startseite', subtitle: 'Alle Texte der Startseite'}
    },
  },
})
