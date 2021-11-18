import { Meta, Story } from '@storybook/vue';
import { Content } from '../story-lib/module';
import FullScreenDialog from './FullScreenDialog.vue';

export default {
  title: 'Core/FullScreenDialog',
  component: FullScreenDialog,
  argTypes: {
    onClose: {
      action: 'clicked'
    }
  }
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { FullScreenDialog, Content },
  props: ['open', 'onClose'],
  template: `
    <div>
      <FullScreenDialog @close="onClose" v-if="open">
        <div class="content">
          <h1> This is a title </h1>
          <Content />
        </div>
      </FullScreenDialog>
      <div class="container content">
        <h1> This is in the background </h1>
        <Content :size="20" />
      </div>
    </div>
  `
});

export const Default = Template.bind({});
Default.args = {
  open: true
};
Default.parameters = {};
