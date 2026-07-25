import {defineCliConfig} from 'sanity/cli'
import {projectId, dataset} from './sanity.config'

export default defineCliConfig({
  api: {projectId, dataset},

  // Adresse des Studios nach "npm run deploy":
  // https://klostergaerten.sanity.studio
  studioHost: 'klostergaerten',

  autoUpdates: true,
})
