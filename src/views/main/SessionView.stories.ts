import { Meta, Story } from '@storybook/vue3'
import { BackButton } from '../../components/module'
import {
  createSchedule,
  dates,
  MockAppLayout,
  randomSession,
} from '../../story-lib/module'
import SessionView from './SessionView.vue'

export default {
  title: 'View/SessionView',
  component: SessionView,
} as Meta

const Template: Story = (args, { argTypes }) => ({
  components: { SessionView, MockAppLayout, BackButton },
  props: ['loggedIn', 'scheduleDate'],
  data() {
    const schedule = createSchedule()
    const session = randomSession(schedule, {
      slot: 'slot-b',
      participantCap: 50,
    })
    return { schedule, session }
  },
  template: `
    <MockAppLayout>
      <SessionView
        api-module="api"
        :session="session"
        :schedule="schedule"
        :logged-in="loggedIn"
        :schedule-date="scheduleDate"
      >
        <BackButton slot="backButton" to="/">Go back</BackButton>
      </SessionView>
    </MockAppLayout>
  `,
})

export const Future = Template.bind({})
Future.args = {
  loggedIn: true,
  scheduleDate: dates.past,
}
Future.parameters = {
  layout: 'fullscreen',
}

export const Countdown = Template.bind({})
Countdown.args = {
  loggedIn: true,
  scheduleDate: dates.addMinutes(dates.now, -46, -23),
}
Countdown.parameters = {
  layout: 'fullscreen',
}

export const Soon = Template.bind({})
Soon.args = {
  loggedIn: true,
  scheduleDate: dates.addMinutes(dates.now, -17, -23),
}
Soon.parameters = {
  layout: 'fullscreen',
}

export const Present = Template.bind({})
Present.args = {
  loggedIn: true,
  scheduleDate: dates.now,
}
Present.parameters = {
  layout: 'fullscreen',
}

export const Past = Template.bind({})
Past.args = {
  loggedIn: true,
  scheduleDate: dates.future,
}
Past.parameters = {
  layout: 'fullscreen',
}
