import { Meta } from '@storybook/vue3';
import AppLayout from './AppLayout.vue';
import {
  mockSettings,
  Content,
  BrandC,
  BrandB,
  BrandA,
  LanguageControl,
  TabIcon,
} from '../story-lib/module';
import { AuthToken } from '@openlab/deconf-shared';
import { markRaw } from 'vue';

export default {
  title: 'Core/AppLayout',
  component: AppLayout,
} as Meta;

const user: AuthToken = {
  kind: 'auth',
  sub: 1,
  user_roles: ['attendee', 'interpreter'],
  user_lang: 'en',
};

const Template = (args: unknown) => ({
  components: { AppLayout, Content, BrandA, BrandB, BrandC, LanguageControl },
  setup: () => args,
  data: () => ({
    user,
    appSettings: mockSettings(),
    routes: [
      {
        title: 'Atrium',
        name: 'Atrium',
        enabled: true,
        icon: markRaw(TabIcon),
      },
      {
        title: 'Whats On',
        name: 'WhatsOn',
        enabled: true,
        icon: markRaw(TabIcon),
      },
      {
        title: 'Schedule',
        name: 'Schedule',
        enabled: true,
        icon: markRaw(TabIcon),
      },
      {
        title: 'CoffeeChat',
        name: 'CoffeeChat',
        enabled: false,
        icon: markRaw(TabIcon),
      },
      {
        title: 'HelpDesk',
        name: 'HelpDesk',
        enabled: false,
        icon: markRaw(TabIcon),
      },
    ],
  }),
  template: `
    <AppLayout :appSettings="appSettings" :user="isLoggedIn ? user : null" :routes="routes">
      <template v-slot:brandA>
        <BrandA />
      </template>

      <template v-slot:brandB>
        <BrandB />
      </template>

      <template v-slot:brandC>
        <BrandC />
      </template>
      
      <template v-slot:languageControl>
        <LanguageControl />
      </template>

      <template v-slot:main>
        <p class="has-text-centered">Header</p>
        <div class="container appLayout-main">
          <section class="section">
            <div class="content">
              <Content :size="contentSize * 5" />
            </div>
          </section>
        </div>
        <p class="has-text-centered">Footer</p>
      </template>
    </AppLayout>
  `,
});

export const Desktop = {
  render: Template,
  args: {
    isLoggedIn: true,
    contentSize: 3,
  },
  parameters: {
    viewport: { defaultViewport: 'desktop' },
    layout: 'fullscreen',
  },
};

export const Short = {
  render: Template,
  args: {
    isLoggedIn: true,
    contentSize: 1,
  },
  parameters: {
    viewport: { defaultViewport: 'desktop' },
    layout: 'fullscreen',
  },
};

export const Mobile = {
  render: Template,
  args: {
    isLoggedIn: true,
    contentSize: 3,
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    layout: 'fullscreen',
  },
};
