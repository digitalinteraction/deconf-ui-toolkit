import { Meta, Story } from '@storybook/vue';
import ApiError from './ApiError.vue';

export default {
  title: 'App/ApiError',
  component: ApiError
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { ApiError },
  data: () => ({
    homeRoute: { name: 'HomeRoute' }
  }),
  template: `
    <ApiError :home-route="homeRoute">
      <img slot="brand" src="/brand.svg">
      <p class="footer" slot="footer">This is a footer</p>
    </ApiError>
  `
});

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  layout: 'fullscreen',
  controls: {
    exclude: ['homeRoute', 'retry', 'brand', 'footer']
  }
};
