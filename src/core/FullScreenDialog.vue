<template>
  <div class="fullScreenDialog" @click="onBackgroundClick">
    <div class="fullScreenDialog-box">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
//
// i18n
// - n/a
//
// icons
// - n/a
//
// sass
// - $fullScreenDialog-background
// - $fullScreenDialog-boxRadius
// - $fullScreenDialog-boxBackground
//

export default {
  name: 'FullScreenDialog',
  mounted() {
    // Stop window scroll
    document.documentElement.classList.add('has-dialog');
  },
  destroyed() {
    // Stop window scroll
    document.documentElement.classList.remove('has-dialog');
  },
  methods: {
    onBackgroundClick(event: MouseEvent) {
      if (event.target !== this.$el) return;

      this.$emit('close');
    }
  }
};
</script>

<style lang="scss">
$fullScreenDialog-background: rgba(10, 10, 15, 0.72) !default;
$fullScreenDialog-boxRadius: $radius !default;
$fullScreenDialog-boxBackground: $white !default;

.fullScreenDialog {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 50;
  background-color: $fullScreenDialog-background;

  padding: 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
}
.fullScreenDialog-box {
  border-radius: $fullScreenDialog-boxRadius;
  padding: 1.5rem;
  max-width: 720px;
  width: 100%;
  background-color: $fullScreenDialog-boxBackground;

  max-height: 100%;
  overflow-y: auto;
}

html.has-dialog {
  overflow: hidden !important;
}
</style>
