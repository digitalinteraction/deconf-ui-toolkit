import { Meta, Story } from '@storybook/vue';
import JoinSession from './JoinSession.vue';

export default {
  title: 'Schedule/JoinSession',
  component: JoinSession,
  argTypes: {
    slotState: {
      control: {
        type: 'select',
        options: ['future', 'soon', 'present', 'past']
      }
    }
  }
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { JoinSession },
  props: ['slotState', 'sessionId'],
  template: `
    <JoinSession
      :slot-state="slotState"
      :session-id="sessionId"
    />
  `
});

export const Default = Template.bind({});
Default.args = {
  slotState: 'future',
  sessionId: 'abcdef'
};
Default.parameters = {};
