import { Meta } from '@storybook/vue3';
import AppLoading from './AppLoading.vue';

export default {
  title: 'Core/AppLoading',
  component: AppLoading,
} as Meta;

const Template = (args: unknown) => ({
  components: { AppLoading },
  setup: () => args,
  template: `
    <AppLoading />
  `,
});

export const Default = {
  render: Template,
  args: {},
  parameters: { layout: 'fullscreen' },
};
