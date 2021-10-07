import { Meta, Story } from '@storybook/vue';
import { createSchedule, defaultLanguages } from '../../../story-lib/module';
import ScheduleFilters from './ScheduleFilters.vue';

export default {
  title: 'Schedule/ScheduleFilters',
  component: ScheduleFilters
} as Meta;

const ALL_FILTERS = [
  'queryFilter',
  'sessionTypeFilter',
  'trackFilter',
  'themeFilter',
  'dateFilter',
  'isRecordedFilter',
  'languageFilter'
];

const Template: Story = (args, { argTypes }) => ({
  components: { ScheduleFilters },
  props: [...ALL_FILTERS],
  data: () => ({
    schedule: createSchedule(),
    filters: {
      query: '',
      sessionType: null,
      track: null,
      theme: null,
      date: null,
      isRecorded: null,
      viewMode: 'all',
      language: null
    },
    languages: defaultLanguages()
  }),
  computed: {
    enabledFilters(): unknown[] {
      return ALL_FILTERS.map(k =>
        this[k] ? k.replace(/Filter$/, '') : undefined
      ).filter(v => Boolean(v));
    },
    jsonFilters(): unknown {
      return JSON.stringify(this.filters, null, 2);
    }
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
  `
});

export const Default = Template.bind({});
Default.args = {
  queryFilter: true,
  sessionTypeFilter: true,
  trackFilter: true,
  themeFilter: true,
  dateFilter: true,
  isRecordedFilter: true,
  viewModeFilter: true,
  languageFilter: true
};
Default.parameters = {};
