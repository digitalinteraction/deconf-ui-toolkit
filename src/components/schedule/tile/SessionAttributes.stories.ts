import { Meta, Story } from '@storybook/vue';
import SessionAttributes from './SessionAttributes.vue';

export default {
  title: 'Schedule/SessionAttributes',
  component: SessionAttributes
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { SessionAttributes },
  props: ['languages', 'isRecorded', 'highlight'],
  data: () => ({
    track: { id: 1, title: { en: 'AI and Agriculture' } }
  }),
  template: `
    <SessionAttributes
      :languages="languages"
      :is-recorded="isRecorded"
      :track="track"
      :highlight="highlight"
    />
  `
});

export const Default = Template.bind({});
Default.args = {
  languages: ['en', 'fr', 'es', 'ar'],
  isRecorded: true,
  highlight: ['locale']
};
