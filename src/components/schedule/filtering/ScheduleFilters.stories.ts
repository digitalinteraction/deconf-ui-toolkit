import { Meta, Story } from '@storybook/vue3'
import {
  dates,
  defaultSessionTypes,
  defaultThemes,
  defaultTracks,
  mockSessionSlot,
} from '../../../story-lib/module'
import ScheduleFilters from './ScheduleFilters.vue'

export default {
  title: 'Schedule/ScheduleFilters',
  component: ScheduleFilters,
} as Meta

const ALL_FILTERS = [
  'queryFilter',
  'sessionTypeFilter',
  'trackFilter',
  'themeFilter',
  'dateFilter',
  'isRecordedFilter',
]

const Template: Story = (args, { argTypes }) => ({
  components: { ScheduleFilters },
  props: [...ALL_FILTERS],
  data: () => ({
    sessionTypes: defaultSessionTypes(),
    tracks: defaultTracks(),
    themes: defaultThemes(),
    sessionSlots: [
      mockSessionSlot({ start: dates.addMinutes(dates.now, 0) }),
      mockSessionSlot({ start: dates.addMinutes(dates.now, 24 * 60) }),
      mockSessionSlot({ start: dates.addMinutes(dates.now, 48 * 60) }),
    ],
    filters: {
      query: '',
      sessionType: null,
      track: null,
      theme: null,
      date: null,
      isRecorded: null,
      viewMode: 'all',
    },
  }),
  computed: {
    enabledFilters(): unknown[] {
      return ALL_FILTERS.map((k) =>
        this[k] ? k.replace(/Filter$/, '') : undefined
      ).filter((v) => Boolean(v))
    },
  },
  template: `
    <ScheduleFilters
      :session-types="sessionTypes"
      :tracks="tracks"
      :themes="themes"
      :session-slots="sessionSlots"
      :filters="filters"
      :enabled-filters="enabledFilters"
    />
  `,
})

export const Default = Template.bind({})
Default.args = {
  queryFilter: true,
  sessionTypeFilter: true,
  trackFilter: true,
  themeFilter: true,
  dateFilter: true,
  isRecordedFilter: true,
  viewModeFilter: true,
}
Default.parameters = {}
