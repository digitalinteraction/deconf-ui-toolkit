<template>
  <div class="sessionBoard">
    <slot />
  </div>
</template>

<script lang="ts">
//
// An abstract pinboard-style grid of items
//

//
// i18n
// - n/a
//
// icons
// - n/a
//
// sass
// - $sessionBoard-columns
// - $sessionBoard-spacing
// - $sessionBoard-padding
// - $sessionBoard-background
//

export default {
  name: 'SessionBoard',
};
</script>

<style lang="scss">
$sessionBoard-columns: 360px !default;
$sessionBoard-spacing: $block-spacing !default;
$sessionBoard-padding: 24px !default;
$sessionBoard-background: $white !default;

.sessionBoard {
  columns: $sessionBoard-columns;
  column-gap: $sessionBoard-spacing;
  padding: $sessionBoard-spacing;
}

.sessionBoard > * {
  padding: 24px;
  background: $sessionBoard-background;
  box-shadow: $box-shadow;
  break-inside: avoid;
  border-radius: $radius-large;
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: $sessionBoard-spacing;
  }
}
</style>
