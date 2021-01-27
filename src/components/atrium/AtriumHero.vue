<template>
  <div class="hero" :style="style">
    <div class="hero-body">
      <h1 class="title">{{ title }}</h1>
      <p class="subtitle">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    coverImage: { type: String, required: true }
  },
  computed: {
    style(): object {
      return { 'background-image': `url(${this.coverImage})` };
    }
  }
});
</script>

<style lang="scss" scoped>
.hero {
  background-size: cover;
  background-position: bottom;
  border-bottom: 1px solid $border;
  border-radius: $radius;
  margin-bottom: $block-spacing;
  padding: 2.5rem;

  @include mobile {
    border-radius: 0;
    margin-bottom: 0;
  }
}

.hero-body {
  padding: 0 0 10rem 0;
}

.title {
  color: $black;
  font-weight: bold;
  @include tablet {
    font-size: $size-2;
  }
}

.subtitle {
  color: $black;
  font-weight: bold;
}
</style>
