import { Meta, Story } from '@storybook/vue'
import PageFooter from './PageFooter.vue'

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
} as Meta

const Template: Story = (args, { argTypes }) => ({
  props: ['beforeLinks'],
  components: { PageFooter },
  data() {
    return {
      links: [
        { title: 'About', url: '/about' },
        { title: 'Terms', url: '/terms' },
        { title: 'Privacy', url: '/privacy' },
      ],
    }
  },
  template: `
    <PageFooter :links="links">
    <template slot="beforeLinks" v-if="beforeLinks">
      Text before the links
    </template>
      Made by
      <a href="https://openlab.ncl.ac.uk">Open Lab</a>
      /
      Open Lab
      v1.2.3
    </PageFooter>
  `,
})

export const Default = Template.bind({})
Default.args = {
  beforeLinks: false,
}
