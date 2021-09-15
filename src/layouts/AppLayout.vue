<template>
  <FullHeight class="appLayout">
    <div class="appLayout-header">
      <NavigationBar
        :app-settings="appSettings"
        :is-logged-in="isLoggedIn"
        :is-interpreter="isInterpreter"
        :routes="routes"
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
import { defineComponent, PropType } from 'vue'
import { ConferenceConfig, AuthToken } from '@openlab/deconf-shared'

import { AppRoute } from '../lib/module'
import { FullHeight, NavigationBar, SideTabs } from '../components/module'

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
  },
  computed: {
    isLoggedIn(): boolean {
      return Boolean(this.user)
    },
    isInterpreter(): boolean {
      return Boolean(this.user && this.user.user_roles.includes('interpreter'))
    },
  },
})
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
