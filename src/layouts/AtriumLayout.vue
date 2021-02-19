<template>
  <div class="atriumLayout">
    <div class="container">
      <div class="atriumLayout-top">
        <slot name="top" />
      </div>
      <div class="columns is-multiline">
        <div class="column is-two-thirds">
          <div class="atriumLayout-left">
            <slot name="left" />
          </div>
        </div>
        <div class="column is-one-third">
          <div class="atriumLayout-right">
            <slot name="right" />
          </div>
        </div>
      </div>
      <div class="atriumLayout-bottom">
        <slot name="bottom" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AtriumLayout'
};
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
