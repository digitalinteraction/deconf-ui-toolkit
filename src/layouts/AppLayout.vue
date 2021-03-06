<template>
  <FullHeight class="appLayout">
    <div class="appLayout-header">
      <NavigationBar
        :app-settings="appSettings"
        :is-logged-in="isLoggedIn"
        :is-interpreter="isInterpreter"
        :routes="routes"
      >
        <slot name="brandA" slot="brandA" />
        <slot name="brandB" slot="brandB" />
      </NavigationBar>
    </div>

    <div class="appLayout-tabs">
      <SideTabs :routes="routes">
        <slot name="brandC" slot="brand" />
      </SideTabs>
    </div>

    <div class="appLayout-page">
      <slot name="main" />
    </div>
  </FullHeight>
</template>

<script lang="ts">
import { AppRoute, ConfigSettings, AuthToken } from '@/types';
import { PropType } from 'vue';

import FullHeight from '@/components/FullHeight.vue';
import NavigationBar from '@/components/app/NavigationBar.vue';
import SideTabs from '@/components/app/SideTabs.vue';

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
    appSettings: { type: Object as PropType<ConfigSettings>, required: true },
    user: { type: Object as PropType<AuthToken>, default: null },
    routes: { type: Array as PropType<AppRoute[]>, required: true }
  },
  computed: {
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
$appLayout-navbarBackground: $white !default;

.appLayout {
  display: flex;
  flex-direction: column;
  scroll-padding-top: $navbar-height;
}

.appLayout-page {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.appLayout-header {
  position: sticky;
  top: 0;
  z-index: $z-appwrapper-navbar;
  background: $appLayout-navbarBackground;
}

@include desktop {
  .appLayout {
    margin-left: $tabbar-width;
  }
  .appLayout-tabs {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    display: flex;
  }
}

@include touch {
  .appLayout-tabs {
    display: none;
  }
}
</style>
