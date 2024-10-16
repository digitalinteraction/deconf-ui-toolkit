import { Meta } from '@storybook/vue3';
import AddToCalendarDialog from './AddToCalendarDialog.vue';
import FullScreenDialog from '../FullScreenDialog.vue';
import { mockSession } from '../../story-lib/schedule';

export default {
  title: 'Core/Session/AddToCalendarDialog',
  component: AddToCalendarDialog,
} as Meta;

const Template = (args: unknown) => ({
  components: { AddToCalendarDialog, FullScreenDialog },
  setup: () => args,
  template: `
    <FullScreenDialog size="small">
      <AddToCalendarDialog :session="session" />
    </FullScreenDialog>
  `,
});

export const Default = {
  render: Template,
  args: {
    session: mockSession(),
  },
  parameters: {},
};
