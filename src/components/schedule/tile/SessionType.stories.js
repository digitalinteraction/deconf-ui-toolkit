import SessionType from './SessionType.vue';
import { createTemplate } from '@/utils';

export default {
  title: 'Schedule/SessionType',
  component: SessionType
};

const Template = createTemplate({ SessionType });

export const Default = Template.bind({});
Default.args = {
  sessionType: {
    id: 'plenary',
    iconGroup: 'fab',
    iconName: 'youtube',
    layout: 'plenary',
    title: {
      en: 'Plenary'
    }
  }
};
