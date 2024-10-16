import { Meta } from '@storybook/vue3';
import TimeSlot from './TimeSlot.vue';
import { dates } from '../story-lib/module';

export default {
  title: 'Core/TimeSlot',
  component: TimeSlot,
} as Meta;

const Template = (args: unknown) => ({
  components: { TimeSlot },
  setup: () => args,
  template: `
    <TimeSlot
      :slot-state="slotState"
      :start-date="startDate"
      :end-date="endDate"
    />
  `,
});

export const Past = {
  render: Template,
  args: {
    slotState: 'past',
    startDate: dates.addMinutes(dates.past, 0),
    endDate: dates.addMinutes(dates.past, 30),
  },
};

export const Present = {
  render: Template,
  args: {
    slotState: 'present',
    startDate: dates.addMinutes(dates.now, -15),
    endDate: dates.addMinutes(dates.now, 15),
  },
};

export const Future = {
  render: Template,
  args: {
    slotState: 'future',
    startDate: dates.addMinutes(dates.future, 0),
    endDate: dates.addMinutes(dates.future, 30),
  },
};

export const MultiDay = {
  render: Template,
  args: {
    slotState: 'present',
    startDate: dates.addMinutes(dates.now, 0),
    endDate: dates.addMinutes(dates.now, 7 * 24 * 60),
  },
};
