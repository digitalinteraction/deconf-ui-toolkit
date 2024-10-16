import { Meta } from '@storybook/vue3';
import ScheduleBlock from './ScheduleBlock.vue';
import { dates, createSchedule, randomSession } from '../story-lib/module';
import { ScheduleConfig } from '../lib/module';
import { Session } from '@openlab/deconf-shared';

export default {
  title: 'Schedule/ScheduleBlock',
  component: ScheduleBlock,
} as Meta;

const Template = (args: any) => ({
  components: { ScheduleBlock },
  setup: () => args,
  data: () => ({
    schedule: createSchedule(),
    config: {
      tileHeader: ['type'],
      tileAttributes: ['languages', 'recorded', 'themes', 'type'],
    } as ScheduleConfig,
  }),
  computed: {
    sessions(): Session[] {
      return (args.toCreate as string[]).map((type, index) => ({
        ...randomSession((this as any).schedule),
        id: index.toString(),
        type: type,
      }));
    },
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
  `,
});

export const Future = {
  render: Template,
  args: {
    sessionSlot: {
      id: '1',
      start: dates.addMinutes(dates.now, -15),
      end: dates.addMinutes(dates.now, 15),
    },
    toCreate: ['plenary', 'workshop', 'workshop'],
    showOthers: false,
    currentDate: dates.past,
  },
};

export const Present = {
  render: Template,
  args: {
    sessionSlot: {
      id: '1',
      start: dates.addMinutes(dates.now, -15),
      end: dates.addMinutes(dates.now, 15),
    },
    toCreate: ['plenary', 'workshop', 'workshop'],
    showOthers: false,
    currentDate: dates.now,
  },
};

export const Past = {
  render: Template,
  args: {
    sessionSlot: {
      id: '1',
      start: dates.addMinutes(dates.now, -15),
      end: dates.addMinutes(dates.now, 15),
    },
    toCreate: ['plenary', 'workshop', 'workshop'],
    showOthers: false,
    currentDate: dates.future,
  },
};

export const NoWorkshops = {
  render: Template,
  args: {
    sessionSlot: {
      id: '1',
      start: dates.addMinutes(dates.now, -15),
      end: dates.addMinutes(dates.now, 15),
    },
    showOthers: false,
    currentDate: dates.past,
    toCreate: ['plenary'],
  },
};
