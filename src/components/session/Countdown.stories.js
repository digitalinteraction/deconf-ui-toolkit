import Countdown from './Countdown.vue';
import { createTemplate, dates } from '@/utils';

export default {
  title: 'Session/Countdown',
  component: Countdown
};

const Template = createTemplate({ Countdown });

export const Default = Template.bind({});
Default.args = {
  currentDate: dates.now,
  targetDate: dates.addMinutes(dates.now, 133, 42)
};
Default.parameters = {
  viewport: { defaultViewport: 'mobile2' }
};
