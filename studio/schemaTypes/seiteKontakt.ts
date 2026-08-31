import {defineField, defineType} from 'sanity'

// Alle Texte der Kontaktseite (kontakt-neu.html).
export const seiteKontakt = defineType({
  name: 'seiteKontakt',
  title: 'Kontakt',
  type: 'document',

  fieldsets: [
    {name: 'adresse', title: '1 – Adresse', options: {collapsible: true}},
    {name: 'mail', title: '2 – Mail', options: {collapsible: true}},
    {name: 'spenden', title: '3 – Spenden', options: {collapsible: true}},
  ],

  fields: [
    defineField({
      name: 'seitentitel',
      title: 'Titel im Browser-Tab',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // ----- 1 Adresse -----
    defineField({
      name: 'adresseMarke',
      title: 'Kleine Überschrift',
      type: 'string',
      fieldset: 'adresse',
    }),
    defineField({
      name: 'anschrift',
      title: 'Anschrift',
      type: 'text',
      rows: 4,
      fieldset: 'adresse',
      description: 'Jede Zeile hier wird auch auf der Website zu einer eigenen Zeile.',
    }),

    // ----- 2 Mail -----
    defineField({
      name: 'mailMarke',
      title: 'Kleine Überschrift',
      type: 'string',
      fieldset: 'mail',
    }),
    defineField({
      name: 'mailAdresse',
      title: 'E-Mail-Adresse',
      type: 'string',
      fieldset: 'mail',
      description: 'Wird angezeigt und ist zugleich der Link – ein Klick öffnet das Mailprogramm.',
    }),

    // ----- 3 Spenden -----
    defineField({
      name: 'spendenMarke',
      title: 'Kleine Überschrift',
      type: 'string',
      fieldset: 'spenden',
    }),
    defineField({
      name: 'spendenText',
      title: 'Beschriftung des Links',
      type: 'string',
      fieldset: 'spenden',
    }),
    defineField({
      name: 'spendenZiel',
      title: 'Ziel des Links',
      type: 'string',
      fieldset: 'spenden',
      description:
        'Die TWINT-Adresse des Vereins. Dieselbe steckt im QR-Code auf der Mitgliedschaft-Seite – beide zusammen ändern.',
    }),
  ],

  preview: {
    prepare() {
      return {title: 'Kontakt'}
    },
  },
})
