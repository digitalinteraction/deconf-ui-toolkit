import { Meta } from '@storybook/vue3';
import { fn } from '@storybook/test';
import { mockSession } from '../../story-lib/module';
import AddToCalendar from './AddToCalendar.vue';

export default {
  title: 'Core/Session/AddToCalendar',
  component: AddToCalendar,
} as Meta;

const Template = (args: unknown) => ({
  components: { AddToCalendar },
  setup: () => args,
  template: `
    <AddToCalendar
      :calendar-link="calendarLink"
      :session="session"
      @toggle="onToggle"
    >
      Add to your calendar!
    </AddToCalendar>
  `,
});

export const Default = {
  render: Template,
  args: {
    calendarLink: '#',
    session: null,
    onToggle: fn((e: Event) => e.preventDefault()),
  },
  parameters: {},
};

export const Version2 = {
  render: Template,
  args: {
    session: mockSession(),
    calendarLink: null,
    onToggle: fn((e: Event) => e.preventDefault()),
  },
  parameters: {},
};
