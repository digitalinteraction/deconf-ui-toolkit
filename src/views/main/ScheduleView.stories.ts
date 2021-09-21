import { Meta, Story } from '@storybook/vue';
import {
  createSchedule,
  dates,
  MockAppLayout,
  randomSession
} from '../../story-lib/module';
import ScheduleView from './ScheduleView.vue';

export default {
  title: 'View/ScheduleView',
  component: ScheduleView
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { MockAppLayout, ScheduleView },
  props: ['isDuringConference', 'scheduleDate'],
  data() {
    const schedule = createSchedule();
    return {
      schedule,
      sessions: [
        randomSession(schedule),
        randomSession(schedule),
        randomSession(schedule),
        randomSession(schedule),
        randomSession(schedule),
        randomSession(schedule),
        randomSession(schedule),
        randomSession(schedule),
        randomSession(schedule),
        randomSession(schedule)
      ],
      config: {
        tileHeader: ['type', 'track'],
        tileAttributes: ['languages', 'themes', 'recorded']
      }
    };
  },
  template: `
    <MockAppLayout>
      <ScheduleView
        :schedule="schedule"
        :sessions="sessions"
        filters-key="schedule.filters"
        :config="config"
        :scheduleDate="scheduleDate"
        :is-during-conference="isDuringConference"
      >
        <p slot="infoText">The sessions on at the conference</p>
      </ScheduleView>
    </MockAppLayout>
  `
});

export const Future = Template.bind({});
Future.args = {
  scheduleDate: dates.past,
  isDuringConference: true
};
Future.parameters = {
  layout: 'fullscreen',
  controls: {
    exclude: [
      'schedule',
      'sessions',
      'filtersKey',
      'enabledFilters',
      'infoText',
      'config'
    ]
  }
};

export const Present = Template.bind({});
Present.args = {
  scheduleDate: dates.now,
  isDuringConference: true
};
Present.parameters = {
  ...Future.parameters,
  layout: 'fullscreen'
};

export const Past = Template.bind({});
Past.args = {
  scheduleDate: dates.future,
  isDuringConference: false
};
Past.parameters = {
  ...Future.parameters,
  layout: 'fullscreen'
};
