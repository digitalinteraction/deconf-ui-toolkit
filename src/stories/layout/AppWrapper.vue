<template>
  <Vue100vh class="appWrapper" :css="{ height: 'calc(100rvh - 3.5rem)' }">
    <div class="appWrapper-header">
      <AppHeader
        :app-settings="appSettings"
        :is-logged-in="isLoggedIn"
        :is-interpreter="isInterpreter"
        :routes="appRoutes"
        :route-titles="routeTitles"
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

interface Props {
  appSettings: AppSettings;
  user: User | null;
  routeTitles: RouteTitles;
  unavailableText: string;
  showPage: boolean;
  appBrand: HeaderBrand;
  ownerBrand: HeaderBrand | null;
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
  titles: RouteTitles,
  unavailableText: string
) {
  const routes: AppRoute[] = [];

  if (settings.atrium.visible) {
    routes.push({
      title: titles.atrium,
      name: Routes.Atrium,
      enabled: settings.atrium.enabled,
      icon: AtriumIcon
    });
  }

  if (settings.whatsOn.visible) {
    routes.push({
      title: titles.whatsOn,
      name: Routes.WhatsOn,
      enabled: settings.whatsOn.enabled,
      icon: WhatsOnIcon
    });
  }

  if (settings.schedule.visible) {
    routes.push({
      title: titles.schedule,
      name: Routes.Schedule,
      enabled: Boolean(user) && settings.schedule.enabled,
      icon: ScheduleIcon
    });
  }

  if (settings.coffeeChat.visible) {
    routes.push({
      title: titles.coffeeChat,
      name: Routes.CoffeeChatLobby,
      enabled: Boolean(user) && settings.coffeeChat.enabled,
      icon: CoffeeChatIcon
    });
  }

  if (settings.helpDesk.visible) {
    routes.push({
      title: titles.helpDesk,
      name: Routes.HelpDesk,
      enabled: Boolean(user) && settings.helpDesk.enabled,
      icon: HelpDeskIcon
    });
  }

  for (const r of routes) {
    if (r.enabled) continue;
    r.title = r.title + ' ' + unavailableText;
  }

  return routes;
}

export default Vue.extend<{}, {}, {}, Props>({
  components: { Vue100vh, AppHeader, SideTabs },
  props: {
    appSettings: { type: Object, required: true },
    user: { type: Object, default: null },
    routeTitles: { type: Object, required: true },
    unavailableText: { type: String, required: true },
    showPage: { type: Boolean, required: true },
    appBrand: { type: Object, required: true },
    ownerBrand: { type: Object, default: null }
  },
  computed: {
    appRoutes() {
      return appRoutes(
        this.user,
        this.appSettings,
        this.routeTitles,
        this.unavailableText
      );
    },
    isLoggedIn() {
      return Boolean(this.user);
    },
    isInterpreter() {
      return this.user && this.user.user_roles.includes('interpreter');
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
