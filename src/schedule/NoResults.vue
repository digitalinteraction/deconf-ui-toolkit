<template>
  <div class="noResults">
    <section class="section is-medium">
      <div class="container">
        <div
          class="notification is-size-4 has-text-weight-bold has-text-centered"
        >
          <span class="icon-text">
            <span class="icon">
              <FontAwesomeIcon :icon="['fas', 'search']" />
            </span>
            <span>
              <slot></slot>
            </span>
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FontAwesomeIcon } from '../core/module';

//
// i18n
// - n/a
//
// icons
// - fas search
//
// sass
// - n/a
//

export default defineComponent({
  name: 'NoResults',
  components: { FontAwesomeIcon },
});
</script>

<style lang="scss">
.noResults {
  .notification {
    line-height: 1;
  }
}
</style>
