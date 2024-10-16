import { Meta } from '@storybook/vue3';
import SessionHeader from './SessionHeader.vue';

export default {
  title: 'Core/Session/SessionHeader',
  component: SessionHeader,
} as Meta;

const Template = (args: any) => ({
  components: { SessionHeader },
  setup: () => args,
  computed: {
    sessionType() {
      if (!args.showType) return null;
      return {
        id: 'plenary',
        iconGroup: args.iconGroup,
        iconName: args.iconName,
        layout: 'plenary',
        title: { en: args.title },
      };
    },
    track() {
      if (!args.showTrack) return null;
      return { id: 'space', title: { en: 'Space' } };
    },
    themes() {
      if (!args.showThemes) return null;
      return [
        { id: 'oss', title: { en: 'Open Source Software' } },
        { id: 'oss', title: { en: 'Open Source Software' } },
      ];
    },
  },
  template: `
    <SessionHeader
      :session-type="sessionType" :track="track" :themes="themes"
    />
  `,
});

export const Default = {
  render: Template,
  args: {
    iconGroup: 'fab',
    iconName: 'youtube',
    title: 'Plenary',
    showType: true,
    showTrack: true,
    showThemes: true,
  },
  parameters: {},
};
