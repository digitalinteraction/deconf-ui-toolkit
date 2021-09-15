<template>
  <router-link class="joinSession button" :class="classes" :to="sessionRoute">
    <span class="icon rtl-only">
      <FontAwesomeIcon :icon="['fas', 'arrow-left']" />
    </span>
    <span>
      {{ $t(action) }}
    </span>
    <span class="icon ltr-only">
      <FontAwesomeIcon :icon="['fas', 'arrow-right']" />
    </span>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { FontAwesomeIcon, Routes, SlotState } from '../../../lib/module'

const actions: Record<SlotState, string> = {
  future: 'deconf.joinSession.future',
  soon: 'deconf.joinSession.present',
  present: 'deconf.joinSession.present',
  past: 'deconf.joinSession.past',
}

//
// i18n
// - deconf.joinSession.past - Button for a session in the past
// - deconf.joinSession.present - Button for a session thats live
// - deconf.joinSession.future - Button for a session in the future
//
// icons
// - fas arrow-left
// - fas arrow-right
//
// sass
// - n/a
//

export default defineComponent({
  name: 'JoinSession',
  components: { FontAwesomeIcon },
  props: {
    slotState: { type: String as PropType<SlotState>, required: true },
    sessionId: { type: String, required: true },
  },
  computed: {
    classes(): object {
      return {
        'is-success': ['present', 'past'].includes(this.slotState),
      }
    },
    action(): string {
      return actions[this.slotState] || actions.past
    },
    sessionRoute(): object {
      return { name: Routes.Session, params: { sessionId: this.sessionId } }
    },
  },
})
</script>

<style lang="scss">
@include mobile {
  .joinSession.button {
    width: 100%;
  }
}
</style>
