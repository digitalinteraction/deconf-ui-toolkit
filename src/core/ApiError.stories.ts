import { Meta, Story } from '@storybook/vue'
import { BrandA } from '../story-lib/module'
import ApiError from './ApiError.vue'

export default {
  title: 'Core/ApiError',
  component: ApiError,
} as Meta

const Template: Story = (args, { argTypes }) => ({
  components: { ApiError, BrandA },
  data: () => ({
    homeRoute: { name: 'HomeRoute' },
  }),
  template: `
    <ApiError :home-route="homeRoute">
      <BrandA slot="brand" />
      <p class="footer" slot="footer">This is a footer</p>
    </ApiError>
  `,
})

export const Default = Template.bind({})
Default.args = {}
Default.parameters = {
  layout: 'fullscreen',
  controls: {
    exclude: ['homeRoute', 'retry', 'brand', 'footer'],
  },
}
