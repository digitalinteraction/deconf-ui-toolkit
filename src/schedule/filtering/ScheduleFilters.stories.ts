import { Meta } from '@storybook/vue3';
import { createSchedule, defaultLanguages } from '../../story-lib/module';
import ScheduleFilters from './ScheduleFilters.vue';

export default {
  title: 'Schedule/ScheduleFilters',
  component: ScheduleFilters,
} as Meta;

const ALL_FILTERS = [
  'queryFilter',
  'sessionTypeFilter',
  'trackFilter',
  'themeFilter',
  'dateFilter',
  'isRecordedFilter',
  'languageFilter',
];

function multiDaySchedule() {
  const schedule = createSchedule();
  schedule.slots[0].start.setDate(schedule.slots[0].start.getDate() - 1);
  schedule.slots[2].start.setDate(schedule.slots[2].start.getDate() + 1);
  return schedule;
}

const Template = (args: any) => ({
  components: { ScheduleFilters },
  setup: () => args,
  data: () => ({
    schedule: multiDaySchedule(),
    filters: {
      query: '',
      sessionType: null,
      track: null,
      theme: null,
      date: null,
      isRecorded: null,
      viewMode: 'all',
      language: null,
    },
    languages: defaultLanguages(),
  }),
  computed: {
    enabledFilters(): unknown[] {
      return ALL_FILTERS.map((k) =>
        args[k] ? k.replace(/Filter$/, '') : undefined,
      ).filter((v) => Boolean(v));
    },
    jsonFilters(this: any): unknown {
      return JSON.stringify(this.filters, null, 2);
    },
  },
  template: `
    <div>
      <ScheduleFilters
        :schedule="schedule"
        :filters="filters"
        :enabled-filters="enabledFilters"
        :language-options="languages"
      />
      <hr>
      <pre v-html="jsonFilters" />
    </div>
  `,
});

export const Default = {
  render: Template,
  args: {
    queryFilter: true,
    sessionTypeFilter: true,
    trackFilter: true,
    themeFilter: true,
    dateFilter: true,
    isRecordedFilter: true,
    viewModeFilter: true,
    languageFilter: true,
  },
};
