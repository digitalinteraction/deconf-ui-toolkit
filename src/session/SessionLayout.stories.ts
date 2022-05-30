import { Meta, Story } from '@storybook/vue';
import { Content } from '../story-lib/module';
import { BackButton } from '../core/module';

import SessionLayout from './SessionLayout.vue';
import SessionState from './SessionState.vue';

export default {
  title: 'Session/SessionLayout',
  component: SessionLayout,
  argTypes: {
    slotState: {
      control: {
        type: 'select',
        options: ['future', 'soon', 'past', 'present'],
      },
    },
  },
} as Meta;

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
        <Content :size="1" />
      </div>
    </SessionLayout>
  `,
});

export const Default = Template.bind({});
Default.args = {
  slotState: 'future',
  attendance: 123,
};
Default.parameters = {
  layout: 'fullscreen',
};

export const Mobile = Template.bind({});
Mobile.args = {
  slotState: 'future',
  attendance: 123,
};
Mobile.parameters = {
  layout: 'fullscreen',
  viewport: { defaultViewport: 'mobile2' },
};
