import { Meta, Story } from '@storybook/vue';
import {
  createSchedule,
  dates,
  defaultLanguages,
  MockAppLayout,
  randomSession
} from '../story-lib/module';
import ScheduleView from './ScheduleView.vue';

export default {
  title: 'Schedule/ScheduleView',
  component: ScheduleView
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { MockAppLayout, ScheduleView },
  props: ['isDuringConference', 'scheduleDate'],
  data() {
    const schedule = createSchedule();
    const sessions = [
      randomSession(schedule),
      randomSession(schedule),
      randomSession(schedule),
      randomSession(schedule),
      randomSession(schedule),
      randomSession(schedule),
      randomSession(schedule),
      randomSession(schedule),
      randomSession(schedule),
      randomSession(schedule)
    ];
    return {
      schedule,
      sessions,
      userSessions: [sessions[0].id, sessions[2].id, sessions[5].id],
      config: {
        tileHeader: ['type', 'track'],
        tileAttributes: ['languages', 'organisation', 'themes', 'recorded']
      },
      languages: defaultLanguages()
    };
  },
  template: `
    <MockAppLayout>
      <ScheduleView
        :schedule="schedule"
        :sessions="sessions"
        :user-sessions="userSessions"
        filters-key="schedule.filters"
        :config="config"
        :scheduleDate="scheduleDate"
        :is-during-conference="isDuringConference"
        :language-options="languages"
      >
        <span slot="title">The Schedule</span>
        <span slot="noResults">No results!</span>
        <p slot="infoText">The sessions on at the conference</p>
      </ScheduleView>
    </MockAppLayout>
  `
});

export const Future = Template.bind({});
Future.args = {
  scheduleDate: dates.past,
  isDuringConference: true
};
Future.parameters = {
  layout: 'fullscreen',
  controls: {
    exclude: [
      'schedule',
      'sessions',
      'filtersKey',
      'enabledFilters',
      'infoText',
      'config'
    ]
  }
};

export const Present = Template.bind({});
Present.args = {
  scheduleDate: dates.now,
  isDuringConference: true
};
Present.parameters = {
  ...Future.parameters,
  layout: 'fullscreen'
};

export const Past = Template.bind({});
Past.args = {
  scheduleDate: dates.future,
  isDuringConference: false
};
Past.parameters = {
  ...Future.parameters,
  layout: 'fullscreen'
};
