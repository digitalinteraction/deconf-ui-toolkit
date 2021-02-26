import { Meta, Story } from '@storybook/vue';
import ToggleContents from './ToggleContents.vue';
import { createContent } from '@/story-utils';

export default {
  title: 'Component/ToggleContents',
  component: ToggleContents
} as Meta;

const Content = createContent();

const Template: Story = (args, { argTypes }) => ({
  components: { ToggleContents, Content },
  props: ['title', 'showButton', 'hideButton', 'forceOpen'],
  template: `
    <ToggleContents
      :title="title"
      :show-button="showButton"
      :hide-button="hideButton"
      :force-open="forceOpen"
    >
      <Content />
    </ToggleContents>
  `
});

export const Desktop = Template.bind({});
Desktop.args = {
  title: '5 things',
  showButton: 'Show',
  hideButton: 'Hide',
  forceOpen: false
};

export const Mobile = Template.bind({});
Mobile.args = {
  title: '5 things',
  showButton: 'Show',
  hideButton: 'Hide',
  forceOpen: false
};
Mobile.parameters = {
  viewport: { defaultViewport: 'mobile2' }
};

export const Opened = Template.bind({});
Opened.args = {
  ...Desktop.args,
  forceOpen: true
};
