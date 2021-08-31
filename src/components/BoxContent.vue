<template>
  <div class="boxContent">
    <div class="container is-small">
      <h2 class="boxContent-title" v-if="title">{{ title }}</h2>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
//
// i18n
// - n/a
//
// icons
// - n/a
//
// sass
// - $boxContent-titleFamily
//

export default {
  name: 'BoxContent',
  props: {
    title: { type: String, default: '' }
  }
};
</script>

<style lang="scss">
$boxContent-titleFamily: $family-sans-serif !default;

.boxContent {
  background-color: $white;
  padding: 2.5rem;

  @include desktop {
    border-radius: $radius;
  }

  .boxContent-title {
    font-family: $boxContent-titleFamily;
    font-weight: $weight-bold;
    color: $text-strong;
    font-size: $size-3;
    margin-bottom: $block-spacing;
  }
}
</style>
