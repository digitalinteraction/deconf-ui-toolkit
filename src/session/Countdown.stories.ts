import { Meta } from '@storybook/vue3';
import Countdown from './Countdown.vue';
import { dates } from '../story-lib/module';

export default {
  title: 'Session/Countdown',
  component: Countdown,
} as Meta;

const Template = (args: unknown) => ({
  components: { Countdown },
  setup: () => args,
  template: `
    <div style="max-width: 420px">
      <Countdown
        :current-date="currentDate"
        :target-date="targetDate"
      />
    </div>
  `,
});

export const Hours = {
  render: Template,
  args: {
    currentDate: dates.now,
    targetDate: dates.addMinutes(dates.now, 133, 42),
  },
};

export const Minutes = {
  render: Template,
  args: {
    currentDate: dates.now,
    targetDate: dates.addMinutes(dates.now, 13, 42),
  },
};

export const Seconds = {
  render: Template,
  args: {
    currentDate: dates.now,
    targetDate: dates.addMinutes(dates.now, 0, 42),
  },
};
