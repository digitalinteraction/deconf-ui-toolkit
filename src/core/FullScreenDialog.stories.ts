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
  props: Object.keys(argTypes),
  template: `
    <div>
      <FullScreenDialog @close="onClose" v-if="open" :size="size">
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

export const Desktop = Template.bind({});
Desktop.args = {
  open: true
};
Desktop.parameters = {};

export const DesktopSmall = Template.bind({});
DesktopSmall.args = {
  ...Desktop.args,
  size: 'small'
};
DesktopSmall.parameters = {};

export const Mobile = Template.bind({});
Mobile.args = {
  open: true
};
Mobile.parameters = {
  viewport: { defaultViewport: 'mobile2' }
};
