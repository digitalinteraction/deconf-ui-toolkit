<template>
  <Vue100vh class="appWrapper" :css="{ height: '100rvh' }">
    <div class="appWrapper-header">
      <AppHeader
        :app-settings="appSettings"
        :is-logged-in="isLoggedIn"
        :is-interpreter="isInterpreter"
        :routes="appRoutes"
        :app-brand="appBrand"
        :owner-brand="ownerBrand"
      />
    </div>

    <div class="appWrapper-tabs">
      <SideTabs :routes="appRoutes" />
    </div>

    <div class="appWrapper-page" v-if="showPage">
      <slot />
    </div>
  </Vue100vh>
</template>

<script lang="ts">
import { AppSettings, User } from '@/types';
import Vue, { Component } from 'vue';
import Vue100vh from 'vue-100vh';
// import { RouteTitles } from '../components/AppHeader.vue';

import AtriumIcon from '@/icons/AtriumIcon.vue';
import CoffeeChatIcon from '@/icons/CoffeeChatIcon.vue';
import HelpDeskIcon from '@/icons/HelpDeskIcon.vue';
import ScheduleIcon from '@/icons/ScheduleIcon.vue';
import WhatsOnIcon from '@/icons/WhatsOnIcon.vue';

import AppHeader, { HeaderBrand } from './AppHeader.vue';
import SideTabs from './SideTabs.vue';

interface RouteTitles {
  atrium: string;
  whatsOn: string;
  schedule: string;
  coffeeChat: string;
  helpDesk: string;
  profile: string;
  interpret: string;
}

import { Routes } from '@/constants';

export interface AppRoute {
  title: string;
  name: string;
  enabled: boolean;
  icon?: Component;
}

function appRoutes(
  user: User | null,
  settings: AppSettings,
  t: (key: string) => string
) {
  const routes: AppRoute[] = [];

  if (settings.atrium.visible) {
    routes.push({
      title: t('deconf.appWrapper.atrium'),
      name: Routes.Atrium,
      enabled: settings.atrium.enabled,
      icon: AtriumIcon
    });
  }

  if (settings.whatsOn.visible) {
    routes.push({
      title: t('deconf.appWrapper.whatsOn'),
      name: Routes.WhatsOn,
      enabled: settings.whatsOn.enabled,
      icon: WhatsOnIcon
    });
  }

  if (settings.schedule.visible) {
    routes.push({
      title: t('deconf.appWrapper.schedule'),
      name: Routes.Schedule,
      enabled: Boolean(user) && settings.schedule.enabled,
      icon: ScheduleIcon
    });
  }

  if (settings.coffeeChat.visible) {
    routes.push({
      title: t('deconf.appWrapper.coffeeChat'),
      name: Routes.CoffeeChatLobby,
      enabled: Boolean(user) && settings.coffeeChat.enabled,
      icon: CoffeeChatIcon
    });
  }

  if (settings.helpDesk.visible) {
    routes.push({
      title: t('deconf.appWrapper.helpDesk'),
      name: Routes.HelpDesk,
      enabled: Boolean(user) && settings.helpDesk.enabled,
      icon: HelpDeskIcon
    });
  }

  return routes;
}

interface Props {
  appSettings: AppSettings;
  user: User | null;
  showPage: boolean;
  appBrand: HeaderBrand;
  ownerBrand: HeaderBrand | null;
}

//
// I18n keys
// - deconf.appWrapper.atrium
// - deconf.appWrapper.whatsOn
// - deconf.appWrapper.schedule
// - deconf.appWrapper.coffeeChat
// - deconf.appWrapper.helpDesk
// - deconf.appWrapper.unavailable
//

export default Vue.extend<{}, {}, {}, Props>({
  components: { Vue100vh, AppHeader, SideTabs },
  props: {
    appSettings: { type: Object, required: true },
    user: { type: Object, default: null },
    showPage: { type: Boolean, required: true },
    appBrand: { type: Object, required: true },
    ownerBrand: { type: Object, default: null }
  },
  computed: {
    appRoutes(): AppRoute[] {
      return appRoutes(
        this.user,
        this.appSettings,
        key => this.$i18n.t(key, []) as string
      );
    },
    isLoggedIn(): boolean {
      return Boolean(this.user);
    },
    isInterpreter(): boolean {
      return Boolean(this.user && this.user.user_roles.includes('interpreter'));
    }
  }
});
</script>

<style lang="scss" scoped>
.appWrapper {
  // fall back to 100% on IE
  min-height: calc(100% - #{$navbar-height});
  min-height: calc(100vh - #{$navbar-height});

  // position: relative;
  // display: flex;
  // flex-direction: column;
}

.appWrapper-page {
  position: relative;
  overflow-y: scroll;
}

@include desktop {
  .appWrapper {
    display: grid;
    grid: $navbar-height auto / $tabbar-width auto;
  }

  .appWrapper-header {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }

  .appWrapper-tabs {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    display: flex;
  }

  .appWrapper-page {
    grid-column: 2 / 2;
    grid-row: 2 / 3;
    // display: flex;
  }
}

@include touch {
  .appWrapper-tabs {
    display: none;
  }
}
</style>
