import { Meta } from '@storybook/vue3';
import {
  createSchedule,
  defaultLanguages,
  randomSession,
} from '../story-lib/schedule';
import WhatsOnView from './WhatsOnView.vue';

export default {
  title: 'Schedule/WhatsOnView',
  component: WhatsOnView,
} as Meta;

const Template = (args: unknown) => ({
  components: { WhatsOnView },
  setup: () => args,
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
      ],
      config: {
        tileHeader: ['type', 'track'],
        tileAttributes: ['languages', 'themes', 'recorded'],
      },
      languages: defaultLanguages(),
    };
  },
  template: `
    <WhatsOnView
      :schedule="schedule"
      :sessions="sessions"
      filters-key="whatsOn.filters"
      :config="config"
      slot-state="future"
      :language-options="languages"
    >
      <span slot="title"> What is on </span>
      <p slot="info">Here are the sessions that are going to happen</p>
      <span slot="noResults"> Nothing matched your query 😢 </span>
    </WhatsOnView>
  `,
});

export const Default = {
  render: Template,
};
