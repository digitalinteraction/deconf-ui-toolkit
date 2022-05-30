import { Meta, Story } from '@storybook/vue';
import FullScreenDialog from './FullScreenDialog.vue';
import { mockSpeaker } from '../story-lib/schedule';
import SpeakerDialog from './SpeakerDialog.vue';

export default {
  title: 'Core/SpeakerDialog',
  component: SpeakerDialog,
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  props: ['speaker'],
  components: { SpeakerDialog, FullScreenDialog },
  template: `
    <FullScreenDialog>
      <SpeakerDialog :speaker="speaker" />
    </FullScreenDialog>
  `,
});

export const Default = Template.bind({});
Default.args = {
  speaker: mockSpeaker({
    name: 'Geoff Testington',
    role: { en: 'Chief Technical Officer' },
  }),
};
Default.parameters = {};
