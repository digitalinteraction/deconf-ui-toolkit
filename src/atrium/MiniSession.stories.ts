import { Meta, Story } from '@storybook/vue';
import MiniSession from './MiniSession.vue';

import { dates, mockSession, mockSessionSlot } from '../story-lib/module';

export default {
  title: 'Atrium/MiniSession',
  component: MiniSession,
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { MiniSession },
  data: () => ({
    session: mockSession(),
    sessionSlot: args.sessionSlot,
    currentDate: dates.now,
  }),
  template: `
    <MiniSession
      :session="session"
      :session-slot="sessionSlot"
      :current-date="currentDate"
    />
  `,
});

export const Default = Template.bind({});
Default.args = {
  sessionSlot: mockSessionSlot({
    start: dates.addMinutes(dates.now, 69, 11),
  }),
};
Default.parameters = {};

export const Live = Template.bind({});
Live.args = {
  sessionSlot: mockSessionSlot({
    start: dates.addMinutes(dates.now, -15),
    end: dates.addMinutes(dates.now, 15),
  }),
};
Live.parameters = {};
