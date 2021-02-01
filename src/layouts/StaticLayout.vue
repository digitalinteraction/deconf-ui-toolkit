<template>
  <div class="staticLayout">
    <div class="container">
      <section class="section">
        <div class="staticLayout-header">
          <div class="staticLayout-backButton">
            <slot name="backButton" />
          </div>
          <div class="staticLayout-languageControl">
            <!-- TODO -->
          </div>
        </div>

        <div class="staticLayout-main">
          <slot name="main" />
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  // ...
});
</script>

<style lang="scss" scoped>
.staticLayout {
  background-color: $background;
}
.staticLayout-header {
  display: flex;
  justify-content: space-between;
  padding: 0 0 1.5em;
}
.staticLayout-backButton {
}
.staticLayout-languageControl {
}
.staticLayout-main {
  background-color: $white;
  border-radius: $radius-large;
  box-shadow: $box-shadow;
  padding: 2.5rem;
}
</style>
