import RegisterInterest from './RegisterInterest.vue';
import { createTemplate } from '@/utils';

export default {
  title: 'Schedule/RegisterInterest',
  component: RegisterInterest
};

const Template = createTemplate({ RegisterInterest });

export const NotRegistered = Template.bind({});
NotRegistered.args = {
  isWorking: false,
  isRegistered: false
};

export const IsWorking = Template.bind({});
IsWorking.args = {
  isWorking: true,
  isRegistered: false
};

export const Registered = Template.bind({});
Registered.args = {
  isWorking: false,
  isRegistered: true
};
