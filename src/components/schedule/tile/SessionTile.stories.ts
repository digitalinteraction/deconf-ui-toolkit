import { Meta, Story } from '@storybook/vue';
import SessionTile from './SessionTile.vue';
import { defaultSpeakers, dates, createSession } from '@/story-utils';

export default {
  title: 'Schedule/SessionTile',
  component: SessionTile
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { SessionTile },
  props: ['currentDate', 'sessionSlot'],
  data: () => ({
    session: createSession('1234', 'Lorem ipsum sil dor amet', 'plenary', [
      '1',
      '3',
      '5',
      '7'
    ]),
    speakers: defaultSpeakers(),
    sessionType: {
      id: 'plenary',
      iconGroup: 'fab',
      iconName: 'youtube',
      layout: 'plenary',
      title: {
        en: 'Plenary'
      }
    }
  }),
  template: `
    <SessionTile
      :session="session"
      :session-type="sessionType"
      :session-slot="sessionSlot"
      :speakers="speakers"
      :current-date="currentDate"
    />
  `
});

export const Future = Template.bind({});
Future.args = {
  currentDate: dates.now,
  sessionSlot: {
    id: '1',
    start: dates.addMinutes(dates.future, -30),
    end: dates.addMinutes(dates.future, 0)
  }
};

export const Soon = Template.bind({});
Soon.args = {
  currentDate: dates.now,
  sessionSlot: {
    id: '1',
    start: dates.addMinutes(dates.now, 15),
    end: dates.addMinutes(dates.now, 45)
  }
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

export const Past = Template.bind({});
Past.args = {
  currentDate: dates.now,
  sessionSlot: {
    id: '1',
    start: dates.addMinutes(dates.past, 0),
    end: dates.addMinutes(dates.past, 30)
  }
};
