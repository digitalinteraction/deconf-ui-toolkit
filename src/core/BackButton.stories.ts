import { Meta, Story } from '@storybook/vue';
import BackButton from './BackButton.vue';

export default {
  title: 'Core/BackButton',
  component: BackButton,
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { BackButton },
  props: ['text'],
  template: `
    <BackButton to="/">{{ text }}</BackButton>
  `,
});

export const Default = Template.bind({});
Default.args = {
  text: 'Go home',
};
Default.parameters = {
  controls: {
    exclude: ['to', 'default'],
  },
};
