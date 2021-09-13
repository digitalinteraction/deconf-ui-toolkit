import { Meta, Story } from '@storybook/vue';
import ProfileView from './ProfileView.vue';
import UtilLayout from '../../layouts/UtilLayout.vue';
import BackButton from '../../components/BackButton.vue';
import { BrandA } from '../../story-lib/module';

export default {
  title: 'View/ProfileView',
  component: ProfileView
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { ProfileView, UtilLayout, BackButton, BrandA },
  data() {
    return {
      fields: [
        { label: 'Name', value: 'Geoff Testington' },
        { label: 'Email', value: 'geoff@example.com' },
        { label: 'Language', value: 'English' },
        { label: 'Registered', value: '12/08/2020' },
        { label: 'Logged in', value: '24/09/2020' },
        { label: 'Affiliation', value: 'Open Lab' },
        { label: 'Country', value: 'United Kingdom' }
      ]
    };
  },
  template: `
    <UtilLayout home-route="/">
      <BrandA slot="brand" />
      <BackButton to="/" slot="backButton">Go Back</BackButton>
      <ProfileView slot="main" api-module="api" :fields="fields" />
    </UtilLayout>
  `
});

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  layout: 'fullscreen'
};
