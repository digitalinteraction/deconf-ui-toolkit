<template>
  <FullHeight class="appLayout">
    <div class="appLayout-header">
      <NavigationBar
        :app-settings="appSettings"
        :is-logged-in="isLoggedIn"
        :is-interpreter="isInterpreter"
        :routes="routes"
        :links="navLinks"
      >
        <template v-slot:brandA>
          <slot name="brandA"></slot>
        </template>

        <template v-slot:brandB>
          <slot name="brandB"></slot>
        </template>

        <template v-slot:languageControl>
          <slot name="languageControl"></slot>
        </template>
      </NavigationBar>
    </div>

    <div class="appLayout-tabs">
      <SideTabs :routes="routes">
        <template v-slot:brand>
          <slot name="brandC"></slot>
        </template>
      </SideTabs>
    </div>

    <div class="appLayout-page">
      <slot name="main"></slot>
    </div>
  </FullHeight>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ConferenceConfig, AuthToken } from '@openlab/deconf-shared';

import { AppRoute } from '../lib/module';
import FullHeight from './FullHeight.vue';
import NavigationBar from './NavigationBar.vue';
import SideTabs from './SideTabs.vue';

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
// notes:
// - slot=main is flexed so you can flex:1 to make it fill height
//

export default defineComponent({
  name: 'AppLayout',
  components: { FullHeight, NavigationBar, SideTabs },
  props: {
    appSettings: { type: Object as PropType<ConferenceConfig>, required: true },
    user: { type: Object as PropType<AuthToken>, default: null },
    routes: { type: Array as PropType<AppRoute[]>, required: true },
    navLinks: { type: Array as PropType<string[]>, required: false },
  },
  computed: {
    isLoggedIn(): boolean {
      return Boolean(this.user);
    },
    isInterpreter(): boolean {
      if (!this.user) return false;
      return (
        this.user.user_roles.includes('interpreter') ||
        this.user.user_roles.includes('admin')
      );
    },
  },
});
</script>

<style lang="scss">
$appLayout-navbarBackground: $white !default;

.appLayout {
  display: flex;
  flex-direction: column;
  scroll-padding-top: $navbar-height;
  position: relative;
}

.appLayout-page {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-block-start: $navbar-height;
}

.appLayout-page > .appLayout-main {
  flex: 1;
}

.appLayout-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $z-appwrapper-navbar;
  background: $appLayout-navbarBackground;

  max-height: 100%;
  overflow-y: auto;
}

@include desktop {
  .appLayout-tabs {
    position: fixed;
    top: 0;
    bottom: 0;
    display: flex; // bit of a hack to get the inside to fill
    z-index: $z-appwrapper-tabbar;
  }
  .appLayout-header,
  .appLayout-page {
    margin-inline-start: $tabbar-width;
  }
}

@include touch {
  .appLayout-tabs {
    display: none;
  }
}
</style>
