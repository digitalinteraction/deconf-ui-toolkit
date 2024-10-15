<template>
  <div class="staticLayout">
    <div class="container">
      <section class="section">
        <div class="staticLayout-header">
          <div class="staticLayout-backButton">
            <slot name="backButton"></slot>
          </div>
          <div
            class="staticLayout-languageControl"
            v-if="showLanguageControl"
          ></div>
        </div>

        <div class="staticLayout-main">
          <slot name="main"></slot>
        </div>
      </section>
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
// - $staticLayout-background
//

/** @deprecated This wasn't used, a combination of `UtilLayout` and `ApiContent` work well */
export default defineComponent({
  name: 'StaticLayout',
  computed: {
    showLanguageControl(): boolean {
      return false;
    },
  },
});
</script>

<style lang="scss">
$staticLayout-background: $background !default;

.staticLayout {
  background-color: $staticLayout-background;
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
