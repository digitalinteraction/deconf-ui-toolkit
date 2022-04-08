import { Meta, Story } from '@storybook/vue';
import PrivateCalendarCreator from './PrivateCalendarCreator.vue';

export default {
  title: 'Registration/PrivateCalendarCreator',
  component: PrivateCalendarCreator
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { PrivateCalendarCreator },
  props: [],
  template: `
    <PrivateCalendarCreator />
  `
});

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  // ...
};
