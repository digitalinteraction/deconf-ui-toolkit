import { Meta } from '@storybook/vue3';
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

const Template = (args: unknown) => ({
  components: { SessionLayout, BackButton, SessionState, Content },
  setup: () => args,
  template: `
    <SessionLayout>
      <template v-slot:backButton>
        <BackButton to="/">Back to Atrium</BackButton>
      </template>
      
      <template v-slot:state>
        <SessionState :slot-state="slotState" :attendance="attendance" />
      </template>

      <template v-slot:main>
        <div class="content">
          <Content />
        </div>
      </template>

      <template v-slot:sidebar>
        <Content :size="1" />
      </template>

      <template v-slot:backButton>
      </template>
    </SessionLayout>
  `,
});

export const Default = {
  render: Template,
  args: {
    slotState: 'future',
    attendance: 123,
  },
};
