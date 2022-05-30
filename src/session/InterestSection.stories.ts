import { Meta, Story } from '@storybook/vue';
import InterestSection from './InterestSection.vue';

export default {
  title: 'Session/InterestSection',
  component: InterestSection,
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { InterestSection },
  props: ['attendance', 'isProcessing'],
  template: `
    <InterestSection
      :attendance="attendance"
      :is-processing="isProcessing"
    />
  `,
});

export const Default = Template.bind({});
Default.args = {
  attendance: {
    isAttending: false,
    attendance: {},
    sessionCount: 12,
  },
};
Default.parameters = {
  viewport: { defaultViewport: 'mobile2' },
};

export const Interested = Template.bind({});
Interested.args = {
  sessionCap: 30,
  attendance: {
    isAttending: true,
    attendance: {},
    sessionCount: 12,
  },
};
Interested.parameters = {
  viewport: { defaultViewport: 'mobile2' },
};
