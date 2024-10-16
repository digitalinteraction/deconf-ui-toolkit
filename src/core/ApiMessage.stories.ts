import { Meta } from '@storybook/vue3';
import ApiMessage from './ApiMessage.vue';

export default {
  title: 'Core/ApiMessage',
  component: ApiMessage,

  argTypes: {
    errorCode: {
      control: 'select',
      options: ['unknown', 'login_expired'],
    },
  },
} as Meta;

const Template = (args: unknown) => ({
  components: { ApiMessage },
  setup: () => args,
  template: `
    <ApiMessage :error-code="errorCode" />
  `,
});

export const Default = {
  render: Template,
  args: {
    errorCode: 'login_expired',
  },
};
