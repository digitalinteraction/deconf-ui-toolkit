import { Meta, Story } from '@storybook/vue';
import BoxContent from './BoxContent.vue';
import { createTemplate, createContent } from '@/story-utils';

export default {
  title: 'Component/BoxContent',
  component: BoxContent
} as Meta;

const Template: Story = createTemplate({ BoxContent });

export const Default = Template.bind({});
Default.args = {
  title: 'Lorem ipsum sil dor amet',
  content: createContent()
};
Default.parameters = {
  backgrounds: { default: 'dark' }
};
