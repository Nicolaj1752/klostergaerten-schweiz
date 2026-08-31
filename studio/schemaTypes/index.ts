// Alle Typen, die das Studio kennen soll.
//
// Oben die fuenf Seiten und die gemeinsame Kopf- und Fusszeile - von
// jedem gibt es genau ein Dokument. Darunter die Bausteine, die in
// mehreren Seiten vorkommen.

import {allgemein} from './allgemein'
import {seiteStart} from './seiteStart'
import {seiteWissen} from './seiteWissen'
import {seiteUeberUns} from './seiteUeberUns'
import {seiteMitgliedschaft} from './seiteMitgliedschaft'
import {seiteKontakt} from './seiteKontakt'

import {bild} from './bild'
import {menuepunkt} from './menuepunkt'
import {feld} from './feld'
import {beitrag} from './beitrag'
import {textMitLink} from './textMitLink'

export const schemaTypes = [
  // Die Seiten
  allgemein,
  seiteStart,
  seiteWissen,
  seiteUeberUns,
  seiteMitgliedschaft,
  seiteKontakt,

  // Die Bausteine
  bild,
  menuepunkt,
  feld,
  beitrag,
  textMitLink,
]
