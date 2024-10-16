import { Meta } from '@storybook/vue3';
import { mockSession } from '../story-lib/schedule';
import AttendanceSection from './AttendanceSection.vue';

export default {
  title: 'Session/AttendanceSection',
  component: AttendanceSection,
} as Meta;

const Template = (args: unknown) => ({
  components: { AttendanceSection },
  setup: () => args,
  data: () => ({
    session: mockSession(),
  }),
  template: `
    <AttendanceSection
      :session="session"
      :session-cap="sessionCap"
      :attendance="attendance"
      :is-processing="isProcessing"
    />
  `,
});

export const Default = {
  render: Template,
  args: {
    sessionCap: 30,
    attendance: {
      isAttending: false,
      attendance: {},
      sessionCount: 12,
    },
    isProcessing: false,
  },
};

export const Full = {
  render: Template,
  args: {
    sessionCap: 30,
    attendance: {
      isAttending: false,
      attendance: {},
      sessionCount: 30,
    },
    isProcessing: false,
  },
};

export const Attending = {
  render: Template,
  args: {
    sessionCap: 30,
    attendance: {
      isAttending: true,
      attendance: {},
      sessionCount: 12,
    },
    isProcessing: false,
  },
};

export const Loading = {
  render: Template,
  args: {
    sessionCap: 30,
    attendance: null,
    isProcessing: false,
  },
};

export const Processing = {
  render: Template,
  args: {
    sessionCap: 30,
    attendance: {
      isAttending: true,
      attendance: {},
      sessionCount: 12,
    },
    isProcessing: true,
  },
};
