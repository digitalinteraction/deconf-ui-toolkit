import { Meta, Story } from '@storybook/vue';
import { dates, mockSession, mockSessionSlot } from '../../story-lib/module';
import FeaturedSessions from './FeaturedSessions.vue';

export default {
  title: 'Atrium/FeaturedSessions',
  component: FeaturedSessions
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { FeaturedSessions },
  data: () => ({
    currentDate: dates.now,
    featured: [
      {
        session: mockSession(),
        slot: mockSessionSlot({
          start: dates.addMinutes(dates.now, -15),
          end: dates.addMinutes(dates.now, 15)
        })
      },
      {
        session: mockSession(),
        slot: mockSessionSlot({ start: dates.addMinutes(dates.now, 91) })
      },
      {
        session: mockSession(),
        slot: mockSessionSlot({ start: dates.addMinutes(dates.now, 291) })
      }
    ]
  }),
  template: `
    <FeaturedSessions
      :featured="featured"
      :current-date="currentDate"
    />
  `
});

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  layout: 'fullscreen',
  viewport: { defaultViewport: 'mobile2' }
};
