import SpeakerGrid from './SpeakerGrid.vue';
import { createTemplate, defaultSpeakers } from '@/utils';

export default {
  title: 'Schedule/SpeakerGrid',
  component: SpeakerGrid
};

const Template = createTemplate({ SpeakerGrid });

export const Desktop = Template.bind({});
Desktop.args = {
  speakers: defaultSpeakers()
};

export const Mobile = Template.bind({});
Mobile.args = {
  speakers: defaultSpeakers()
};
Mobile.parameters = {
  viewport: { defaultViewport: 'mobile1' }
};
