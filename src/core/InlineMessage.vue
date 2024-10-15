<template>
  <section class="section is-large inlineMessage">
    <div class="container">
      <h1 class="title has-text-centered">
        <slot></slot>
      </h1>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
  name: 'InlineMessage',
})
</script>
