import { Meta, Story } from '@storybook/vue';
import { mockSession } from '../../story-lib/module';
import AddToCalendar from './AddToCalendar.vue';

export default {
  title: 'Core/AddToCalendar',
  component: AddToCalendar,
  argTypes: {
    onClick: { control: 'action' }
  }
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { AddToCalendar },
  props: ['calendarLink', 'session', 'onClick'],
  template: `
    <AddToCalendar
      :calendar-link="calendarLink"
      :session="session"
      @click="onClick"
    >
      Add to your calendar!
    </AddToCalendar>
  `
});

export const Default = Template.bind({});
Default.args = {
  calendarLink: '#'
};
Default.parameters = {};

export const Version2 = Template.bind({});
Version2.args = {
  session: mockSession()
};
Version2.parameters = {};
