import { Meta, Story } from '@storybook/vue';
import ScheduleBlock from './ScheduleBlock.vue';
import {
  createSession,
  defaultSpeakers,
  dates,
  defaultSessionTypes
} from '@/story-utils';

export default {
  title: 'Schedule/ScheduleBlock',
  component: ScheduleBlock
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { ScheduleBlock },
  props: ['currentDate', 'sessionSlot'],
  data: () => ({
    sessions: [
      createSession('1', 'Topical Session Alpha', 'plenary', ['1', '2', '3']),
      createSession('2', 'Incredible Session Beta', 'workshop', [
        '4',
        '5',
        '6'
      ]),
      createSession('3', 'Random Session Charlie', 'workshop', ['7', '6'])
    ],
    speakers: defaultSpeakers(),
    sessionTypes: defaultSessionTypes()
  }),
  template: `
    <ScheduleBlock
      :sessions="sessions"
      :session-types="sessionTypes"
      :session-slot="sessionSlot"
      :speakers="speakers"
      :current-date="currentDate"
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
  }
};

export const Mobile = Template.bind({});
Mobile.args = Default.args;
Mobile.parameters = {
  viewport: { defaultViewport: 'mobile2' },
  layout: 'fullscreen'
};

export const Present = Template.bind({});
Present.args = {
  currentDate: dates.now,
  sessionSlot: {
    id: '1',
    start: dates.addMinutes(dates.now, -15),
    end: dates.addMinutes(dates.now, 15)
  }
};
