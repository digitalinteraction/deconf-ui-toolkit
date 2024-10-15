<template>
  <FullHeight class="utilLayout">
    <nav class="utilLayout-nav" role="navigation" aria-label="main navigation">
      <router-link :to="homeRoute" class="utilLayout-item" active-class="">
        <slot name="brand"></slot>
      </router-link>
      <div class="utilLayout-item" v-if="$slots.languageControl">
        <slot name="languageControl"></slot>
      </div>
    </nav>
    <div class="utilLayout-page" :class="pageClasses">
      <section class="section">
        <div class="buttons">
          <slot name="backButton"></slot>
        </div>
        <div class="box">
          <slot name="main"></slot>
        </div>
      </section>
    </div>
    <slot name="footer"></slot>
  </FullHeight>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FullHeight from './FullHeight.vue';

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

export default defineComponent({
  name: 'UtilLayout',
  components: { FullHeight },
  props: {
    homeRoute: { type: [Object, String], required: true },
    width: {
      type: String,
      validator: (v: string) => ['regular', 'medium', 'large'].includes(v),
      default: 'regular',
    },
  },
  computed: {
    pageClasses(): unknown {
      return {
        'is-medium': this.width === 'medium',
        'is-large': this.width === 'large',
      };
    },
  },
});
</script>

<style lang="scss">
$utilLayout-regular: $tablet !default;
$utilLayout-medium: $desktop !default;
$utilLayout-large: $widescreen !default;
$utilLayout-background: $white !default;
$utilLayout-height: $navbar-height !default;

.utilLayout {
  background-color: $grey-lightest;
  display: flex;
  flex-direction: column;
}
.utilLayout-nav {
  display: flex;
  justify-content: space-between;
  background: $utilLayout-background;
  border-bottom: 1px solid $border;
}
.utilLayout-item {
  padding: 0.5rem 0.75rem;
  line-height: 1.5;
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  min-height: $utilLayout-height;
}
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
</style>
