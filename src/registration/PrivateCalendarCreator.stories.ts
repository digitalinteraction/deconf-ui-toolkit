import { Meta } from '@storybook/vue3';
import PrivateCalendarCreator from './PrivateCalendarCreator.vue';

export default {
  title: 'Registration/PrivateCalendarCreator',
  component: PrivateCalendarCreator,
} as Meta;

const Template = (args: unknown) => ({
  components: { PrivateCalendarCreator },
  setup: () => args,
  template: `
    <PrivateCalendarCreator api-module="api" />
  `,
});

export const Default = {
  render: Template,
  args: {},
  parameters: {},
};
