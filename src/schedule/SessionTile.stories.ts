import { Meta, Story } from '@storybook/vue';
import SessionTile from './SessionTile.vue';
import { createSchedule, randomSession } from '../story-lib/module';
import { ScheduleConfig } from '../lib/module';

export default {
  title: 'Schedule/SessionTile',
  component: SessionTile
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { SessionTile },
  props: [
    'slotState',
    'sessionSlot',
    'readonly',
    'headerType',
    'headerTrack',
    'headerThemes',
    'attrLangs',
    'attrRecorded',
    'attrTrack',
    'attrThemes',
    'attrOrganisation'
  ],
  data() {
    const schedule = createSchedule();
    const session = randomSession(schedule, {});
    return { schedule, session };
  },
  computed: {
    config(): ScheduleConfig {
      const config: ScheduleConfig = { tileHeader: [], tileAttributes: [] };

      if (this.headerType) config.tileHeader.push('type');
      if (this.headerTrack) config.tileHeader.push('track');
      if (this.headerThemes) config.tileHeader.push('themes');

      if (this.attrLangs) config.tileAttributes.push('languages');
      if (this.attrRecorded) config.tileAttributes.push('recorded');
      if (this.attrTrack) config.tileAttributes.push('track');
      if (this.attrThemes) config.tileAttributes.push('themes');
      if (this.attrOrganisation) config.tileAttributes.push('organisation');

      return config;
    }
  },
  template: `
    <SessionTile
      :session="session"
      :schedule="schedule"
      :config="config"
      :slot-state="slotState"
      :readonly="readonly"
    />
  `
});

const baseArgs = {
  readonly: true,
  headerType: true,
  headerTrack: true,
  headerThemes: false,
  attrLangs: true,
  attrRecorded: true,
  attrTrack: false,
  attrThemes: true,
  attrOrganisation: true
};

export const Future = Template.bind({});
Future.args = {
  ...baseArgs,
  slotState: 'future'
};

export const Soon = Template.bind({});
Soon.args = {
  ...baseArgs,
  slotState: 'soon'
};

export const Present = Template.bind({});
Present.args = {
  ...baseArgs,
  slotState: 'present'
};

export const Past = Template.bind({});
Past.args = {
  ...baseArgs,
  slotState: 'past'
};
