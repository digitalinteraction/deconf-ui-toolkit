import { Meta, Story } from '@storybook/vue';
import BoxContent from './BoxContent.vue';
import { createContent } from '../story-lib/module';

export default {
  title: 'Component/BoxContent',
  component: BoxContent
} as Meta;

const Content = createContent();

const Template: Story = (args, { argTypes }) => ({
  components: { BoxContent, Content },
  props: ['title'],
  template: `
    <BoxContent :title="title">
      <Content />
    </BoxContent>
  `
});

export const Desktop = Template.bind({});
Desktop.args = {
  title: 'Lorem ipsum sil dor amet'
};
Desktop.parameters = {
  backgrounds: { default: 'dark' },
  controls: {
    exclude: ['default']
  }
};

export const Mobile = Template.bind({});
Mobile.args = {
  title: 'Lorem ipsum sil dor amet'
};
Mobile.parameters = {
  backgrounds: { default: 'dark' },
  controls: {
    exclude: ['default']
  },
  viewport: {
    defaultViewport: 'mobile2'
  }
};
