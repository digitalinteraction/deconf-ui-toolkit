<template>
  <div class="heroCard" :style="style">
    <div class="hero">
      <div class="hero-body">
        <h1 class="heroCard-title">{{ title }}</h1>
        <p class="heroCard-subtitle">{{ subtitle }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'HeroCard',
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

<style lang="scss">
$heroCard-color: $text-strong !default;
$heroCard-family: $family-sans-serif !default;

.heroCard {
  background-size: cover;
  background-position: bottom;
  border-bottom: 1px solid $border;
  border-radius: $radius;
  padding: 2.5rem;

  @include mobile {
    border-radius: 0;
  }

  .hero-body {
    padding: 0 0 10rem 0;
  }

  .heroCard-title,
  .heroCard-subtitle {
    font-family: $heroCard-family;
    font-weight: $weight-bold;
    line-height: 1.125;
  }

  .heroCard-title {
    color: $heroCard-color;

    font-size: $size-3;

    @include tablet {
      font-size: $size-2;
    }
  }

  .heroCard-subtitle {
    font-size: $size-5;
    color: $heroCard-color;
    font-weight: $weight-bold;
    line-height: 1.125;
  }
}
</style>
