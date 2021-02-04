<template>
  <router-link class="backButton button is-white" active-class="" :to="to">
    <span class="icon ltr-only">
      <FontAwesomeIcon :icon="['fas', 'arrow-left']" />
    </span>
    <span class="icon rtl-only">
      <FontAwesomeIcon :icon="['fas', 'arrow-right']" />
    </span>
    <span>
      <slot />
    </span>
  </router-link>
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'BackButton',
  components: { FontAwesomeIcon },
  props: {
    to: { type: [String, Object], required: true }
  }
};
</script>
