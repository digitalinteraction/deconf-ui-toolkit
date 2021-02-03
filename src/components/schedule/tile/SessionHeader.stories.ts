import { Meta, Story } from '@storybook/vue';
import SessionHeader from './SessionHeader.vue';

export default {
  title: 'Schedule/SessionHeader',
  component: SessionHeader
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { SessionHeader },
  props: ['iconGroup', 'iconName', 'title'],
  computed: {
    sessionType() {
      return {
        id: 'plenary',
        iconGroup: this.iconGroup,
        iconName: this.iconName,
        layout: 'plenary',
        title: { en: this.title }
      };
    }
  },
  template: `
    <SessionHeader
      :session-type="sessionType"
    />
  `
});

export const Default = Template.bind({});
Default.args = {
  iconGroup: 'fab',
  iconName: 'youtube',
  title: 'Plenary'
};
