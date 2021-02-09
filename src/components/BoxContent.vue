<template>
  <div class="boxContent">
    <div class="container is-small">
      <h2 class="boxContent-title">{{ title }}</h2>
      <component
        v-if="content"
        :is="content"
        class="boxContent-content content"
      />
      <slot name="actions" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BoxContent',
  props: {
    title: { type: String, required: true },
    content: { type: [Object, Function], default: null }
  }
};
</script>

<style lang="scss">
.boxContent {
  background-color: $white;
  padding: 2.5rem;

  @include desktop {
    border-radius: $radius;
  }

  .boxContent-title {
    font-family: $title-family;
    font-weight: $weight-bold;
    color: $text-strong;
    font-size: $size-3;
    margin-bottom: $block-spacing;
  }
}
</style>
