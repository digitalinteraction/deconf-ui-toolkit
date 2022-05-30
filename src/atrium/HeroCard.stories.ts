import { Meta, Story } from '@storybook/vue';
import HeroCard from './HeroCard.vue';

export default {
  title: 'Atrium/HeroCard',
  component: HeroCard,
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { HeroCard },
  props: ['title', 'subtitle', 'coverImage'],
  template: `
    <HeroCard
      :title="title"
      :subtitle="subtitle"
      :coverImage="coverImage"
    />
  `,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Virtual Climate Summit 2020',
  subtitle: 'Sept 9, 12:00PM – Sept 10 19:00PM CEST',
  coverImage: '/atrium.jpg',
};
