<template>
  <router-link class="backButton button is-white" active-class="" :to="to">
    <BidirectionalIcon
      :ltr="['fas', 'arrow-left']"
      :rtl="['fas', 'arrow-right']"
    />
    <span>
      <slot></slot>
    </span>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BidirectionalIcon from './BidirectionalIcon.vue'

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
  components: { BidirectionalIcon },
  props: {
    to: { type: [String, Object], required: true },
  },
})
</script>
