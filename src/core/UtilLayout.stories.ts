import { Meta } from '@storybook/vue3';

import UtilLayout from './UtilLayout.vue';
import BackButton from './BackButton.vue';

import { Content, BrandA, LanguageControl } from '../story-lib/module';

export default {
  title: 'Core/UtilLayout',
  component: UtilLayout,
  argTypes: {
    width: {
      control: 'select',
      options: ['regular', 'medium', 'large'],
    },
  },
} as Meta;

const Template = (args: unknown) => ({
  components: { UtilLayout, Content, BrandA, LanguageControl, BackButton },
  setup: () => args,
  data: () => ({
    homeRoute: { name: 'HOME' },
  }),
  template: `
    <UtilLayout :home-route="homeRoute" :width="width">
      <template v-slot:main>
        <Content />
      </template>
        
      <template v-slot:backButton>
        <BackButton to="#">Go Back</button>
      </template>
        
      <template v-slot:brand>
        <BrandA />
      </template>
        
      <template v-slot:footer>
        <div class="footer">
          <p>This is a footer</p>
        </div>
      </template>
        
      <template v-slot:languageControl>
        <LanguageControl />
      </template>
    </UtilLayout>
  `,
});

export const Default = {
  render: Template,
  args: {
    width: 'regular',
  },
  parameters: {
    layout: 'fullscreen',
  },
};
