import {defineField, defineType} from 'sanity'

// Alle Texte und Bilder der Mitgliedschaft-Seite (mitgliedschaft-neu.html).
//
// Achtung beim Formular: hier stehen nur die Beschriftungen. Wohin die
// Anmeldung geschickt wird, steht fest im HTML - das laesst sich hier
// nicht aus Versehen umlenken.
export const seiteMitgliedschaft = defineType({
  name: 'seiteMitgliedschaft',
  title: 'Mitgliedschaft',
  type: 'document',

  fieldsets: [
    {name: 'werden', title: '1 – Mitglied werden', options: {collapsible: true}},
    {name: 'publikation', title: '2 – Publikation 2028', options: {collapsible: true}},
    {name: 'vorteileAbschnitt', title: '3 – Ihre Vorteile', options: {collapsible: true}},
    {name: 'goenner', title: '4 – Gönnerinnen und Gönner', options: {collapsible: true}},
    {name: 'beitraegeAbschnitt', title: '5 – Mitgliederbeiträge', options: {collapsible: true}},
    {name: 'anmeldung', title: '6 – Anmeldeformular', options: {collapsible: true}},
    {name: 'twint', title: '7 – TWINT', options: {collapsible: true}},
  ],

  fields: [
    defineField({
      name: 'seitentitel',
      title: 'Titel im Browser-Tab',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // ----- 1 Mitglied werden -----
    defineField({
      name: 'werdenMarke',
      title: 'Kleine Überschrift',
      type: 'string',
      fieldset: 'werden',
    }),
    defineField({
      name: 'werdenAussage',
      title: 'Grosse Aussage',
      type: 'text',
      rows: 4,
      fieldset: 'werden',
    }),
    defineField({
      name: 'werdenFliesstext',
      title: 'Begleittext',
      type: 'text',
      rows: 7,
      fieldset: 'werden',
    }),

    // ----- 2 Publikation -----
    defineField({
      name: 'publikationMarke',
      title: 'Kleine Überschrift',
      type: 'string',
      fieldset: 'publikation',
    }),
    defineField({
      name: 'publikationAussage',
      title: 'Grosse Aussage',
      type: 'text',
      rows: 4,
      fieldset: 'publikation',
    }),
    defineField({
      name: 'publikationFliesstext',
      title: 'Begleittext',
      type: 'text',
      rows: 5,
      fieldset: 'publikation',
    }),

    // ----- 3 Vorteile -----
    defineField({
      name: 'vorteileMarke',
      title: 'Kleine Überschrift',
      type: 'string',
      fieldset: 'vorteileAbschnitt',
    }),
    defineField({
      name: 'vorteile',
      title: 'Die Vorteile',
      type: 'array',
      of: [{type: 'text', rows: 3}],
      fieldset: 'vorteileAbschnitt',
      description: 'Jeder Eintrag wird ein Punkt der Aufzählung.',
    }),
    defineField({
      name: 'vorteileNebentext',
      title: 'Text rechts daneben',
      type: 'textMitLink',
      fieldset: 'vorteileAbschnitt',
    }),

    // ----- 4 Goenner -----
    defineField({
      name: 'goennerMarke',
      title: 'Kleine Überschrift',
      type: 'string',
      fieldset: 'goenner',
    }),
    defineField({
      name: 'goennerAussage',
      title: 'Grosse Aussage',
      type: 'text',
      rows: 4,
      fieldset: 'goenner',
    }),
    defineField({
      name: 'goennerFliesstext',
      title: 'Begleittext',
      type: 'text',
      rows: 5,
      fieldset: 'goenner',
    }),

    // ----- 5 Beitraege -----
    defineField({
      name: 'beitraegeMarke',
      title: 'Kleine Überschrift',
      type: 'string',
      fieldset: 'beitraegeAbschnitt',
    }),
    defineField({
      name: 'beitraege',
      title: 'Die Beiträge',
      type: 'array',
      of: [{type: 'beitrag'}],
      fieldset: 'beitraegeAbschnitt',
    }),

    // ----- 6 Anmeldeformular -----
    defineField({
      name: 'anmeldungMarke',
      title: 'Kleine Überschrift',
      type: 'string',
      fieldset: 'anmeldung',
    }),
    defineField({
      name: 'anmeldungAussage',
      title: 'Grosse Aussage',
      type: 'text',
      rows: 3,
      fieldset: 'anmeldung',
    }),
    defineField({
      name: 'anmeldungFliesstext',
      title: 'Begleittext',
      type: 'textMitLink',
      fieldset: 'anmeldung',
    }),
    defineField({
      name: 'formularName',
      title: 'Beschriftung: Name',
      type: 'string',
      fieldset: 'anmeldung',
    }),
    defineField({
      name: 'formularMail',
      title: 'Beschriftung: E-Mail',
      type: 'string',
      fieldset: 'anmeldung',
    }),
    defineField({
      name: 'formularStrasse',
      title: 'Beschriftung: Strasse',
      type: 'string',
      fieldset: 'anmeldung',
    }),
    defineField({
      name: 'formularOrt',
      title: 'Beschriftung: PLZ und Ort',
      type: 'string',
      fieldset: 'anmeldung',
    }),
    defineField({
      name: 'formularArt',
      title: 'Beschriftung: Art der Mitgliedschaft',
      type: 'string',
      fieldset: 'anmeldung',
    }),
    defineField({
      name: 'formularArten',
      title: 'Auswahl: Art der Mitgliedschaft',
      type: 'array',
      of: [{type: 'string'}],
      fieldset: 'anmeldung',
      description:
        'Die Einträge im Auswahlfeld. Genau dieser Text steht später in der Anmeldemail – am besten zu den Beiträgen unter Punkt 5 passend halten.',
    }),
    defineField({
      name: 'formularBemerkung',
      title: 'Beschriftung: Bemerkung',
      type: 'string',
      fieldset: 'anmeldung',
    }),
    defineField({
      name: 'formularKnopf',
      title: 'Beschriftung des Absendeknopfs',
      type: 'string',
      fieldset: 'anmeldung',
    }),

    // ----- 7 TWINT -----
    defineField({
      name: 'twintTitel',
      title: 'Überschrift',
      type: 'string',
      fieldset: 'twint',
    }),
    defineField({
      name: 'twintLogo',
      title: 'TWINT-Logo',
      type: 'bild',
      fieldset: 'twint',
    }),
    defineField({
      name: 'twintCode',
      title: 'QR-Code',
      type: 'bild',
      fieldset: 'twint',
      description: 'Erscheint nur auf breiten Bildschirmen. Auf dem Handy steht stattdessen der Knopf darunter.',
    }),
    defineField({
      name: 'twintKnopfText',
      title: 'Beschriftung des Knopfs',
      type: 'string',
      fieldset: 'twint',
    }),
    defineField({
      name: 'twintZiel',
      title: 'Ziel des Knopfs',
      type: 'string',
      fieldset: 'twint',
      description: 'Die TWINT-Adresse des Vereins. Dieselbe steht auf der Kontaktseite unter "Spenden".',
    }),
    defineField({
      name: 'twintHinweis',
      title: 'Hinweis unter dem Knopf',
      type: 'text',
      rows: 3,
      fieldset: 'twint',
    }),
  ],

  preview: {
    prepare() {
      return {title: 'Mitgliedschaft'}
    },
  },
})
