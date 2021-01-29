import LanguageWarning from './LanguageWarning.vue';
import { createTemplate } from '@/utils';

export default {
  title: 'Session/LanguageWarning',
  component: LanguageWarning
};

const Template = createTemplate({ LanguageWarning });

export const Default = Template.bind({});
Default.args = {
  availableLanguages: ['EN', 'FR']
};
