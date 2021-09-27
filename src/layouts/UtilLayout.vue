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
    <div class="utilLayout-page" :class="pageClasses">
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

<script lang="ts">
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
// - $utilLayout-regular
// - $utilLayout-medium
// - $utilLayout-large
//

export default {
  name: 'UtilLayout',
  components: { FullHeight },
  props: {
    homeRoute: { type: [Object, String], required: true },
    width: {
      type: String,
      validator: (v: string) => ['regular', 'medium', 'large'].includes(v),
      default: 'regular'
    }
  },
  computed: {
    pageClasses(): unknown {
      return {
        'is-medium': this.width === 'medium',
        'is-large': this.width === 'large'
      };
    }
  }
};
</script>

<style lang="scss">
$utilLayout-regular: $tablet !default;
$utilLayout-medium: $desktop !default;
$utilLayout-large: $widescreen !default;

.utilLayout {
  background-color: $grey-lightest;
  display: flex;
  flex-direction: column;

  .utilLayout-page {
    flex: 1;
    max-width: $utilLayout-regular;
    margin: 0 auto;
    width: 100%;

    &.is-medium {
      max-width: $utilLayout-medium;
    }
    &.is-large {
      max-width: $utilLayout-large;
    }
  }
}
</style>
