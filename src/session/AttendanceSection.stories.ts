import { Meta } from '@storybook/vue3';
import { mockSession } from '../story-lib/schedule';
import AttendanceSection from './AttendanceSection.vue';

export default {
  title: 'Session/AttendanceSection',
  component: AttendanceSection,
} as Meta;

const Template = (args: unknown) => ({
  components: { AttendanceSection },
  props: ['sessionCap', 'attendance', 'isProcessing'],
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

export const Default = Template.bind({});
Default.args = {
  sessionCap: 30,
  attendance: {
    isAttending: false,
    attendance: {},
    sessionCount: 12,
  },
};
Default.parameters = {
  viewport: { defaultViewport: 'mobile2' },
};

export const IsFull = Template.bind({});
IsFull.args = {
  sessionCap: 30,
  attendance: {
    isAttending: false,
    attendance: {},
    sessionCount: 30,
  },
};
IsFull.parameters = {
  viewport: { defaultViewport: 'mobile2' },
};

export const Attending = Template.bind({});
Attending.args = {
  sessionCap: 30,
  attendance: {
    isAttending: true,
    attendance: {},
    sessionCount: 12,
  },
};
Attending.parameters = {
  viewport: { defaultViewport: 'mobile2' },
};

export const Loading = Template.bind({});
Loading.args = {
  sessionCap: 30,
  attendance: null,
};
Loading.parameters = {
  viewport: { defaultViewport: 'mobile2' },
};

export const Processing = Template.bind({});
Processing.args = {
  sessionCap: 30,
  attendance: {
    isAttending: true,
    attendance: {},
    sessionCount: 12,
  },
  isProcessing: true,
};
Processing.parameters = {
  viewport: { defaultViewport: 'mobile2' },
};
