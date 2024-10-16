import { Meta } from '@storybook/vue3';
import ToggleContents from './ToggleContents.vue';
import { Content } from '../story-lib/module';

export default {
  title: 'Schedule/ToggleContents',
  component: ToggleContents,
} as Meta;

const Template = (args: unknown) => ({
  components: { ToggleContents, Content },
  setup: () => args,
  template: `
    <ToggleContents
      :title="title"
      :show-button="showButton"
      :hide-button="hideButton"
      :force-open="forceOpen"
    >
      <Content class="content" />
    </ToggleContents>
  `,
});

export const Default = {
  render: Template,
  args: {
    title: '5 things',
    showButton: 'Show',
    hideButton: 'Hide',
    forceOpen: false,
  },
};

export const Opened = {
  render: Template,
  args: {
    title: '5 things',
    showButton: 'Show',
    hideButton: 'Hide',
    forceOpen: true,
  },
};
