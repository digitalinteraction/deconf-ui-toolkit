import { Meta, Story } from '@storybook/vue';
import SessionLink from './SessionLink.vue';
import { createTemplate } from '@/story-utils';

export default {
  title: 'Session/SessionLink',
  component: SessionLink,
  decorators: [
    () => ({ template: `<div style="max-width: 420px"><story/></div>` })
  ]
} as Meta;

const Template: Story = createTemplate({ SessionLink });

export const Default = Template.bind({});
Default.args = {
  title: 'Join the zoom',
  link: 'https://zoom.us/u/123456789'
};
