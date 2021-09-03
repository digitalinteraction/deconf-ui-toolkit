import { Meta, Story } from '@storybook/vue';
import SessionAttributes from './SessionAttributes.vue';

export default {
  title: 'Schedule/SessionAttributes',
  component: SessionAttributes,
  argTypes: {
    isRecorded: {
      control: { type: 'boolean' }
    }
  }
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { SessionAttributes },
  props: ['languages', 'isRecorded'],
  data: () => ({
    track: { id: 1, title: { en: 'AI and Agriculture' } },
    themes: [
      { id: '1', title: { en: 'OSS' } },
      { id: '2', title: { en: 'Microservices' } }
    ]
  }),
  template: `
    <SessionAttributes
      :languages="languages"
      :is-recorded="isRecorded"
      :track="track"
      :themes="themes"
    />
  `
});

export const Default = Template.bind({});
Default.args = {
  languages: ['en', 'fr', 'es', 'ar'],
  isRecorded: true
};
Default.parameters = {};
