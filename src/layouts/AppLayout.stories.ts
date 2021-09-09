/* eslint-disable @typescript-eslint/camelcase */

import { Meta, Story } from '@storybook/vue';
import AppLayout from './AppLayout.vue';
import {
  createSettings,
  createContent,
  BrandC,
  BrandB,
  BrandA,
  LanguageControl
} from '../story-lib/module';
import { AuthToken } from '@openlab/deconf-shared';
import {
  AtriumIcon,
  CoffeeChatIcon,
  HelpDeskIcon,
  ScheduleIcon,
  WhatsOnIcon
} from '../icons/module';

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

const Content = createContent();

const Template: Story = (args, { argTypes }) => ({
  components: { AppLayout, Content, BrandA, BrandB, BrandC, LanguageControl },
  props: ['isLoggedIn', 'contentSize'],
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
    },
    contentLines() {
      return new Array(this.contentSize as number).fill(0).map((v, k) => k);
    }
  },
  template: `
    <AppLayout :appSettings="appSettings" :user="user" :routes="routes">
      <BrandA slot="brandA" />
      <BrandB slot="brandB" />
      <BrandC slot="brandC" />
      <LanguageControl slot="languageControl" />
      <div slot="main" style="background: #fafafa; flex: 1">
        <div class="container">
          <section class="section">
            <div class="content">
              <p>
                <a id="top" href="#bottom">Bottom</a>
              </p>
              <Content v-for="line in contentLines" :key="line" />
              <p>
                <a id="bottom" href="#top">Top</a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  `
});

export const Desktop = Template.bind({});
Desktop.args = {
  isLoggedIn: true,
  contentSize: 3
};
Desktop.parameters = {
  layout: 'fullscreen'
};

export const Short = Template.bind({});
Short.args = {
  isLoggedIn: true,
  contentSize: 0
};
Short.parameters = {
  layout: 'fullscreen'
};

export const Mobile = Template.bind({});
Mobile.args = {
  isLoggedIn: true,
  contentSize: 3
};
Mobile.parameters = {
  viewport: { defaultViewport: 'mobile2' },
  layout: 'fullscreen'
};
