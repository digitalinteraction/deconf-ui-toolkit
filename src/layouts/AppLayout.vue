<template>
  <FullHeight class="appLayout">
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
  </FullHeight>
</template>

<script lang="ts">
import { AppRoute, AppSettings, User } from '@/types';
import { PropType } from 'vue';

import AtriumIcon from '@/icons/AtriumIcon.vue';
import CoffeeChatIcon from '@/icons/CoffeeChatIcon.vue';
import HelpDeskIcon from '@/icons/HelpDeskIcon.vue';
import ScheduleIcon from '@/icons/ScheduleIcon.vue';
import WhatsOnIcon from '@/icons/WhatsOnIcon.vue';

import FullHeight from '@/components/FullHeight.vue';
import NavigationBar from '@/components/app/NavigationBar.vue';
import SideTabs from '@/components/app/SideTabs.vue';

import { Routes } from '@/constants';

function appRoutes(
  user: User | null,
  settings: AppSettings,
  t: (key: string) => string
) {
  const routes: AppRoute[] = [];

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

//
// I18n keys
// - deconf.appLayout.atrium
// - deconf.appLayout.whatsOn
// - deconf.appLayout.schedule
// - deconf.appLayout.coffeeChat
// - deconf.appLayout.helpDesk
// - deconf.appLayout.unavailable
//

export default {
  name: 'AppLayout',
  components: { FullHeight, NavigationBar, SideTabs },
  props: {
    appSettings: { type: Object as PropType<AppSettings>, required: true },
    user: { type: Object as PropType<User>, default: null }
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
};
</script>

<style lang="scss">
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
  }
}

@include touch {
  .appLayout {
    overflow: scroll;
  }
  .appLayout-header {
    position: sticky;
    top: 0;
    background: $white;
    z-index: $z-appwrapper-navbar;
  }
  .appLayout-tabs {
    display: none;
  }
}
</style>
