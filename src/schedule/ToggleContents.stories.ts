import { Meta } from '@storybook/vue3';
import ToggleContents from './ToggleContents.vue';
import { Content } from '../story-lib/module';

export default {
  title: 'Schedule/ToggleContents',
  component: ToggleContents,
} as Meta;

const Template = (args: unknown) => ({
  components: { ToggleContents, Content },
  props: ['title', 'showButton', 'hideButton', 'forceOpen'],
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

export const Desktop = Template.bind({});
Desktop.args = {
  title: '5 things',
  showButton: 'Show',
  hideButton: 'Hide',
  forceOpen: false,
};
Desktop.parameters = {
  controls: {
    exclude: ['default'],
  },
};

export const Mobile = Template.bind({});
Mobile.args = {
  title: '5 things',
  showButton: 'Show',
  hideButton: 'Hide',
  forceOpen: false,
};
Mobile.parameters = {
  viewport: { defaultViewport: 'mobile2' },
  controls: {
    exclude: ['default'],
  },
};

export const Opened = Template.bind({});
Opened.args = {
  ...Desktop.args,
  forceOpen: true,
};
Opened.parameters = {
  controls: {
    exclude: ['default'],
  },
};
