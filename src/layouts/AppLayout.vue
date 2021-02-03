<template>
  <Vue100vh class="appLayout" :css="{ height: '100rvh' }">
    <div class="appLayout-header">
      <NavigationBar
        :app-settings="appSettings"
        :is-logged-in="isLoggedIn"
        :is-interpreter="isInterpreter"
        :routes="appRoutes"
      >
        <slot name="brandA" slot="brandA" />
        <slot name="brandB" slot="brandB" />
      </NavigationBar>
    </div>

    <div class="appLayout-tabs">
      <SideTabs :routes="appRoutes" />
    </div>

    <div class="appLayout-page">
      <slot name="main" />
    </div>
  </Vue100vh>
</template>

<script lang="ts">
import { AppRoute, AppSettings, User } from '@/types';
import Vue, { Component } from 'vue';
import Vue100vh from 'vue-100vh';

import AtriumIcon from '@/icons/AtriumIcon.vue';
import CoffeeChatIcon from '@/icons/CoffeeChatIcon.vue';
import HelpDeskIcon from '@/icons/HelpDeskIcon.vue';
import ScheduleIcon from '@/icons/ScheduleIcon.vue';
import WhatsOnIcon from '@/icons/WhatsOnIcon.vue';

import NavigationBar from '@/components/app/NavigationBar.vue';
import SideTabs from '@/components/app/SideTabs.vue';

import { Routes } from '@/constants';

function appRoutes(
  user: User | null,
  settings: AppSettings,
  t: (key: string) => string
) {
  const routes: AppRoute[] = [];

  console.log({ user, settings });

  if (settings.atrium.visible) {
    routes.push({
      title: t('deconf.appLayout.atrium'),
      name: Routes.Atrium,
      enabled: settings.atrium.enabled,
      icon: AtriumIcon
    });
  }

  if (settings.whatsOn.visible) {
    routes.push({
      title: t('deconf.appLayout.whatsOn'),
      name: Routes.WhatsOn,
      enabled: settings.whatsOn.enabled,
      icon: WhatsOnIcon
    });
  }

  if (settings.schedule.visible) {
    routes.push({
      title: t('deconf.appLayout.schedule'),
      name: Routes.Schedule,
      enabled: Boolean(user) && settings.schedule.enabled,
      icon: ScheduleIcon
    });
  }

  if (settings.coffeeChat.visible) {
    routes.push({
      title: t('deconf.appLayout.coffeeChat'),
      name: Routes.CoffeeChatLobby,
      enabled: Boolean(user) && settings.coffeeChat.enabled,
      icon: CoffeeChatIcon
    });
  }

  if (settings.helpDesk.visible) {
    routes.push({
      title: t('deconf.appLayout.helpDesk'),
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
  // showPage: boolean;
  // appBrand: HeaderBrand;
  // ownerBrand: HeaderBrand | null;
}

//
// I18n keys
// - deconf.appLayout.atrium
// - deconf.appLayout.whatsOn
// - deconf.appLayout.schedule
// - deconf.appLayout.coffeeChat
// - deconf.appLayout.helpDesk
// - deconf.appLayout.unavailable
//

export default Vue.extend<{}, {}, {}, Props>({
  components: { Vue100vh, NavigationBar, SideTabs },
  props: {
    appSettings: { type: Object, required: true },
    user: { type: Object, default: null }
    // showPage: { type: Boolean, required: true },
    // appBrand: { type: Object, required: true },
    // ownerBrand: { type: Object, default: null }
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
.appLayout {
  // fall back to 100% on IE
  min-height: calc(100% - #{$navbar-height});
  min-height: calc(100vh - #{$navbar-height});

  // position: relative;
  // display: flex;
  // flex-direction: column;
}

.appLayout-page {
  position: relative;
  overflow-y: scroll;
}

@include desktop {
  .appLayout {
    display: grid;
    grid: $navbar-height auto / $tabbar-width auto;
  }

  .appLayout-header {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }

  .appLayout-tabs {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    display: flex;
  }

  .appLayout-page {
    grid-column: 2 / 2;
    grid-row: 2 / 3;
    // display: flex;
  }
}

@include touch {
  .appLayout-tabs {
    display: none;
  }
}
</style>
