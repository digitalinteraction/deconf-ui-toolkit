import { Meta, Story } from '@storybook/vue';
import SessionHeader from './SessionHeader.vue';

export default {
  title: 'Core/SessionHeader',
  component: SessionHeader
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { SessionHeader },
  props: [
    'iconGroup',
    'iconName',
    'title',
    'showType',
    'showTrack',
    'showThemes'
  ],
  computed: {
    sessionType() {
      if (!this.showType) return null;
      return {
        id: 'plenary',
        iconGroup: this.iconGroup,
        iconName: this.iconName,
        layout: 'plenary',
        title: { en: this.title }
      };
    },
    track() {
      if (!this.showTrack) return null;
      return { id: 'space', title: { en: 'Space' } };
    },
    themes() {
      if (!this.showThemes) return null;
      return [
        { id: 'oss', title: { en: 'Open Source Software' } },
        { id: 'oss', title: { en: 'Open Source Software' } }
      ];
    }
  },
  template: `
    <SessionHeader
      :session-type="sessionType" :track="track" :themes="themes"
    />
  `
});

export const Default = Template.bind({});
Default.args = {
  iconGroup: 'fab',
  iconName: 'youtube',
  title: 'Plenary',
  showType: true,
  showTrack: true,
  showThemes: true
};
