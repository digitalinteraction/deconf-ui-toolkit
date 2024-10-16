import { Meta } from '@storybook/vue3';
import SessionTile from './SessionTile.vue';
import { createSchedule, randomSession } from '../story-lib/module';
import { ScheduleConfig } from '../lib/module';

export default {
  title: 'Schedule/SessionTile',
  component: SessionTile,
} as Meta;

const Template = (args: any) => ({
  components: { SessionTile },
  setup: () => args,
  data() {
    const schedule = createSchedule();
    const session = randomSession(schedule, {});
    return { schedule, session };
  },
  computed: {
    config(): ScheduleConfig {
      const config: ScheduleConfig = {
        tileHeader: [],
        tileAttributes: [],
        tileActions: [],
      };

      if (args.headerType) config.tileHeader.push('type');
      if (args.headerTrack) config.tileHeader.push('track');
      if (args.headerThemes) config.tileHeader.push('themes');

      if (args.attrLangs) config.tileAttributes.push('languages');
      if (args.attrRecorded) config.tileAttributes.push('recorded');
      if (args.attrTrack) config.tileAttributes.push('track');
      if (args.attrThemes) config.tileAttributes.push('themes');
      if (args.attrOrganisation) config.tileAttributes.push('organisation');

      if (args.actionJoin) config.tileActions?.push('join');
      if (args.actionCalendar) config.tileActions?.push('addToCalendar');
      if (args.actionMySchedule) config.tileActions?.push('addToMySchedule');

      return config;
    },
  },
  template: `
    <SessionTile
      :session="session"
      :schedule="schedule"
      :config="config"
      :slot-state="slotState"
      :readonly="readonly"
    />
  `,
});

const baseArgs = {
  readonly: false,
  headerType: true,
  headerTrack: true,
  headerThemes: false,
  attrLangs: true,
  attrRecorded: true,
  attrTrack: false,
  attrThemes: true,
  attrOrganisation: true,
  actionJoin: true,
  actionCalendar: true,
  actionMySchedule: true,
};

export const Future = {
  render: Template,
  args: { ...baseArgs, slotState: 'future' },
};

export const Soon = {
  render: Template,
  args: { ...baseArgs, slotState: 'soon' },
};

export const Present = {
  render: Template,
  args: { ...baseArgs, slotState: 'present' },
};

export const Past = {
  render: Template,
  args: { ...baseArgs, slotState: 'past' },
};
