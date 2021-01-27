import SessionTile from './SessionTile.vue';
import { createTemplate, defaultSpeakers, dates, createSession } from '@/utils';

export default {
  title: 'Schedule/SessionTile',
  component: SessionTile
};

const Template = createTemplate({ SessionTile });

const baseArgs = {
  session: createSession('1234', 'Lorem ipsum sil dor amet', 'plenary', [
    '1',
    '3',
    '5',
    '7'
  ]),
  sessionType: {
    id: 'plenary',
    iconGroup: 'fab',
    iconName: 'youtube',
    layout: 'plenary',
    title: {
      en: 'Plenary'
    }
  },
  speakers: defaultSpeakers()
};

export const Future = Template.bind({});
Future.args = {
  ...baseArgs,
  currentDate: dates.now,
  sessionSlot: {
    id: '1',
    start: dates.addMinutes(dates.future, -30),
    end: dates.addMinutes(dates.future, 0)
  }
};

export const Soon = Template.bind({});
Soon.args = {
  ...baseArgs,
  currentDate: dates.now,
  sessionSlot: {
    id: '1',
    start: dates.addMinutes(dates.now, 15),
    end: dates.addMinutes(dates.now, 45)
  }
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

export const Past = Template.bind({});
Past.args = {
  ...baseArgs,
  currentDate: dates.now,
  sessionSlot: {
    id: '1',
    start: dates.addMinutes(dates.past, 0),
    end: dates.addMinutes(dates.past, 30)
  }
};
