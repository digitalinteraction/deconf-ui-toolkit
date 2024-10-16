import { Meta } from '@storybook/vue3';
import PageFooter from './PageFooter.vue';

export default {
  title: 'Core/PageFooter',
  component: PageFooter,
  argTypes: {
    beforeLinks: {
      control: {
        type: 'select',
        options: [true, false],
      },
    },
  },
} as Meta;

const Template = (args: unknown) => ({
  components: { PageFooter },
  setup: () => args,
  data() {
    return {
      links: [
        { title: 'About', url: '/about' },
        { title: 'Terms', url: '/terms' },
        { title: 'Privacy', url: '/privacy' },
      ],
    };
  },
  template: `
    <PageFooter :links="links">
      <template v-slot:beforeLinks v-if="prefix">
        Text before the links
      </template>
      
      Made by
      <a href="https://openlab.ncl.ac.uk">Open Lab</a>
      /
      Open Lab
      v1.2.3
    </PageFooter>
  `,
});

export const Default = {
  render: Template,
  args: {
    prefix: false,
  },
};
