import { Meta } from '@storybook/vue3';
import Stack from './Stack.vue';

export default {
  title: 'Core/Stack',
  component: Stack,
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    gap: {
      control: 'select',
      options: ['none', 'small', 'regular', 'medium', 'large'],
    },
    align: {
      control: 'select',
      options: ['start', 'end', 'center', 'stretch'],
    },
  },
} as Meta;

const Template = (args: unknown) => ({
  components: { Stack },
  setup: () => args,
  template: `
    <Stack
      :direction="direction"
      :gap="gap"
      :align="align"
    >
      <div>
        <div class="notification is-success is-size-4">Block A</div>
      </div>
      <div>
        <div class="notification is-warning is-size-4">Block B</div>
      </div>
      <div>
        <div class="notification is-danger is-size-4">Block C</div>
      </div>
    </Stack>
  `,
});

export const Vertical = {
  render: Template,
  args: {
    direction: 'vertical',
    gap: 'regular',
    align: 'center',
  },
};

export const Horizontal = {
  render: Template,
  args: {
    direction: 'horizontal',
    gap: 'regular',
    align: 'center',
  },
};
