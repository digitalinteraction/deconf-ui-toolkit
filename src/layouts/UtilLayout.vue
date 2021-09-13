<template>
  <FullHeight class="utilLayout">
    <nav
      class="navbar has-border"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <router-link :to="homeRoute" class="navbar-item" active-class="">
          <slot name="brand" />
        </router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item" v-if="$slots.languageControl">
          <slot name="languageControl" />
        </div>
      </div>
    </nav>
    <div class="utilLayout-page">
      <section class="section">
        <div class="buttons">
          <slot name="backButton" />
        </div>
        <div class="box">
          <slot name="main" />
        </div>
      </section>
    </div>
    <slot name="footer" />
  </FullHeight>
</template>

<script>
import FullHeight from '../components/FullHeight.vue';

//
// A wrapper for utility-like pages on the site, like login or privacy
// - configure whether to show a language control or not
//

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
  name: 'UtilLayout',
  components: { FullHeight },
  props: {
    homeRoute: { type: [Object, String], required: true }
  }
};
</script>

<style lang="scss">
.utilLayout {
  background-color: $grey-lightest;
  display: flex;
  flex-direction: column;

  .utilLayout-page {
    flex: 1;
    max-width: $tablet;
    margin: 0 auto;
    width: 100%;
  }
}
</style>
