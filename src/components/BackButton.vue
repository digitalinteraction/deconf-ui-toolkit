<template>
  <router-link class="backButton button is-white" active-class="" :to="to">
    <span class="icon ltr-only">
      <FontAwesomeIcon :icon="['fas', 'arrow-left']" />
    </span>
    <span class="icon rtl-only">
      <FontAwesomeIcon :icon="['fas', 'arrow-right']" />
    </span>
    <span>
      <slot></slot>
    </span>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { FontAwesomeIcon } from '../lib/module'

//
// i18n
// - n/a
//
// icons
// - fas arrow-left
// - fas arrow-right
//
// sass
// - n/a
//

export default defineComponent({
  name: 'BackButton',
  components: { FontAwesomeIcon },
  props: {
    to: { type: [String, Object], required: true },
  },
})
</script>
