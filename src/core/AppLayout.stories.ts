import { Meta, Story } from '@storybook/vue';
import AppLayout from './AppLayout.vue';
import {
  mockSettings,
  Content,
  BrandC,
  BrandB,
  BrandA,
  LanguageControl,
  TabIcon
} from '../story-lib/module';
import { AuthToken } from '@openlab/deconf-shared';

export default {
  title: 'Core/AppLayout',
  component: AppLayout
} as Meta;

const user: AuthToken = {
  kind: 'auth',
  sub: 1,
  user_roles: ['attendee', 'interpreter'],
  user_lang: 'en'
};

const Template: Story = (args, { argTypes }) => ({
  components: { AppLayout, Content, BrandA, BrandB, BrandC, LanguageControl },
  props: ['isLoggedIn', 'contentSize'],
  data: () => ({
    appSettings: mockSettings(),
    routes: [
      {
        title: 'Atrium',
        name: 'Atrium',
        enabled: true,
        icon: TabIcon
      },
      {
        title: 'Whats On',
        name: 'WhatsOn',
        enabled: true,
        icon: TabIcon
      },
      {
        title: 'Schedule',
        name: 'Schedule',
        enabled: true,
        icon: TabIcon
      },
      {
        title: 'CoffeeChat',
        name: 'CoffeeChat',
        enabled: false,
        icon: TabIcon
      },
      {
        title: 'HelpDesk',
        name: 'HelpDesk',
        enabled: false,
        icon: TabIcon
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
              <Content :size="contentSize * 5" />
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
