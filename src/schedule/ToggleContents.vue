<template>
  <div class="toggleContents">
    <div class="toggleContents-header" v-if="!forceOpen">
      <span class="toggleContents-title">
        {{ title }}
      </span>
      <button class="button is-primary" @click="toggle">
        {{ toggleText }}
      </button>
    </div>
    <transition name="fade">
      <div class="toggleContents-contents" v-if="showContents || forceOpen">
        <slot />
      </div>
    </transition>
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
// - $toggleContents-background
// - $toggleContents-color
//

export default {
  name: 'ToggleContents',
  data() {
    return {
      showContents: false,
    };
  },
  props: {
    title: { type: String, required: true },
    showButton: { type: String, required: true },
    hideButton: { type: String, required: true },
    forceOpen: { type: Boolean, default: false },
  },
  computed: {
    toggleText(): string {
      return this.showContents ? this.hideButton : this.showButton;
    },
  },
  methods: {
    toggle(): void {
      this.showContents = !this.showContents;
      this.$emit('toggle', this.showContents);
    },
  },
};
</script>

<style lang="scss">
$toggleContents-background: #f4f4f4 !default;
$toggleContents-color: $primary !default;

.toggleContents {
  background-color: $toggleContents-background;
  border-radius: $radius;
}
.toggleContents-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  text-align: left;
}
.toggleContents-title {
  color: $toggleContents-color;
  flex: 1;
  font-size: 0.9em;
  font-weight: $weight-bold;
  padding: 0 10px;
}
.toggleContents-contents {
  padding: 20px;

  @include mobile {
    padding: 15px;
  }
}
.toggleContents-header + .toggleContents-contents {
  border-top: 1px solid $border;
}
</style>
