import { createElement } from 'react'
import { addons, types } from '@storybook/manager-api'

// A naff button to toggle the HTML direction in the iframe
addons.register('html-dir', () => {
  addons.add('something', {
    type: types.TOOL,
    title: 'HTML direction',
    render: () => {
      function onClick() {
        const iframe = document.querySelector(
          'iframe[data-is-storybook="true"]',
        ) as HTMLIFrameElement
        if (!iframe || !iframe.contentDocument) return

        iframe.contentDocument.dir =
          iframe.contentDocument.dir !== 'rtl' ? 'rtl' : 'ltr'
      }

      return createElement('button', { onClick, title: 'HTML dir' }, 'dir')
    },
  })
})
