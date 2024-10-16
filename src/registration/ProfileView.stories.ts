import { Meta } from '@storybook/vue3';
import ProfileView from './ProfileView.vue';
import { BrandA } from '../story-lib/module';

import { UtilLayout, BackButton } from '../core/module';

export default {
  title: 'Registration/ProfileView',
  component: ProfileView,
} as Meta;

const Template = (args: unknown) => ({
  components: { ProfileView, UtilLayout, BackButton, BrandA },
  setup: () => args,
  data() {
    return {
      fields: [
        { label: 'Name', value: 'Geoff Testington' },
        { label: 'Email', value: 'geoff@example.com' },
        { label: 'Language', value: 'English' },
        { label: 'Registered', value: '12/08/2020' },
        { label: 'Logged in', value: '24/09/2020' },
        { label: 'Affiliation', value: 'Open Lab' },
        { label: 'Country', value: 'United Kingdom' },
      ],
    };
  },
  template: `
    <ProfileView api-module="api" :fields="fields" />
  `,
});

export const Default = {
  render: Template,
  args: {},
  parameters: {},
};
