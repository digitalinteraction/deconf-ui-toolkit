import HeroCard from './HeroCard.vue';
import { createTemplate } from '@/utils';

export default {
  title: 'Atrium/HeroCard',
  component: HeroCard
};

const Template = createTemplate({ HeroCard });

export const Default = Template.bind({});
Default.args = {
  title: 'Virtual Climate Summit 2020',
  subtitle: 'Sept 9, 12:00PM – Sept 10 19:00PM CEST',
  coverImage: '/atrium.jpg'
};
