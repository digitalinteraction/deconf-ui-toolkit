import { Meta } from '@storybook/vue3';
import JoinSession from './JoinSession.vue';

export default {
  title: 'Core/Session/JoinSession',
  component: JoinSession,
  argTypes: {
    slotState: {
      control: 'select',
      options: ['future', 'soon', 'present', 'past'],
    },
  },
} as Meta;

const Template = (args: unknown) => ({
  components: { JoinSession },
  setup: () => args,
  template: `
    <JoinSession
      :slot-state="slotState"
      :session-id="sessionId"
    />
  `,
});

export const Default = {
  render: Template,
  args: {
    slotState: 'future',
    sessionId: 'abcdef',
  },
  parameters: {},
};
