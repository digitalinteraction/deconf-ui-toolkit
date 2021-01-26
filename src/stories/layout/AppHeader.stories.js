import AppHeader from './AppHeader.vue';
import { createTemplate } from '../utils/template';
import { createSettings } from '../utils/settings';

export default {
  title: 'Layout/AppHeader',
  component: AppHeader
};

const Template = createTemplate({ AppHeader });

export const Desktop = Template.bind({});
Desktop.args = {
  appSettings: createSettings(),
  isLoggedIn: true,
  isInterpreter: true,
  routeTitles: {
    interpret: 'Interpret Mode',
    profile: 'Your profile',
    login: 'Log in',
    register: 'Register'
  },
  routes: [
    {
      name: 'A',
      title: 'Route A',
      enabled: true
    },
    {
      name: 'B',
      title: 'Route B',
      enabled: true
    },
    {
      name: 'C',
      title: 'Route C',
      enabled: true
    },
    {
      name: 'D',
      title: 'Route D (Unavailable)',
      enabled: false
    }
  ],
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

export const Mobile = Template.bind({});
Mobile.args = {
  ...Desktop.args
};
Mobile.parameters = {
  viewport: { defaultViewport: 'mobile2' }
};

// https://github.com/storybookjs/storybook/blob/master/addons/viewport/src/defaults.ts#L3
