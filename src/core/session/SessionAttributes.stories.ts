import { Meta } from '@storybook/vue3';
import SessionAttributes from './SessionAttributes.vue';

export default {
  title: 'Core/Session/SessionAttributes',
  component: SessionAttributes,
} as Meta;

const Template = (args: unknown) => ({
  components: { SessionAttributes },
  setup: () => args,
  data: () => ({
    track: { id: 1, title: { en: 'AI and Agriculture' } },
    themes: [
      { id: '1', title: { en: 'OSS' } },
      { id: '2', title: { en: 'Microservices' } },
    ],
  }),
  template: `
    <SessionAttributes
      :languages="languages"
      :is-recorded="isRecorded"
      :track="track"
      :themes="themes"
      organisation="AI Encorporated"
    />
  `,
});

export const Default = {
  render: Template,
  args: {
    languages: ['en', 'fr', 'es', 'ar'],
    isRecorded: true,
  },
  parameters: {},
};
