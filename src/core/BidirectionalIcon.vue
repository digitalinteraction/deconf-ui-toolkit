<template>
  <span>
    <span class="icon ltr-only">
      <FontAwesomeIcon :icon="ltr" />
    </span>
    <span class="icon rtl-only">
      <FontAwesomeIcon :icon="rtl" />
    </span>
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

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
  components: { FontAwesomeIcon },
  props: {
    ltr: { type: Array as PropType<string[]>, required: true },
    rtl: { type: Array as PropType<string[]>, required: true },
  },
});
</script>
