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
    </nav>
    <div class="utilLayout-page">
      <section class="section">
        <div class="buttons">
          <slot name="back-button" />
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
//
// A wrapper for utility-like pages on the site, like login or privacy
// - configure whether to show a language control or not
//

import FullHeight from '../components/FullHeight.vue';

export default {
  components: { FullHeight },
  props: {
    homeRoute: { type: Object, required: true }
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
  }
}
</style>
