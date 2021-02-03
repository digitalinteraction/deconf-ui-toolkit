import TimeSlot from './TimeSlot.vue';
import { dates } from '@/utils';

export default {
  title: 'Schedule/TimeSlot',
  component: TimeSlot
};

function addMinutes(original, minutes) {
  const date = new Date(original);
  date.setMinutes(date.getMinutes() + minutes);
  return date;
}

const Template = (args, { argTypes }) => ({
  components: { TimeSlot },
  props: ['currentDate', 'startDate', 'endDate'],
  template: `
    <TimeSlot
      :current-date="currentDate"
      :start-date="startDate"
      :end-date="endDate"
    />
  `
});

export const Past = Template.bind({});
Past.args = {
  currentDate: dates.now,
  startDate: addMinutes(dates.past, 0),
  endDate: addMinutes(dates.past, 30)
};

export const Present = Template.bind({});
Present.args = {
  currentDate: dates.now,
  startDate: addMinutes(dates.now, -15),
  endDate: addMinutes(dates.now, 15)
};

export const Future = Template.bind({});
Future.args = {
  currentDate: dates.now,
  startDate: addMinutes(dates.future, 0),
  endDate: addMinutes(dates.future, 30)
};
