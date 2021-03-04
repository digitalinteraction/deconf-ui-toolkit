import { Meta, Story } from '@storybook/vue';
import ScheduleBlock from './ScheduleBlock.vue';
import {
  createSession,
  defaultSpeakers,
  dates,
  defaultSessionTypes,
  defaultTracks,
  createSchedule,
  createSessionFromSchedule
} from '@/story-utils';
import { ScheduleConfig, ScheduleRecord } from '@/types';

export default {
  title: 'Schedule/ScheduleBlock',
  component: ScheduleBlock
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { ScheduleBlock },
  props: ['currentDate', 'sessionSlot', 'showOthers', 'toCreate'],
  data: () => ({
    schedule: createSchedule(),
    config: {
      tileHeader: ['type'],
      tileAttributes: ['languages', 'recorded', 'themes', 'type']
    } as ScheduleConfig
  }),
  computed: {
    sessions() {
      return (this.toCreate as string[]).map((type, index) => ({
        ...createSessionFromSchedule(this.schedule as ScheduleRecord),
        id: index.toString(),
        type: type
      }));
    }
  },
  template: `
    <ScheduleBlock
      :sessions="sessions"
      :session-slot="sessionSlot"
      :schedule="schedule"
      :config="config"
      :current-date="currentDate"
      :show-other-sessions="showOthers"
    />
  `
});

const baseArgs = {
  sessionSlot: {
    id: '1',
    start: dates.addMinutes(dates.now, -15),
    end: dates.addMinutes(dates.now, 15)
  },
  toCreate: ['plenary', 'workshop', 'workshop'],
  showOthers: false
};

export const Future = Template.bind({});
Future.args = {
  ...baseArgs,
  currentDate: dates.past
};

export const FutureMobile = Template.bind({});
FutureMobile.args = Future.args;
FutureMobile.parameters = {
  viewport: { defaultViewport: 'mobile2' },
  layout: 'fullscreen'
};

export const Present = Template.bind({});
Present.args = {
  ...baseArgs,
  currentDate: dates.now
};

export const PresentMobile = Template.bind({});
PresentMobile.args = Present.args;
PresentMobile.parameters = FutureMobile.parameters;

export const Past = Template.bind({});
Past.args = {
  ...baseArgs,
  currentDate: dates.future
};

export const NoWorkshops = Template.bind({});
NoWorkshops.args = {
  ...baseArgs,
  currentDate: dates.past,
  toCreate: ['plenary']
};

export const OpenOthers = Template.bind({});
OpenOthers.args = {
  ...baseArgs,
  currentDate: dates.past,
  showOthers: true
};
