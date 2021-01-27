//
// Storybook util for registering fontawesome
// TODO: move to preview.js?
//

import { library } from '@fortawesome/fontawesome-svg-core';

import * as brands from '@fortawesome/free-brands-svg-icons';
import * as solid from '@fortawesome/free-solid-svg-icons';
import * as regular from '@fortawesome/free-regular-svg-icons';

export function setupFontawesome() {
  library.add(brands.fab);
  library.add(solid.fas);
  library.add(regular.far);
}
