import { Meta, Story } from '@storybook/vue';
import BoxContent from './BoxContent.vue';
import { Content } from '../story-lib/module';

export default {
  title: 'Atrium/BoxContent',
  component: BoxContent,
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { BoxContent, Content },
  props: ['title'],
  template: `
    <BoxContent :title="title">
      <Content class="content" />
    </BoxContent>
  `,
});

export const Desktop = Template.bind({});
Desktop.args = {
  title: 'Lorem ipsum sil dor amet',
};
Desktop.parameters = {
  backgrounds: { default: 'dark' },
  controls: {
    exclude: ['default'],
  },
};

export const Mobile = Template.bind({});
Mobile.args = {
  title: 'Lorem ipsum sil dor amet',
};
Mobile.parameters = {
  backgrounds: { default: 'dark' },
  controls: {
    exclude: ['default'],
  },
  viewport: {
    defaultViewport: 'mobile2',
  },
};
