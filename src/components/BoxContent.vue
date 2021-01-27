<template>
  <div class="boxContent">
    <div class="container is-small">
      <h2 class="title">{{ title }}</h2>
      <component v-if="content" :is="content" class="content" />
      <slot name="actions" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    title: { type: String, required: true },
    content: { type: [Object, Function], default: null }
  }
});
</script>

<style lang="scss" scoped>
.boxContent {
  background-color: white;
  border-radius: $radius;
  padding: 2.5rem;
}

.title {
}

.content {
  margin-bottom: $gap;
}
</style>
