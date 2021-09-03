import { Meta, Story } from '@storybook/vue';
import AddToCalendar from './AddToCalendar.vue';

export default {
  title: 'Schedule/AddToCalendar',
  component: AddToCalendar
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { AddToCalendar },
  template: `
    <AddToCalendar
      calendar-link="#"
    >
      Add to your calendar!
    </AddToCalendar>
  `
});

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {};
