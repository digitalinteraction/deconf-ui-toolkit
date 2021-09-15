import { Meta, Story } from '@storybook/vue3'
import ColorWidget from './ColorWidget.vue'

export default {
  title: 'Atrium/ColorWidget',
  component: 'ColorWidget',
} as Meta

const Template: Story = (args, { argTypes }) => ({
  components: { ColorWidget },
  props: ['kind', 'title', 'subtitle', 'icon', 'href'],
  template: `
    <ColorWidget
      :kind="kind"
      :title="title"
      :subtitle="subtitle"
      :icon="icon"
      :href="href"
    />
  `,
})

export const Primary = Template.bind({})
Primary.args = {
  kind: 'primary',
  title: 'Hello, world!',
  subtitle: 'Now for something completely different',
  icon: ['fas', 'user-friends'],
  href: null,
}

export const Secondary = Template.bind({})
Secondary.args = {
  ...Primary.args,
  kind: 'secondary',
  icon: ['fas', 'terminal'],
}

export const Twitter = Template.bind({})
Twitter.args = {
  ...Primary.args,
  kind: 'twitter',
  icon: ['fab', 'twitter'],
  href: 'https://duck.com',
}

export const Custom = Template.bind({})
Custom.args = {
  ...Primary.args,
  kind: 'custom',
  icon: ['fas', 'apple-alt'],
}

export const List = () => ({
  components: { ColorWidget },
  template: `
    <div>
      <ColorWidget
        kind="primary"
        title="Widget A"
        :icon="['fas', 'user-friends']"
        subtitle="Some long and less-interesting title"
      />
      <ColorWidget
        kind="secondary"
        title="Widget B"
        :icon="['fas', 'terminal']"
        subtitle="Some long and less-interesting title"
      />
      <ColorWidget
        kind="twitter"
        title="Widget C"
        :icon="['fab', 'twitter']"
        subtitle="Some long and less-interesting title"
        href="https://duck.com"
      />
    </div>
  `,
})
