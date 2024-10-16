import { Meta } from '@storybook/vue3';
import FullHeight from './FullHeight.vue';

export default {
  title: 'Core/FullHeight',
  component: FullHeight,
} as Meta;

const Template = (args: unknown) => ({
  components: { FullHeight },
  setup: () => args,
  template: `
    <FullHeight>
      <div style="width: 100%; height: 100%; background-image: linear-gradient(white, black); position: absolute;">
      </div>
    </FullHeight>
  `,
});

export const Default = {
  render: Template,
  args: {},
  parameters: {
    layout: 'fullscreen',
  },
};
