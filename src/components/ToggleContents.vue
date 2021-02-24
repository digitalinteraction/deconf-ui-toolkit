<template>
  <div class="toggleContents">
    <div class="toggleContents-header">
      <span class="toggleContents-title">
        {{ title }}
      </span>
      <button class="button is-primary" @click="toggle">
        {{ toggleText }}
      </button>
    </div>
    <transition name="fade">
      <div class="toggleContents-contents" v-if="showContents">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ToggleContents',
  data() {
    return {
      showContents: this.initiallyOpen
    };
  },
  props: {
    title: { type: String, required: true },
    showButton: { type: String, required: true },
    hideButton: { type: String, required: true },
    initiallyOpen: { type: Boolean, default: false }
  },
  computed: {
    toggleText(): string {
      return this.showContents ? this.hideButton : this.showButton;
    }
  },
  methods: {
    toggle() {
      this.showContents = !this.showContents;
      this.$emit('toggle', this.showContents);
    }
  }
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
  border-top: 1px solid $border;

  @include mobile {
    padding: 15px;
    margin-top: 10px;
  }
}

@include mobile {
  .toggleContents-header {
    flex-wrap: wrap;
  }
  .toggleContents-header .button {
    width: 100%;
  }
  .toggleContents-header .toggleContents-title {
    width: 100%;
    margin: 0.5em 0;
    text-align: center;
  }
}
</style>
