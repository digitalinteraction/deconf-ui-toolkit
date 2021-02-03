<template>
  <div class="atriumPage">
    <div class="container">
      <div class="atriumPage-top">
        <slot name="top" />
      </div>
      <div class="columns">
        <div class="column is-two-thirds">
          <div class="atriumPage-left">
            <slot name="left" />
          </div>
        </div>
        <div class="column is-one-third">
          <div class="atriumPage-right">
            <slot name="right" />
          </div>
        </div>
      </div>
      <div class="atriumPage-bottom">
        <slot name="bottom" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AtriumLayout'
});
</script>

<style lang="scss">
.atriumPage {
  background-color: $background;
  padding: $block-spacing;
  position: relative;
  @include mobile {
    padding: 0;
  }
}
@include desktop {
  .atriumPage-top {
    margin-bottom: $block-spacing;
  }
}
.atriumPage-bottom {
  margin-top: 7em;
}
</style>
