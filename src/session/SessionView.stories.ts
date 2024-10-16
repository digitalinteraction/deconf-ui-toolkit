import { Meta } from '@storybook/vue3';
import { BackButton } from '../core/module';
import {
  createSchedule,
  dates,
  MockAppLayout,
  randomSession,
} from '../story-lib/module';
import SessionView from './SessionView.vue';

export default {
  title: 'Session/SessionView',
  component: SessionView,

  parameters: { layout: 'fullscreen' },
} as Meta;

const Template = (args: any) => ({
  components: { SessionView, BackButton, MockAppLayout },
  setup: () => args,
  data() {
    const schedule = createSchedule();
    const session = randomSession(schedule, {
      slot: 'slot-b',
      participantCap: args.participantCap,
    });
    return { schedule, session };
  },
  template: `
    <MockAppLayout>
      <SessionView
        api-module="api"
        :session="session"
        :schedule="schedule"
        :logged-in="loggedIn"
        :schedule-date="scheduleDate"
      >
        <BackButton slot="backButton" to="/">Go back</BackButton>
        <p slot="footer">This is in the footer</p>
      </SessionView>
    </MockAppLayout>
  `,
});

export const Future = {
  render: Template,
  args: { loggedIn: true, scheduleDate: dates.past, participantCap: 50 },
};

export const FutureUncapped = {
  render: Template,
  args: { loggedIn: true, scheduleDate: dates.past, participantCap: null },
};

export const Countdown = {
  render: Template,
  args: {
    loggedIn: true,
    scheduleDate: dates.addMinutes(dates.now, -46, -23),
    participantCap: 50,
  },
};

export const Soon = {
  render: Template,
  args: {
    loggedIn: true,
    scheduleDate: dates.addMinutes(dates.now, -17, -23),
    participantCap: 50,
  },
};

export const Present = {
  render: Template,
  args: { loggedIn: true, scheduleDate: dates.now, participantCap: 50 },
};

export const Past = {
  render: Template,
  args: { loggedIn: true, scheduleDate: dates.future, participantCap: 50 },
};
