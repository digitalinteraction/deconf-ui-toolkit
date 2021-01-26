/* eslint-disable @typescript-eslint/camelcase */
import AppWrapper from './AppWrapper.vue';
import { createSettings } from '../utils/settings';
import { createContent } from '../utils/content';

export default {
  title: 'Layout/AppWrapper',
  component: AppWrapper
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AppWrapper, Content: createContent() },
  template: `
    <AppWrapper v-bind="{ appSettings, user, routeTitles, unavailableText, showPage, appBrand, ownerBrand }">
      <div class="container">
        <section class="section">
          <Content />
          <Content />
          <Content />
        </section>
      </div>
    </AppWrapper>
  `
});

export const Desktop = Template.bind({});
Desktop.args = {
  appSettings: createSettings(),
  user: {
    sub: 1,
    user_roles: ['attendee', 'interpreter'],
    user_lang: 'en'
  },
  routeTitles: {
    atrium: 'Atrium',
    whatsOn: 'WhatsOn',
    schedule: 'Schedule',
    coffeeChat: 'Coffee Chat',
    helpDesk: 'Help Desk',
    profile: 'Profile',
    interpret: 'Interpret Mode',
    login: 'Log in',
    register: 'Register'
  },
  unavailableText: '(Unavailable)',
  showPage: true,
  appBrand: {
    image: '/brand.svg',
    title: 'ClimateRed',
    width: 160,
    height: 28
  },
  ownerBrand: {
    image: '/openlab.svg',
    title: 'Open Lab',
    width: 110,
    height: 28
  }
};
Desktop.parameters = {
  layout: 'fullscreen'
};

export const DesktopLoggedOut = Template.bind({});
DesktopLoggedOut.args = {
  ...Desktop.args,
  user: null
};
DesktopLoggedOut.parameters = {
  layout: 'fullscreen'
};

export const Mobile = Template.bind({});
Mobile.args = Desktop.args;
Mobile.parameters = {
  viewport: { defaultViewport: 'mobile2' },
  layout: 'fullscreen'
};

export const MobileLoggedOut = Template.bind({});
MobileLoggedOut.args = DesktopLoggedOut.args;
MobileLoggedOut.parameters = Mobile.parameters;
