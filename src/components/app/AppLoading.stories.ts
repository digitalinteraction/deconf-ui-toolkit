import { Meta, Story } from '@storybook/vue';
import AppLoading from './AppLoading.vue';

export default {
  title: 'App/AppLoading',
  component: AppLoading
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { AppLoading },
  template: `
    <AppLoading />
  `
});

export const Default = Template.bind({});
Default.args = {};
Default.parameters = { layout: 'fullscreen' };

export const Mobile = Template.bind({});
Mobile.args = {};
Mobile.parameters = {
  layout: 'fullscreen',
  viewport: { defaultViewport: 'mobile2' }
};
