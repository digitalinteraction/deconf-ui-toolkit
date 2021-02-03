import { Meta, Story } from '@storybook/vue';
import RegisterInterest from './RegisterInterest.vue';

export default {
  title: 'Schedule/RegisterInterest',
  component: RegisterInterest
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { RegisterInterest },
  props: ['isWorking', 'isRegistered'],
  template: `
    <RegisterInterest
      :is-working="isWorking"
      :is-registered="isRegistered"
    />
  `
});

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
