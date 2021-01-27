import SessionAttributes from './SessionAttributes.vue';
import { createTemplate } from '@/utils';

export default {
  title: 'Schedule/SessionAttributes',
  component: SessionAttributes
};

const Template = createTemplate({ SessionAttributes });

export const Default = Template.bind({});
Default.args = {
  languages: ['en', 'fr', 'es', 'ar'],
  isRecorded: true
};
