import { Meta, Story } from '@storybook/vue';
import LoginView from './LoginView.vue';
import { BrandA } from '../story-lib/module';
import { UtilLayout, BackButton } from '../core/module';

export default {
  title: 'Registration/LoginView',
  component: LoginView,
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { LoginView, UtilLayout, BrandA, BackButton },

  template: `
    <UtilLayout home-route="/">
      <BrandA slot="brand" />
      <BackButton to="/" slot="backButton">Go Back</BackButton>
      <LoginView
        slot="main"
        api-module="api"
      >
        <p slot="infoText">Use this form to log in</p>
        <p slot="doneText">Log in email sent!</p>
      </LoginView>
    </UtilLayout>
  `,
});

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  layout: 'fullscreen',
  // actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    exclude: ['initialState', 'infoText', 'doneText'],
  },
};
