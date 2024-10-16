import { Meta } from '@storybook/vue3';
import InterestSection from './InterestSection.vue';

export default {
  title: 'Session/InterestSection',
  component: InterestSection,
} as Meta;

const Template = (args: unknown) => ({
  components: { InterestSection },
  setup: () => args,
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

export const Default = {
  render: Template,
  args: {},
};
