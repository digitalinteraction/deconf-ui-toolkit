import { Meta } from '@storybook/vue3';
import MiniSession from './MiniSession.vue';

import { dates, mockSession, mockSessionSlot } from '../story-lib/module';

export default {
  title: 'Atrium/MiniSession',
  component: MiniSession,
} as Meta;

const Template = (args: unknown) => ({
  components: { MiniSession },
  setup: () => args,
  data: () => ({
    session: mockSession(),
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

export const Default = {
  render: Template,
  args: {
    sessionSlot: mockSessionSlot({
      start: dates.addMinutes(dates.now, 69, 11),
    }),
  },
};

export const Live = {
  render: Template,
  args: {
    sessionSlot: mockSessionSlot({
      start: dates.addMinutes(dates.now, -15),
      end: dates.addMinutes(dates.now, 15),
    }),
  },
};
