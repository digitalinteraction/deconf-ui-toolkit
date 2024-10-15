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

const bio = `
**Eius non** _consectetur aliquam_ pariatur aut. Vero earum reiciendis et debitis itaque est doloremque excepturi. Odit voluptatem aliquid eos voluptate. Sequi sit assumenda rem et. Id inventore ipsa deleniti [rem qui](https://example.com).

#### Quisquam esse

Sed assumenda. Nihil aut occaecati dolor qui voluptatibus fugit omnis quo. Inventore ut explicabo officiis necessitatibus qui vel ratione nihil.
`;

export const Default = Template.bind({});
Default.args = {
  speaker: mockSpeaker({
    name: 'Geoff Testington',
    role: { en: 'Chief Technical Officer' },
    bio: { en: bio },
  }),
};
Default.parameters = {};
