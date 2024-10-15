<template>
  <FullScreenDialog v-if="dialogPlugin.component" @close="dialogPlugin.close()">
    <component :is="dialogPlugin.component" v-bind="dialogPlugin.props" />
  </FullScreenDialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import FullScreenDialog from './FullScreenDialog.vue'

import type { DialogPlugin } from '../lib/module'

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
  name: 'AppDialog',
  components: { FullScreenDialog },
  props: {
    dialogPlugin: { type: Object as PropType<DialogPlugin>, required: true },
  },
})
</script>
