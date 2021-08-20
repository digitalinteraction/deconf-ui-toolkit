import { Meta, Story } from '@storybook/vue';
import Stack from './Stack.vue';

export default {
  title: 'Component/Stack',
  component: Stack,
  argTypes: {
    direction: {
      control: {
        type: 'select',
        options: ['horizontal', 'vertical']
      }
    },
    gap: {
      control: {
        type: 'select',
        options: ['none', 'small', 'regular', 'medium', 'large']
      }
    },
    align: {
      control: {
        type: 'select',
        options: ['start', 'end', 'center', 'stretch']
      }
    }
  }
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { Stack },
  props: ['direction', 'gap', 'align'],
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
  `
});

export const Vertical = Template.bind({});
Vertical.args = {
  direction: 'vertical',
  gap: 'regular',
  align: 'center'
};
Vertical.parameters = {};

export const Horizontal = Template.bind({});
Horizontal.args = {
  direction: 'horizontal',
  gap: 'regular',
  align: 'center'
};
Horizontal.parameters = {};
