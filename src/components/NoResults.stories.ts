import { Meta, Story } from '@storybook/vue';
import NoResults from './NoResults.vue';

export default {
  title: 'Component/NoResults',
  component: NoResults
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { NoResults },
  template: `
    <NoResults>
      There are no results
    </NoResults>
  `
});

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  controls: {
    exclude: ['default']
  }
};
