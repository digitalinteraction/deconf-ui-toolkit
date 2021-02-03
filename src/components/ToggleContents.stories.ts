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
  props: ['title', 'showButton', 'hideButton'],
  template: `
    <ToggleContents
      :title="title"
      :show-button="showButton"
      :hide-button="hideButton"
    >
      <Content />
    </ToggleContents>
  `
});

export const Desktop = Template.bind({});
Desktop.args = {
  title: 'Some awesome hidden content',
  showButton: 'Show me now!',
  hideButton: 'Take it away'
};

export const Mobile = Template.bind({});
Mobile.args = {
  title: 'Some awesome hidden content',
  showButton: 'Show me now!',
  hideButton: 'Take it away'
};
Mobile.parameters = {
  viewport: { defaultViewport: 'mobile2' }
};
