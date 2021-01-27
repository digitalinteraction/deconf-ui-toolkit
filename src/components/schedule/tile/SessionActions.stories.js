import SessionActions from './SessionActions.vue';
import { createTemplate } from '@/utils';

export default {
  title: 'Schedule/SessionActions',
  component: SessionActions
};

const Template = createTemplate({ SessionActions });

const session = {
  id: '1'
};

export const Future = Template.bind({});
Future.args = {
  session,
  slotState: 'future'
};

export const Soon = Template.bind({});
Soon.args = {
  session,
  slotState: 'soon'
};

export const Present = Template.bind({});
Present.args = {
  session,
  slotState: 'present'
};

export const Past = Template.bind({});
Past.args = {
  session,
  slotState: 'past'
};
