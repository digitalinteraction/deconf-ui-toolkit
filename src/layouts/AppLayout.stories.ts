/* eslint-disable @typescript-eslint/camelcase */

import { Meta, Story } from '@storybook/vue';
import AppLayout from './AppLayout.vue';
import { createSettings, createContent } from '@/story-utils';
import { User } from '@/types';

export default {
  title: 'Layout/AppLayout',
  component: AppLayout
} as Meta;

const user: User = {
  kind: 'auth',
  sub: 1,
  user_roles: ['attendee', 'interpreter'],
  user_lang: 'en'
};

const Template: Story = (args, { argTypes }) => ({
  components: { AppLayout, Content: createContent() },
  props: ['isLoggedIn'],
  data: () => ({
    appSettings: createSettings()
  }),
  computed: {
    user() {
      return this.isLoggedIn ? user : null;
    }
  },
  template: `
    <AppLayout :appSettings="appSettings" :user="user">
      <img
        slot="brandA"
        src="/brand.svg"
        width="160"
        height="28"
      />
      <img
        slot="brandB"
        src="/openlab.svg"
        width="110"
        height="28"
      />
      <div slot="main" class="container">
        <section class="section">
          <div class="content">
            <Content />
            <Content />
            <Content />
          </div>
        </section>
      </div>
    </AppLayout>
  `
});

export const Desktop = Template.bind({});
Desktop.args = {
  isLoggedIn: true
};
Desktop.parameters = {
  layout: 'fullscreen'
};

export const Mobile = Template.bind({});
Mobile.args = {
  isLoggedIn: true
};
Mobile.parameters = {
  viewport: { defaultViewport: 'mobile2' },
  layout: 'fullscreen'
};
