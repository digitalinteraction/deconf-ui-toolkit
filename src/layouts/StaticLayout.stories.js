import StaticLayout from './StaticLayout.vue';
import { createContent } from '@/utils';

export default {
  title: 'Layout/StaticLayout',
  component: StaticLayout
};

const Content = createContent();

const Template = (args, { argTypes }) => ({
  components: { StaticLayout, Content },
  template: `
    <StaticLayout>
      <a @click.prevent slot="backButton" href="#" class="button">← Go Back</a>
      <div slot="main" class="content">
        <h1> Hello, World! </h1>
        <Content />
        <Content />
        <Content />
      </div>
    </StaticLayout>
  `
});
Template.args = {};

export const Desktop = Template.bind({});
Desktop.args = {};
Desktop.parameters = {
  layout: 'fullscreen'
};

export const Mobile = Template.bind({});
Mobile.args = {};
Mobile.parameters = {
  layout: 'fullscreen',
  viewport: { defaultViewport: 'mobile2' }
};
