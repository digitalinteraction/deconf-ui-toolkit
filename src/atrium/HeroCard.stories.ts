import { Meta } from '@storybook/vue3';
import HeroCard from './HeroCard.vue';

export default {
  title: 'Atrium/HeroCard',
  component: HeroCard,
} as Meta;

const Template = (args: unknown) => ({
  components: { HeroCard },
  setup: () => args,
  template: `
    <HeroCard
      :title="title"
      :subtitle="subtitle"
      :coverImage="coverImage"
    />
  `,
});

export const Default = {
  args: {
    title: 'Virtual Climate Summit 2020',
    subtitle: 'Sept 9, 12:00PM - Sept 10 19:00PM CEST',
    coverImage: '/static/atrium.jpg',
  },
  render: Template,
};
