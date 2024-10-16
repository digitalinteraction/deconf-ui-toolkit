import { Meta } from '@storybook/vue3';
import { dates, mockSession, mockSessionSlot } from '../story-lib/module';
import FeaturedSessions from './FeaturedSessions.vue';

export default {
  title: 'Atrium/FeaturedSessions',
  component: FeaturedSessions,
} as Meta;

const Template = (args: unknown) => ({
  components: { FeaturedSessions },
  setup: () => args,
  data: () => ({
    currentDate: dates.now,
    featured: [
      {
        session: mockSession({ id: 'session-a' }),
        slot: mockSessionSlot({
          start: dates.addMinutes(dates.now, -15),
          end: dates.addMinutes(dates.now, 15),
        }),
      },
      {
        session: mockSession({ id: 'session-b' }),
        slot: mockSessionSlot({ start: dates.addMinutes(dates.now, 91) }),
      },
      {
        session: mockSession({ id: 'session-c' }),
        slot: mockSessionSlot({ start: dates.addMinutes(dates.now, 291) }),
      },
    ],
  }),
  template: `
    <FeaturedSessions
      :featured="featured"
      :current-date="currentDate"
      :show-action="showAction"
    />
  `,
});

export const Default = {
  args: {
    showAction: true,
  },
  render: Template,
};
