import { Meta, Story } from '@storybook/vue';
import SessionLink from './SessionLink.vue';

export default {
  title: 'Session/SessionLink',
  component: SessionLink,
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { SessionLink },
  props: ['title', 'link'],
  template: `
    <div style="max-width: 420px">
      <SessionLink :title="title" :link="link" />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Join the zoom',
  link: 'https://zoom.us/u/123456789',
};
