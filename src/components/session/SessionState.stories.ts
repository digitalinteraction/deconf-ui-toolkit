import { Meta, Story } from '@storybook/vue';
import SessionState from './SessionState.vue';
import { createTemplate } from '@/story-utils';

export default {
  title: 'Session/SessionState',
  component: SessionState
} as Meta;

const Template: Story = createTemplate({ SessionState });

const backgrounds = {
  default: 'off-white',
  values: [{ name: 'off-white', value: '#f2f2f2' }]
};

export const Future = Template.bind({});
Future.parameters = { backgrounds };
Future.args = {
  attendance: 3,
  slotState: 'future'
};

export const Soon = Template.bind({});
Soon.parameters = { backgrounds };
Soon.args = {
  attendance: 11,
  slotState: 'soon'
};

export const Present = Template.bind({});
Present.parameters = { backgrounds };
Present.args = {
  attendance: 11,
  slotState: 'present'
};

export const Past = Template.bind({});
Past.parameters = { backgrounds };
Past.args = {
  attendance: 11,
  slotState: 'past'
};
