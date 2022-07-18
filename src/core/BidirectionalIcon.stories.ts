import { Meta, Story } from '@storybook/vue';
import BidirectionalIcon from './BidirectionalIcon.vue';

export default {
  title: 'Core/BidirectionalIcon',
  component: BidirectionalIcon,
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { BidirectionalIcon },
  template: `
    <p>
      <BidirectionalIcon
        :ltr="['fas', 'arrow-right']"
        :rtl="['fas', 'arrow-left']"
      />
      <br>
      <button class="button is-small is-text" @click="toggleDir">Toggle HTML direction</button>
    </p>
  `,
  methods: {
    toggleDir() {
      document.dir = document.dir === 'rtl' ? 'ltr' : 'rtl';
    },
  },
  destroyed() {
    document.dir = 'ltr';
  },
});

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {};
