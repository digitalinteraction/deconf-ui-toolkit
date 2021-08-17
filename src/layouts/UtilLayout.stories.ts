import { Meta, Story } from '@storybook/vue';

import UtilLayout from './UtilLayout.vue';
import {
  HeroCard,
  BoxContent,
  ColorWidget,
  SponsorGrid
} from '../components/module';

import { createSponsors, createContent } from '../story-utils';

export default {
  title: 'Layout/UtilLayout',
  component: UtilLayout
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { UtilLayout, BoxContent },
  data: () => ({
    content: createContent(),
    homeRoute: { name: 'HOME' }
  }),
  template: `
    <UtilLayout :home-route="homeRoute">
      <component :is="content" slot="main" />
      <img
        slot="brand"
        src="/brand.svg"
        width="160"
        height="28"
      />
      <div slot="footer" class="footer">
        <p>This is a footer</p>
      </div>

    </UtilLayout>
  `
});

export const Desktop = Template.bind({});
Desktop.args = {};
Desktop.parameters = { layout: 'fullscreen' };

export const Mobile = Template.bind({});
Mobile.args = {};
Mobile.parameters = {
  viewport: { defaultViewport: 'mobile2' },
  layout: 'fullscreen'
};
