<template>
  <div class="sidebarItem">
    <h4 class="sidebarItem-title" v-if="title">
      {{ title }}
    </h4>
    <div class="sidebarItem-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

//
// i18n
// - n/a
//
// icons
// - n/a
//
// sass
// - n/a
//

export default defineComponent({
  name: 'SidebarItem',
  props: {
    title: { type: String, default: null },
  },
});
</script>

<style lang="scss">
.sidebarItem {
  &:not(:last-child) {
    margin-bottom: 2em;
  }
}
.sidebarItem-title {
  font-size: 1.1em;
  font-weight: $weight-bold;
  text-transform: uppercase;
  color: $text-light;
  margin-bottom: 0.3em;
}
.sidebarItem-content {
}
</style>
