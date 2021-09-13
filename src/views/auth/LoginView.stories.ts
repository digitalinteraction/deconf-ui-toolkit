import { Meta, Story } from '@storybook/vue';
import LoginView from './LoginView.vue';
import { BrandA } from '../../story-lib/module';
import { UtilLayout } from '../../layouts/module';
import { BackButton } from '../../components/module';

export default {
  title: 'View/LoginView',
  component: LoginView
} as Meta;

// TODO: look into hooking @logout and @unregister into storybook/addons-actions

const Template: Story = (args, { argTypes }) => ({
  components: { LoginView, UtilLayout, BrandA, BackButton },

  template: `
    <UtilLayout home-route="/">
      <BrandA slot="brand" />
      <BackButton to="/" slot="backButton">Go Back</BackButton>
      <LoginView
        slot="main"
        api-module="api"
      />
    </UtilLayout>
  `
});

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  layout: 'fullscreen',
  actions: { argTypesRegex: '^on[A-Z].*' }
};
