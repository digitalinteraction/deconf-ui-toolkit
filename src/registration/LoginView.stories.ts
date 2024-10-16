import { Meta } from '@storybook/vue3';
import LoginView from './LoginView.vue';
import { BrandA } from '../story-lib/module';
import { UtilLayout, BackButton } from '../core/module';

export default {
  title: 'Registration/LoginView',
  component: LoginView,
} as Meta;

const Template = (args: unknown) => ({
  components: { LoginView, UtilLayout, BrandA, BackButton },
  setup: () => args,
  template: `
    <LoginView api-module="api">
      <template v-slot:infoText>
        <p>Use this form to log in</p>
      </template>
      
      <template v-slot:doneText>
        <p>Log in email sent!</p>
      </template>
      
      <template v-slot:extraOptions>
        <p>More login options here...</p>
      </template>
    </LoginView>
  `,
});

export const Default = {
  render: Template,
  args: {},
  parameters: {},
};
