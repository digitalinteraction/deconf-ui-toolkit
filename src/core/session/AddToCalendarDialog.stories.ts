import { Meta, Story } from '@storybook/vue';
import AddToCalendarDialog from './AddToCalendarDialog.vue';
import FullScreenDialog from '../FullScreenDialog.vue';
import { mockSession, mockSessionSlot } from '../../story-lib/schedule';
import { dates } from '../../story-lib/dates';

export default {
  title: 'Core/AddToCalendarDialog',
  component: AddToCalendarDialog
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { AddToCalendarDialog, FullScreenDialog },
  props: Object.keys(argTypes),
  template: `
    <FullScreenDialog size="small">
      <AddToCalendarDialog v-bind="$props" />
    </FullScreenDialog>
  `
});

export const Default = Template.bind({});
Default.args = {
  session: mockSession(),
  sessionSlot: mockSessionSlot({
    start: dates.addMinutes(dates.now, 15),
    end: dates.addMinutes(dates.now, 45)
  })
};
Default.parameters = {};
