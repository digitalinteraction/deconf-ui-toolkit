import SessionHeader from './SessionHeader.vue';
import { createTemplate } from '@/utils';

export default {
  title: 'Schedule/SessionHeader',
  component: SessionHeader
};

const Template = createTemplate({ SessionHeader });

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
