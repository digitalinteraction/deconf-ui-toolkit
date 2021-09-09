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
        <slot name="languageControl" slot="languageControl" />
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
import { PropType } from 'vue';
import { ConferenceConfig, AuthToken } from '@openlab/deconf-shared';

import { AppRoute } from '../lib/module';
import { FullHeight, NavigationBar, SideTabs } from '../components/module';

//
// i18n
// - n/a
//
// icons
// - n/a
//
// sass
// - n/a
//

export default {
  name: 'AppLayout',
  components: { FullHeight, NavigationBar, SideTabs },
  props: {
    appSettings: { type: Object as PropType<ConferenceConfig>, required: true },
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
