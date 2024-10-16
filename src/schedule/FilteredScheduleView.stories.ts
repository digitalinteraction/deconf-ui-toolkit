import { Meta } from '@storybook/vue3';
import {
  createSchedule,
  dates,
  MockAppLayout,
  randomSession,
} from '../story-lib/module';
import { FilteredScheduleOptions } from './filtered-schedule-options';
import FilteredScheduleView from './FilteredScheduleView.vue';

export default {
  title: 'Schedule/FilteredScheduleView',
  component: FilteredScheduleView,
} as Meta;

const Template = (args: unknown) => ({
  components: { FilteredScheduleView, MockAppLayout },
  props: ['onFilter'],
  data() {
    const schedule = createSchedule();
    schedule.sessions = [
      randomSession(schedule, { slot: 'slot-a', type: 'plenary' }),
      randomSession(schedule, { slot: 'slot-a', type: 'workshop' }),
      randomSession(schedule, { slot: 'slot-a', type: 'workshop' }),
      randomSession(schedule, { slot: 'slot-b', type: 'workshop' }),
      randomSession(schedule, { slot: 'slot-b', type: 'workshop' }),
      randomSession(schedule, { slot: 'slot-c', type: 'plenary' }),
    ];
    const userSessions = [
      schedule.sessions[3].id,
      schedule.sessions[4].id,
      schedule.sessions[5].id,
    ];
    const options: FilteredScheduleOptions = {
      predicate: () => true,
      filtersKey: 'storybookScheduleView',
      scheduleConfig: {
        tileHeader: ['type'],
        tileAttributes: ['track', 'themes'],
      },
      enabledFilters: ['track', 'theme'],
      languages: [
        { value: 'en', text: 'English' },
        { value: 'es', text: 'Spanish' },
      ],
    };
    const date = dates.past;
    return { schedule, userSessions, options, date };
  },
  template: `
    <MockAppLayout>
      <FilteredScheduleView
        :schedule="schedule"
        :user-sessions="userSessions"
        :options="options"
        :schedule-date="date"
        @filter="onFilter"
      >
        <span slot="title">Title</span>
        <p slot="infoText">Information text here</p>
        <span slot="noResults">No results...</span>
      </FilteredScheduleView>
    </MockAppLayout>
  `,
});

export const Default = Template.bind({});
Default.args = {
  onFilter: () => console.log('FilteredScheduleView@filter'),
};
Default.parameters = {
  layout: 'fullscreen',
  controls: {
    exclude: [
      'schedule',
      'userSessions',
      'options',
      'scheduleDate',
      'routeQuery',
    ],
  },
};
