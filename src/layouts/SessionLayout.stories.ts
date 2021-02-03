import { Meta, Story } from '@storybook/vue';
import SessionLayout from './SessionLayout.vue';
import BackButton from '@/components/BackButton.vue';
import SessionState from '@/components/session/SessionState.vue';
import { createContent } from '@/story-utils';

export default {
  title: 'Layout/SessionLayout',
  component: SessionLayout,
  argTypes: {
    slotState: {
      control: {
        type: 'select',
        options: ['future', 'soon', 'past', 'present']
      }
    }
  }
} as Meta;

const Content = createContent();

const Template: Story = (args, { argTypes }) => ({
  components: { SessionLayout, BackButton, SessionState, Content },
  props: ['slotState', 'attendance'],
  template: `
    <SessionLayout>
      <BackButton slot="backButton" to="/">Back to Atrium</BackButton>
      <SessionState slot="state" :slot-state="slotState" :attendance="attendance" />
      <div slot="main" class="content">
        <Content />
      </div>
      <div slot="sidebar">
        <Content />
      </div>
    </SessionLayout>
  `
});

export const Default = Template.bind({});
Default.args = {
  slotState: 'future',
  attendance: 123
};
Default.parameters = {
  layout: 'fullscreen'
};

export const Mobile = Template.bind({});
Mobile.args = {
  slotState: 'future',
  attendance: 123
};
Mobile.parameters = {
  layout: 'fullscreen',
  viewport: { defaultViewport: 'mobile2' }
};
