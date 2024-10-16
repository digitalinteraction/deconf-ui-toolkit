import { Meta } from '@storybook/vue3';
import LanguageWarning from './LanguageWarning.vue';

export default {
  title: 'Session/LanguageWarning',
  component: LanguageWarning,
} as Meta;

const Template = (args: unknown) => ({
  components: { LanguageWarning },
  setup: () => args,
  template: `
    <LanguageWarning :available-languages="availableLanguages" />
  `,
});

export const Default = {
  render: Template,
  args: {
    availableLanguages: ['EN', 'FR'],
  },
};
