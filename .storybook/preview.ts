import { library } from '@fortawesome/fontawesome-svg-core'
import * as brands from '@fortawesome/free-brands-svg-icons'
import * as solid from '@fortawesome/free-solid-svg-icons'
import * as regular from '@fortawesome/free-regular-svg-icons'

import '../src/scss/app.scss'

library.add(brands.fab, solid.fas, regular.far)

document.dir = 'ltr'
