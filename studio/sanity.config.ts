import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {struktur} from './struktur'

// HIER die Projekt-ID eintragen, falls sie sich aendert.
// Sie muss mit der ID in ../inhalt.js uebereinstimmen.
export const projectId = 'ag1064vs'
export const dataset = 'production'

export default defineConfig({
  name: 'default',
  title: 'Klostergärten Schweiz',

  projectId,
  dataset,

  // struktur.ts bestimmt, was links in der Liste steht
  plugins: [structureTool({structure: struktur})],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Von jeder Seite gibt es genau ein Dokument. Neue anzulegen ergaebe
    // keinen Sinn - deshalb bietet der Knopf "Create new" nichts an.
    newDocumentOptions: () => [],
  },
})
