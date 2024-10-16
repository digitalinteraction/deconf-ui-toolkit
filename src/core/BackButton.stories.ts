import { Meta } from '@storybook/vue3';
import BackButton from './BackButton.vue';

export default {
  title: 'Core/BackButton',
  component: BackButton,
} as Meta;

const Template = (args: unknown) => ({
  components: { BackButton },
  setup: () => args,
  template: `
    <BackButton to="/">{{ text }}</BackButton>
  `,
});

export const Default = {
  render: Template,
  args: {
    text: 'Go home',
  },
};
