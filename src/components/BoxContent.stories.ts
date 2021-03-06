import { Meta, Story } from '@storybook/vue';
import BoxContent from './BoxContent.vue';
import { createContent } from '@/story-utils';

export default {
  title: 'Component/BoxContent',
  component: BoxContent
} as Meta;

const Content = createContent();

const Template: Story = (args, { argTypes }) => ({
  components: { BoxContent, Content },
  props: ['title'],
  data: () => ({
    content: createContent()
  }),
  template: `
    <BoxContent :title="title" :content="content" />
  `
});

export const Default = Template.bind({});
Default.args = {
  title: 'Lorem ipsum sil dor amet'
};
Default.parameters = {
  backgrounds: { default: 'dark' }
};
