import type {StructureResolver} from 'sanity/structure'

// Die Liste links im Studio.
//
// Normalerweise zeigt Sanity pro Typ eine Liste, in der man beliebig viele
// Dokumente anlegen kann. Hier gibt es aber von jeder Seite genau eine -
// deshalb fuehrt jeder Eintrag direkt zum immer gleichen Dokument.
//
// Die Kennungen unten (zum Beispiel "seite-start") stehen auch im HTML im
// Attribut data-seite. Beide muessen uebereinstimmen, sonst findet die
// Website ihre Texte nicht.
const SEITEN = [
  {id: 'allgemein', typ: 'allgemein', titel: 'Kopf- und Fusszeile'},
  {id: 'seite-start', typ: 'seiteStart', titel: 'Startseite'},
  {id: 'seite-wissen', typ: 'seiteWissen', titel: 'Wissen'},
  {id: 'seite-mitgliedschaft', typ: 'seiteMitgliedschaft', titel: 'Mitgliedschaft'},
  {id: 'seite-kontakt', typ: 'seiteKontakt', titel: 'Kontakt'},
  {id: 'seite-ueber-uns', typ: 'seiteUeberUns', titel: 'Über uns'},
]

export const struktur: StructureResolver = (S) =>
  S.list()
    .title('Website')
    .items(
      SEITEN.map(function (seite) {
        return S.listItem()
          .title(seite.titel)
          .id(seite.id)
          .child(S.document().schemaType(seite.typ).documentId(seite.id).title(seite.titel))
      }),
    )
