import { Meta } from '@storybook/vue3';
import NoResults from './NoResults.vue';

export default {
  title: 'Schedule/NoResults',
  component: NoResults,
} as Meta;

const Template = (args: unknown) => ({
  components: { NoResults },
  template: `
    <NoResults>
      There are no results
    </NoResults>
  `,
});

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  controls: {
    exclude: ['default'],
  },
};
