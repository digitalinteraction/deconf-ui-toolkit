import { Meta, Story } from '@storybook/vue3'
import NavigationBar from './NavigationBar.vue'
import {
  BrandA,
  BrandB,
  LanguageControl,
  mockSettings,
} from '../../story-lib/module'

export default {
  title: 'App/NavigationBar',
  component: NavigationBar,
} as Meta

const Template: Story = (args, { argTypes }) => ({
  components: { NavigationBar, BrandA, BrandB, LanguageControl },
  setup() {
    return {
      ...args,
      appSettings: mockSettings(),
      routes: [
        {
          name: 'A',
          title: 'Route A',
          enabled: true,
        },
        {
          name: 'B',
          title: 'Route B',
          enabled: true,
        },
        {
          name: 'C',
          title: 'Route C',
          enabled: true,
        },
        {
          name: 'D',
          title: 'Route D',
          enabled: false,
        },
      ],
    }
  },
  template: `
    <NavigationBar
      :app-settings="appSettings"
      :routes="routes"
      :is-logged-in="isLoggedIn"
      :is-interpreter="isInterpreter"
    >
      <template v-slot:brandA>
        <BrandA />
      </template>
      <template v-slot:brandB>
        <BrandB />
      </template>
      <template v-slot:languageControl>
        <LanguageControl />
      </template>
     </NavigationBar>
  `,
})

export const Desktop = Template.bind({})
Desktop.args = {
  isLoggedIn: true,
  isInterpreter: true,
}
Desktop.parameters = {
  layout: 'fullscreen',
  controls: {
    exclude: ['appSettings', 'routes', 'brandA', 'brandB', 'languageControl'],
  },
}

export const Mobile = Template.bind({})
Mobile.args = {
  ...Desktop.args,
}
Mobile.parameters = {
  viewport: { defaultViewport: 'mobile2' },
  layout: 'fullscreen',
  controls: {
    exclude: ['appSettings', 'routes', 'brandA', 'brandB', 'languageControl'],
  },
}
