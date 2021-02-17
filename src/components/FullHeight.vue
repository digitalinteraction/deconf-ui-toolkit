<template>
  <div class="fullHeight" :style="styles">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'FullHeight',
  data() {
    return {
      windowHeight: window.innerHeight
    };
  },
  computed: {
    styles(): object {
      return {
        'min-height': `${this.windowHeight}px`
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
};
</script>
