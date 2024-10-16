import { Meta } from '@storybook/vue3';
import { BrandA } from '../story-lib/module';
import ApiError from './ApiError.vue';

export default {
  title: 'Core/ApiError',
  component: ApiError,
} as Meta;

const Template = (args: unknown) => ({
  components: { ApiError, BrandA },
  setup: () => args,
  data: () => ({
    homeRoute: { name: 'HomeRoute' },
  }),
  template: `
    <ApiError :home-route="homeRoute">
      <BrandA slot="brand" />
      <p class="footer" slot="footer">This is a footer</p>
    </ApiError>
  `,
});

export const Default = {
  render: Template,
  args: {},
};
