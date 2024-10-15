import { Story } from '@storybook/vue'
import TimeSlot from './TimeSlot.vue'
import { dates } from '../story-lib/module'

export default {
  title: 'Core/TimeSlot',
  component: TimeSlot,
}

const Template: Story = (args, { argTypes }) => ({
  components: { TimeSlot },
  props: ['slotState', 'startDate', 'endDate'],
  template: `
    <TimeSlot
      :slot-state="slotState"
      :start-date="startDate"
      :end-date="endDate"
    />
  `,
})

export const Past = Template.bind({})
Past.args = {
  slotState: 'past',
  startDate: dates.addMinutes(dates.past, 0),
  endDate: dates.addMinutes(dates.past, 30),
}

export const Present = Template.bind({})
Present.args = {
  slotState: 'present',
  startDate: dates.addMinutes(dates.now, -15),
  endDate: dates.addMinutes(dates.now, 15),
}

export const Future = Template.bind({})
Future.args = {
  slotState: 'future',
  startDate: dates.addMinutes(dates.future, 0),
  endDate: dates.addMinutes(dates.future, 30),
}

export const MultiDay = Template.bind({})
MultiDay.args = {
  slotState: 'present',
  startDate: dates.addMinutes(dates.now, 0),
  endDate: dates.addMinutes(dates.now, 7 * 24 * 60),
}
