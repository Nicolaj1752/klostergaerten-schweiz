import {defineField, defineType} from 'sanity'

// Ein Punkt im Menue - oben in der Kopfzeile und unten in der Fusszeile.
export const menuepunkt = defineType({
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
      title: 'Ziel',
      type: 'string',
      description:
        'Der Dateiname der Seite, zum Beispiel wissen-neu.html. Nur ändern, wenn eine Seite umbenannt wurde – ein falscher Name führt ins Leere.',
      validation: (Rule) => Rule.required(),
    }),

    // Die Startseite steht oben links schon als Vereinsname. Auf breiten
    // Schirmen waere sie im Menue daneben doppelt, im Klappmenue auf dem
    // Handy fehlt sie dagegen. Deshalb dieser Schalter.
    defineField({
      name: 'nurImKlappmenue',
      title: 'Nur im Klappmenü auf dem Handy zeigen',
      type: 'boolean',
      description:
        'Für Punkte, die auf breiten Bildschirmen doppelt wären – etwa "Startseite", die dort schon links als Vereinsname steht.',
      initialValue: false,
    }),
  ],

  preview: {
    select: {title: 'beschriftung', subtitle: 'ziel'},
  },
})
