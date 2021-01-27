import AtriumHero from './AtriumHero.vue';
import { createTemplate } from '@/utils';

export default {
  title: 'Atrium/AtriumHero',
  component: AtriumHero
};

const Template = createTemplate({ AtriumHero });

export const Default = Template.bind({});
Default.args = {
  title: 'Virtual Climate Summit 2020',
  subtitle: 'Sept 9, 12:00PM – Sept 10 19:00PM CEST',
  coverImage: '/atrium.jpg'
};
