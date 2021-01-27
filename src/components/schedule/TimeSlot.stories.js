import TimeSlot from './TimeSlot.vue';
import { createTemplate } from '@/utils';

export default {
  title: 'Schedule/TimeSlot',
  component: TimeSlot
};

function addMinutes(original, minutes) {
  const date = new Date(original);
  date.setMinutes(date.getMinutes() + minutes);
  return date;
}

const now = new Date();
const past = new Date('1970-01-01T00:00:00.000Z');
const future = new Date('2100-01-01T00:00:00.000Z');

const Template = createTemplate({ TimeSlot });

export const Past = Template.bind({});
Past.args = {
  currentDate: now,
  startDate: addMinutes(past, 0),
  endDate: addMinutes(past, 30)
};

export const Present = Template.bind({});
Present.args = {
  currentDate: now,
  startDate: addMinutes(now, -15),
  endDate: addMinutes(now, 15)
};

export const Future = Template.bind({});
Future.args = {
  currentDate: now,
  startDate: addMinutes(future, 0),
  endDate: addMinutes(future, 30)
};
