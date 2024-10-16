import { Meta } from '@storybook/vue3';
import SpeakerGrid from './SpeakerGrid.vue';
import { defaultSpeakers } from '../story-lib/module';

export default {
  title: 'Core/SpeakerGrid',
  component: SpeakerGrid,
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
      id: i.toString(),
    });
  }
  return output;
}

const Template = (args: any) => ({
  components: { SpeakerGrid },
  setup: () => args,
  computed: {
    speakers() {
      return moduloSlice(defaultSpeakers(), args.speakerCount as number);
    },
  },
  template: `
    <SpeakerGrid :speakers="speakers" />
  `,
});

export const Default = {
  render: Template,
  args: {
    speakerCount: 10,
  },
  parameters: {},
};
