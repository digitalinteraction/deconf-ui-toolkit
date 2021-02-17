/* eslint-disable @typescript-eslint/camelcase */

import { Meta, Story } from '@storybook/vue';
import AppLayout from './AppLayout.vue';
import { createSettings, createContent } from '@/story-utils';
import { AuthToken } from '@/types';
import {
  AtriumIcon,
  CoffeeChatIcon,
  HelpDeskIcon,
  ScheduleIcon,
  WhatsOnIcon
} from '@/icons';

export default {
  title: 'Layout/AppLayout',
  component: AppLayout
} as Meta;

const user: AuthToken = {
  kind: 'auth',
  sub: 1,
  user_roles: ['attendee', 'interpreter'],
  user_lang: 'en'
};

const Template: Story = (args, { argTypes }) => ({
  components: { AppLayout, Content: createContent() },
  props: ['isLoggedIn'],
  data: () => ({
    appSettings: createSettings(),
    routes: [
      {
        title: 'Atrium',
        name: 'Atrium',
        enabled: true,
        icon: AtriumIcon
      },
      {
        title: 'Whats On',
        name: 'WhatsOn',
        enabled: true,
        icon: WhatsOnIcon
      },
      {
        title: 'Schedule',
        name: 'Schedule',
        enabled: true,
        icon: ScheduleIcon
      },
      {
        title: 'CoffeeChat',
        name: 'CoffeeChat',
        enabled: false,
        icon: CoffeeChatIcon
      },
      {
        title: 'HelpDesk',
        name: 'HelpDesk',
        enabled: false,
        icon: HelpDeskIcon
      }
    ]
  }),
  computed: {
    user() {
      return this.isLoggedIn ? user : null;
    }
  },
  template: `
    <AppLayout :appSettings="appSettings" :user="user" :routes="routes">
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
      <img
        slot="brandC"
        src="/square-brand.svg"
        width="64"
        height="64"
      />
      <div slot="main" class="container">
        <section class="section">
          <div class="content">
            <a id="top" href="#bottom">Bottom</a>
            <Content />
            <Content />
            <Content />
            <a id="bottom" href="#top">Top</a>
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
