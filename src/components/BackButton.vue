<template>
  <router-link class="backButton button is-text" active-class="" :to="to">
    <div class="icon-text">
      <span class="icon ltr-only">
        <FontAwesomeIcon :icon="['fas', 'arrow-left']" />
      </span>
      <span class="icon rtl-only">
        <FontAwesomeIcon :icon="['fas', 'arrow-right']" />
      </span>
      <span>
        <slot />
      </span>
    </div>
  </router-link>
</template>

<script lang="ts">
import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default Vue.extend({
  components: { FontAwesomeIcon },
  props: {
    to: { type: [String, Object], required: true }
  }
});
</script>

<style lang="scss" scoped>
.backButton {
}
</style>
