import { Meta } from '@storybook/vue3';
import ColorWidget from './ColorWidget.vue';

export default {
  title: 'Atrium/ColorWidget',
  component: 'ColorWidget',
} as Meta;

const Template = (args: unknown) => ({
  components: { ColorWidget },
  setup: () => args,
  template: `
    <ColorWidget
      :kind="kind"
      :title="title"
      :subtitle="subtitle"
      :icon="icon"
      :href="href"
    />
  `,
});

export const Primary = {
  args: {
    kind: 'primary',
    title: 'Hello, world!',
    subtitle: 'Now for something completely different',
    icon: ['fas', 'user-friends'],
    href: null,
  },
  render: Template,
};

export const Secondary = {
  args: {
    kind: 'secondary',
    title: 'Hello, world!',
    subtitle: 'Now for something completely different',
    icon: ['fas', 'terminal'],
    href: null,
  },
  render: Template,
};

export const Twitter = {
  args: {
    kind: 'twitter',
    title: 'Hello, world!',
    subtitle: 'Now for something completely different',
    icon: ['fab', 'twitter'],
    href: 'https://duck.com',
  },
  render: Template,
};

export const Custom = {
  args: {
    kind: 'custom',
    title: 'Hello, world!',
    subtitle: 'Now for something completely different',
    icon: ['fas', 'apple-alt'],
    href: 'https://duck.com',
  },
  render: Template,
};

export const List = {
  args: {},
  render: () => ({
    components: { ColorWidget },
    template: `
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
    `,
  }),
};
