import { Meta } from '@storybook/vue3';
import SessionState from './SessionState.vue';

export default {
  title: 'Session/SessionState',
  component: SessionState,
  argTypes: {
    slotState: {
      control: {
        type: 'select',
        options: ['future', 'soon', 'past', 'present'],
      },
    },
  },
} as Meta;

const Template = (args: unknown) => ({
  components: { SessionState },
  setup: () => args,
  template: `
    <SessionState :attendance="attendance" :slot-state="slotState" />
  `,
});

const backgrounds = {
  default: 'off-white',
  values: [{ name: 'off-white', value: '#f2f2f2' }],
};

export const Future = {
  render: Template,
  args: { attendance: 3, slotState: 'future' },
  parameters: { backgrounds },
};

export const Soon = {
  render: Template,
  args: { attendance: 11, slotState: 'soon' },
  parameters: {},
};

export const Present = {
  render: Template,
  args: { attendance: 11, slotState: 'present' },
  parameters: { backgrounds },
};

export const Past = {
  render: Template,
  args: { attendance: 11, slotState: 'past' },
  parameters: { backgrounds },
};

export const NoAttendance = {
  render: Template,
  args: { attendance: null, slotState: 'present' },
  parameters: { backgrounds },
};
