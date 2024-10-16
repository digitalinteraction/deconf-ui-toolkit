import { fn } from '@storybook/test';
import { Meta } from '@storybook/vue3';
import { Content } from '../story-lib/module';
import FullScreenDialog from './FullScreenDialog.vue';

export default {
  title: 'Core/FullScreenDialog',
  component: FullScreenDialog,

  argTypes: {
    size: {
      control: 'select',
      options: ['regular', 'size'],
    },
  },
} as Meta;

const Template = (args: unknown) => ({
  components: { FullScreenDialog, Content },
  setup: () => args,
  template: `
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
  `,
});

export const Default = {
  render: Template,
  args: {
    open: true,
    size: 'regular',
    onClose: fn(),
  },
  parameters: {
    layout: 'fullscreen',
  },
};
