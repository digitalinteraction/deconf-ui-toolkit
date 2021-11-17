import { Meta, Story } from '@storybook/vue';
import { BackButton } from '../core/module';
import {
  createSchedule,
  dates,
  MockAppLayout,
  randomSession
} from '../story-lib/module';
import SessionView from './SessionView.vue';

export default {
  title: 'Session/SessionView',
  component: SessionView
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { SessionView, MockAppLayout, BackButton },
  props: ['loggedIn', 'scheduleDate'],
  data() {
    const schedule = createSchedule();
    const session = randomSession(schedule, {
      slot: 'slot-b',
      participantCap: args.participantCap
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
      </SessionView>
    </MockAppLayout>
  `
});

export const Future = Template.bind({});
Future.args = {
  loggedIn: true,
  scheduleDate: dates.past,
  participantCap: 50
};
Future.parameters = {
  layout: 'fullscreen'
};

export const FutureUncapped = Template.bind({});
FutureUncapped.args = {
  loggedIn: true,
  scheduleDate: dates.past,
  participantCap: null
};
FutureUncapped.parameters = {
  layout: 'fullscreen'
};

export const Countdown = Template.bind({});
Countdown.args = {
  loggedIn: true,
  scheduleDate: dates.addMinutes(dates.now, -46, -23),
  participantCap: 50
};
Countdown.parameters = {
  layout: 'fullscreen'
};

export const Soon = Template.bind({});
Soon.args = {
  loggedIn: true,
  scheduleDate: dates.addMinutes(dates.now, -17, -23),
  participantCap: 50
};
Soon.parameters = {
  layout: 'fullscreen'
};

export const Present = Template.bind({});
Present.args = {
  loggedIn: true,
  scheduleDate: dates.now,
  participantCap: 50
};
Present.parameters = {
  layout: 'fullscreen'
};

export const Past = Template.bind({});
Past.args = {
  loggedIn: true,
  scheduleDate: dates.future,
  participantCap: 50
};
Past.parameters = {
  layout: 'fullscreen'
};
