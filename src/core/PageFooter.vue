<template>
  <div class="pageFooter">
    <p class="pageFooter-line">
      <!-- Render each link -->
      <span v-for="(link, i) in links" :key="link.key">
        <a :href="link.url" target="_blank" rel="noopener">
          {{ link.title }}
        </a>
        <template v-if="i < links.length - 1"> / </template>
      </span>
    </p>

    <!-- Allow custom text -->
    <p class="pageFooter-line">
      <slot />
    </p>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { PageFooterLink } from './page-footer-link';

//
// i18n
// - n/a
//
// icons
// - n/a
//
// sass
// - $pageFooter-color
// - $pageFooter-background
// - $pageFooter-anchorColor
// - $pageFooter-anchorWeight
//

export default {
  name: 'PageFooter',
  props: {
    links: { type: Array as PropType<PageFooterLink[]>, required: true }
  }
};
</script>

<style lang="scss">
$pageFooter-color: $grey-dark !default;
$pageFooter-background: #ededed !default;
$pageFooter-anchorColor: $grey-darker !default;
$pageFooter-anchorWeight: bold !default;

.pageFooter {
  color: $pageFooter-color;
  background-color: $pageFooter-background;
  padding: 1.5rem 1.5rem 2.5rem;

  a {
    color: $pageFooter-anchorColor;
    font-weight: $pageFooter-anchorWeight;
  }
}

.pageFooter-line {
  text-align: center;

  &:not(:last-child) {
    margin-bottom: 0.5em;
  }
}
</style>
