import { Meta } from '@storybook/vue3';
import ScheduleHeader from './ScheduleHeader.vue';

export default {
  title: 'Schedule/ScheduleHeader',
  component: ScheduleHeader,
} as Meta;

const Template = (args: unknown) => ({
  setup: () => args,
  components: { ScheduleHeader },
  template: `
    <ScheduleHeader :class="classes">
      Lorem ipsum sil dor amet
    </ScheduleHeader>
  `,
});

export const Primary = {
  render: Template,
  args: {
    classes: 'is-primary',
  },
};

export const Dark = {
  render: Template,
  args: {
    classes: 'is-dark',
  },
};
