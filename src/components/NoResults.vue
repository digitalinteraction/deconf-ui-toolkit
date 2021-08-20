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
              <slot />
            </span>
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  components: { FontAwesomeIcon }
};
</script>

<style lang="scss">
.noResults {
  .notification {
    line-height: 1;
  }
}
</style>
