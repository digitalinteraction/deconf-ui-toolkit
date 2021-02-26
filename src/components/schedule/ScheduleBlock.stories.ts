import { Meta, Story } from '@storybook/vue';
import ScheduleBlock from './ScheduleBlock.vue';
import {
  createSession,
  defaultSpeakers,
  dates,
  defaultSessionTypes,
  defaultTracks
} from '@/story-utils';
import { Desktop } from '../ToggleContents.stories';

export default {
  title: 'Schedule/ScheduleBlock',
  component: ScheduleBlock
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { ScheduleBlock },
  props: ['sessions', 'currentDate', 'sessionSlot', 'showOthers'],
  data: () => ({
    speakers: defaultSpeakers(),
    sessionTypes: defaultSessionTypes(),
    tracks: defaultTracks()
  }),
  template: `
    <ScheduleBlock
      :sessions="sessions"
      :session-types="sessionTypes"
      :session-slot="sessionSlot"
      :speakers="speakers"
      :current-date="currentDate"
      :tracks="tracks"
      :show-other-sessions="showOthers"
    />
  `
});

export const Default = Template.bind({});
Default.args = {
  currentDate: dates.now,
  sessionSlot: {
    id: '1',
    start: dates.addMinutes(dates.past, 0),
    end: dates.addMinutes(dates.past, 30)
  },
  sessions: [
    createSession('1', 'Topical Session Alpha', 'plenary', ['1', '2', '3']),
    createSession('2', 'Incredible Session Beta', 'workshop', ['4', '5', '6']),
    createSession('3', 'Random Session Charlie', 'workshop', ['7', '6'])
  ],
  showOthers: false
};

export const Mobile = Template.bind({});
Mobile.args = Default.args;
Mobile.parameters = {
  viewport: { defaultViewport: 'mobile2' },
  layout: 'fullscreen'
};

export const Present = Template.bind({});
Present.args = {
  ...Default.args,
  currentDate: dates.now,
  sessionSlot: {
    id: '1',
    start: dates.addMinutes(dates.now, 0),
    end: dates.addMinutes(dates.now, 30)
  }
};

export const Future = Template.bind({});
Future.args = {
  ...Default.args,
  currentDate: dates.now,
  sessionSlot: {
    id: '1',
    start: dates.addMinutes(dates.future, -30),
    end: dates.addMinutes(dates.future, 0)
  }
};

export const NoWorkshops = Template.bind({});
NoWorkshops.args = {
  ...Default.args,
  sessions: [
    createSession('1', 'Topical Session Alpha', 'plenary', ['1', '2', '3'])
  ]
};

export const OpenOthers = Template.bind({});
OpenOthers.args = {
  ...Default.args,
  showOthers: true
};
