<template>
  <div class="fullHeight" :style="styles">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

//
// i18n
// - n/a
//
// icons
// - n/a
//
// sass
// - n/a
//

export default defineComponent({
  name: 'FullHeight',
  data() {
    return {
      windowHeight: window.innerHeight,
    }
  },
  computed: {
    styles(): object {
      return {
        'min-height': `${this.windowHeight}px`,
      }
    },
  },
  mounted() {
    window.addEventListener('resize', this.update)
  },
  destroyed() {
    window.removeEventListener('resize', this.update)
  },
  methods: {
    update(): void {
      this.windowHeight = window.innerHeight
    },
  },
})
</script>
