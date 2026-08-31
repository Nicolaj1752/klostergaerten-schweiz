import {defineCliConfig} from 'sanity/cli'
import {projectId, dataset} from './sanity.config'

export default defineCliConfig({
  api: {projectId, dataset},

  // Adresse des Studios nach "npm run deploy":
  // https://klostergaerten.sanity.studio
  studioHost: 'klostergaerten',

  deployment: {
    // Feste App-ID, damit der Deploy nicht jedes Mal nachfragt
    appId: 'hlkrov348w233pxdz36h0s5y',

    // Aus: sonst meldet der Dev-Server einen Versions-Fehler.
    // Updates werden stattdessen ueber npm gemacht.
    autoUpdates: false,
  },
})
