import { Meta } from '@storybook/vue3';
import InterestSection from './InterestSection.vue';

export default {
  title: 'Session/InterestSection',
  component: InterestSection,
} as Meta;

const Template = (args: unknown) => ({
  components: { InterestSection },
  props: ['attendance', 'isProcessing'],
  data: () => ({ attending: false }),
  template: `
    <InterestSection
      :attendance="{ isAttending: attending }"
      :is-processing="isProcessing"
      @attend="attending = true"
      @unattend="attending = false"
    />
  `,
});

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  viewport: { defaultViewport: 'mobile2' },
};
