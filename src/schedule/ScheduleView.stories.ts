import { Meta } from '@storybook/vue3';
import {
  createSchedule,
  dates,
  defaultLanguages,
  randomSession,
} from '../story-lib/module';
import ScheduleView from './ScheduleView.vue';

export default {
  title: 'Schedule/ScheduleView',
  component: ScheduleView,
  argTypes: {
    onFilter: { action: 'filter' },
  },
} as Meta;

const Template = (args: unknown) => ({
  components: { ScheduleView },
  setup: () => args,
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
      randomSession(schedule),
    ];
    return {
      schedule,
      sessions,
      userSessions: [sessions[0].id, sessions[2].id, sessions[5].id],
      config: {
        tileHeader: ['type', 'track'],
        tileAttributes: ['languages', 'organisation', 'themes', 'recorded'],
      },
      languages: defaultLanguages(),
    };
  },
  template: `
    <ScheduleView
      :schedule="schedule"
      :sessions="sessions"
      :user-sessions="userSessions"
      filters-key="schedule.filters"
      :config="config"
      :scheduleDate="scheduleDate"
      :is-during-conference="isDuringConference"
      :language-options="languages"
      :url-filters="urlFilters"
      @filter="onFilter"
    >
      <template v-slot:title>The Schedule</template>
      <template v-slot:noResults>No results!</template>
      <template v-slot:infoText>The sessions on at the conference</template>
    </ScheduleView>
  `,
});

export const Future = {
  render: Template,
  args: {
    scheduleDate: dates.past,
    isDuringConference: true,
  },
};

export const Present = {
  render: Template,
  args: {
    scheduleDate: dates.now,
    isDuringConference: true,
  },
};

export const PresetFilters = {
  render: Template,
  args: {
    scheduleDate: dates.now,
    isDuringConference: true,
    urlFilters: {
      query: 'plop',
      sessionType: 'plenary',
      track: 'track-a',
      theme: 'theme-a',
      date: dates.startOfDay(dates.now),
      isRecorded: true,
      viewMode: 'all',
      language: 'en',
    },
  },
};
