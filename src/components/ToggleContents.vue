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
import Vue from 'vue';

// TODO: needs a story

export default Vue.extend({
  data() {
    return {
      showContents: false
    };
  },
  props: {
    title: { type: String, required: true },
    showButton: { type: String, required: true },
    hideButton: { type: String, required: true }
  },

  computed: {
    toggleText(): string {
      return this.showContents ? this.hideButton : this.showButton;
    }
  },
  methods: {
    toggle() {
      this.showContents = !this.showContents;
    }
  }
});
</script>
<style lang="scss" scoped>
.toggleContents {
  background-color: #f4f4f4;
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
  color: $primary;
  flex: 1;
  font-size: 0.9em;
  font-weight: $weight-bold;
  padding: 0 10px;
}
.toggleContents-contents {
  padding: 20px;
}
</style>
