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
  props: ['attendance', 'slotState'],
  template: `
    <SessionState :attendance="attendance" :slot-state="slotState" />
  `,
});

const backgrounds = {
  default: 'off-white',
  values: [{ name: 'off-white', value: '#f2f2f2' }],
};

export const Future = Template.bind({});
Future.parameters = { backgrounds };
Future.args = {
  attendance: 3,
  slotState: 'future',
};

export const Soon = Template.bind({});
Soon.parameters = { backgrounds };
Soon.args = {
  attendance: 11,
  slotState: 'soon',
};

export const Present = Template.bind({});
Present.parameters = { backgrounds };
Present.args = {
  attendance: 11,
  slotState: 'present',
};

export const Past = Template.bind({});
Past.parameters = { backgrounds };
Past.args = {
  attendance: 11,
  slotState: 'past',
};

export const NoAttendance = Template.bind({});
NoAttendance.parameters = { backgrounds };
NoAttendance.args = {
  attendance: null,
  slotState: 'present',
};
