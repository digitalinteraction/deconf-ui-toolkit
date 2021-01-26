import SideTabs from './SideTabs.vue';
import { createTemplate } from '../utils/template';

import AtriumIcon from '@/icons/AtriumIcon.vue';
import WhatsOnIcon from '@/icons/WhatsOnIcon.vue';
import ScheduleIcon from '@/icons/ScheduleIcon.vue';
import CoffeeChatIcon from '@/icons/CoffeeChatIcon.vue';
import HelpDeskIcon from '@/icons/HelpDeskIcon.vue';

export default {
  title: 'Layout/SideTabs',
  component: SideTabs
};

const Template = createTemplate({ SideTabs });

export const Default = Template.bind({});
Default.args = {
  routes: [
    {
      name: 'A',
      title: 'Atrium',
      enabled: true,
      icon: AtriumIcon,
      active: true
    },
    {
      name: 'B',
      title: "What's on",
      enabled: true,
      icon: WhatsOnIcon,
      active: false
    },
    {
      name: 'C',
      title: 'Schedule',
      enabled: true,
      icon: ScheduleIcon,
      active: false
    },
    {
      name: 'D',
      title: 'CoffeeChat',
      enabled: false,
      icon: CoffeeChatIcon,
      active: false
    },
    {
      name: 'E',
      title: 'HelpDesk',
      enabled: false,
      icon: HelpDeskIcon,
      active: false
    }
  ]
};
