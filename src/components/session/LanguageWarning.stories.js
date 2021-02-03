import LanguageWarning from './LanguageWarning.vue';

export default {
  title: 'Session/LanguageWarning',
  component: LanguageWarning
};

const Template = (args, { argTypes }) => ({
  components: { LanguageWarning },
  props: ['availableLanguages'],
  template: `
    <LanguageWarning :available-languages="availableLanguages" />
  `
});

export const Default = Template.bind({});
Default.args = {
  availableLanguages: ['EN', 'FR']
};
