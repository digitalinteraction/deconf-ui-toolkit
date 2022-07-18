<template>
  <router-link class="joinSession button" :class="classes" :to="sessionRoute">
    <span>
      {{ $t(action) }}
    </span>
    <BidirectionalIcon
      :ltr="['fas', 'arrow-right']"
      :rtl="['fas', 'arrow-left']"
    />
  </router-link>
</template>

<script lang="ts">
import { PropType } from 'vue';

import { Routes, SlotState } from '../../lib/module';
import BidirectionalIcon from '../BidirectionalIcon.vue';

const actions: Record<SlotState, string> = {
  future: 'deconf.joinSession.future',
  soon: 'deconf.joinSession.present',
  present: 'deconf.joinSession.present',
  past: 'deconf.joinSession.past',
};

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

export default {
  name: 'JoinSession',
  components: { BidirectionalIcon },
  props: {
    slotState: { type: String as PropType<SlotState>, required: true },
    sessionId: { type: String, required: true },
  },
  computed: {
    classes(): unknown {
      return {
        'is-success': ['present', 'past'].includes(this.slotState),
      };
    },
    action(): string {
      return actions[this.slotState] || actions.past;
    },
    sessionRoute(): unknown {
      return { name: Routes.Session, params: { sessionId: this.sessionId } };
    },
  },
};
</script>

<style lang="scss">
@include mobile {
  .joinSession.button {
    width: 100%;
  }
}
</style>
