<template>
  <div class="atriumLayout">
    <div class="container">
      <div class="atriumLayout-top">
        <slot name="top"></slot>
      </div>
      <div class="columns is-multiline">
        <div class="column is-two-thirds">
          <div class="atriumLayout-left">
            <slot name="left"></slot>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="atriumLayout-right">
            <slot name="right"></slot>
          </div>
        </div>
      </div>
      <div class="atriumLayout-bottom">
        <slot name="bottom"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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

export default defineComponent({
  name: 'AtriumLayout',
});
</script>

<style lang="scss">
.atriumLayout {
  background-color: $background;
  padding: $block-spacing;
  position: relative;
  @include mobile {
    padding: 0;
  }
}
@include tablet {
  .atriumLayout-top {
    margin-bottom: $block-spacing;
  }
}
.atriumLayout-bottom {
  margin-top: 7em;
}
</style>
