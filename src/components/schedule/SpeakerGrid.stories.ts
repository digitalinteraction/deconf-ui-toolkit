import { Meta, Story } from '@storybook/vue';
import SpeakerGrid from './SpeakerGrid.vue';
import { defaultSpeakers } from '../../story-lib/module';

export default {
  title: 'Schedule/SpeakerGrid',
  component: SpeakerGrid
} as Meta;

/**
 * A utility to slice/repeat an array upto a count using modulo logic
 * and ensuring unique ids
 */
function moduloSlice<T>(array: T[], count: number) {
  const output = [];
  for (let i = 0; i < count; i++) {
    output.push({
      ...array[i % array.length],
      id: i.toString()
    });
  }
  return output;
}

const Template: Story = (args, { argTypes }) => ({
  components: { SpeakerGrid },
  props: ['speakerCount'],
  computed: {
    speakers() {
      return moduloSlice(defaultSpeakers(), this.speakerCount as number);
    }
  },
  template: `
    <SpeakerGrid :speakers="speakers" />
  `
});

export const Desktop = Template.bind({});
Desktop.args = {
  speakerCount: 10
};

export const Mobile = Template.bind({});
Mobile.args = {
  speakerCount: 10
};
Mobile.parameters = {
  viewport: { defaultViewport: 'mobile1' }
};
