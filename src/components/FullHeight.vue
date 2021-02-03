<template>
  <div class="fullHeight" :style="styles">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'FullHeight',
  data() {
    return {
      windowHeight: window.innerHeight
    };
  },
  computed: {
    styles(): object {
      return {
        height: `${this.windowHeight}px`
      };
    }
  },
  mounted() {
    window.addEventListener('resize', this.update);
  },
  destroyed() {
    window.removeEventListener('resize', this.update);
  },
  methods: {
    update(): void {
      this.windowHeight = window.innerHeight;
    }
  }
});
</script>
