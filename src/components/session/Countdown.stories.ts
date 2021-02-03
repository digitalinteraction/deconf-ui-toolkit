import { Meta, Story } from '@storybook/vue';
import Countdown from './Countdown.vue';
import { dates } from '@/story-utils';

export default {
  title: 'Session/Countdown',
  component: Countdown
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { Countdown },
  props: ['currentDate', 'targetDate'],
  template: `
    <div style="max-width: 420px">
      <Countdown
        :current-date="currentDate"
        :target-date="targetDate"
      />
    </div>
  `
});

export const Hours = Template.bind({});
Hours.args = {
  currentDate: dates.now,
  targetDate: dates.addMinutes(dates.now, 133, 42)
};

export const Minutes = Template.bind({});
Minutes.args = {
  currentDate: dates.now,
  targetDate: dates.addMinutes(dates.now, 13, 42)
};

export const Seconds = Template.bind({});
Seconds.args = {
  currentDate: dates.now,
  targetDate: dates.addMinutes(dates.now, 0, 42)
};
