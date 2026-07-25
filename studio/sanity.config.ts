import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

// HIER die Projekt-ID eintragen, falls sie sich aendert.
// Sie muss mit der ID in ../daten.js uebereinstimmen.
export const projectId = 'ag1064vs'
export const dataset = 'production'

export default defineConfig({
  name: 'default',
  title: 'Klostergärten Schweiz',

  projectId,
  dataset,

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})
