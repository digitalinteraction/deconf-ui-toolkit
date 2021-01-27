import ScheduleBlock from './ScheduleBlock.vue';
import {
  createTemplate,
  createSession,
  defaultSpeakers,
  dates,
  defaultSessionTypes
} from '@/utils';

export default {
  title: 'Schedule/ScheduleBlock',
  component: ScheduleBlock
};

const Template = createTemplate({ ScheduleBlock });

const baseArgs = {
  sessions: [
    createSession('1', 'Topical Session Alpha', 'plenary', ['1', '2', '3']),
    createSession('2', 'Incredible Session Beta', 'workshop', ['4', '5', '6']),
    createSession('3', 'Random Session Charlie', 'workshop', ['7', '6'])
  ],
  speakers: defaultSpeakers(),
  sessionTypes: defaultSessionTypes()
};

export const Default = Template.bind({});
Default.args = {
  ...baseArgs,
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
  viewport: { defaultViewport: 'mobile2' }
};

export const Present = Template.bind({});
Present.args = {
  ...baseArgs,
  currentDate: dates.now,
  sessionSlot: {
    id: '1',
    start: dates.addMinutes(dates.now, -15),
    end: dates.addMinutes(dates.now, 15)
  }
};
