import { Meta, Story } from '@storybook/vue';

import UtilLayout from './UtilLayout.vue';
import { BackButton } from '../components/module';

import { Content, BrandA, LanguageControl } from '../story-lib/module';

export default {
  title: 'Layout/UtilLayout',
  component: UtilLayout,
  argTypes: {
    width: {
      control: {
        type: 'select',
        options: ['regular', 'medium', 'large']
      }
    }
  }
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { UtilLayout, Content, BrandA, LanguageControl, BackButton },
  props: ['width'],
  data: () => ({
    homeRoute: { name: 'HOME' }
  }),
  template: `
    <UtilLayout :home-route="homeRoute" :width="width">
      <Content slot="main" />
      <BackButton slot="backButton" to="#">Go Back</button>
      <BrandA slot="brand" />
      <div slot="footer" class="footer">
        <p>This is a footer</p>
      </div>
      <LanguageControl slot="languageControl" />
    </UtilLayout>
  `
});

export const Desktop = Template.bind({});
Desktop.args = {
  width: 'regular'
};
Desktop.parameters = { layout: 'fullscreen' };

export const Mobile = Template.bind({});
Mobile.args = {
  width: 'regular'
};
Mobile.parameters = {
  viewport: { defaultViewport: 'mobile2' },
  layout: 'fullscreen'
};
