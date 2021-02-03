import SessionAttributes from './SessionAttributes.vue';

export default {
  title: 'Schedule/SessionAttributes',
  component: SessionAttributes
};

const Template = (args, { argTypes }) => ({
  components: { SessionAttributes },
  props: ['languages', 'isRecorded'],
  template: `
    <SessionAttributes
      :languages="languages"
      :is-recorded="isRecorded"
    />
  `
});

export const Default = Template.bind({});
Default.args = {
  languages: ['en', 'fr', 'es', 'ar'],
  isRecorded: true
};
