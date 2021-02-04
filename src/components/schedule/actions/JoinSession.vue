<template>
  <router-link
    class="joinSession button is-small"
    :class="classes"
    :to="sessionRoute"
  >
    <div class="icon-text">
      <span class="icon rtl-only">
        <FontAwesomeIcon :icon="['fas', 'arrow-left']" />
      </span>
      <span>
        {{ $t(action) }}
      </span>
      <span class="icon ltr-only">
        <FontAwesomeIcon :icon="['fas', 'arrow-right']" />
      </span>
    </div>
  </router-link>
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Routes } from '@/constants';

const actions: Record<string, string> = {
  past: 'deconf.session.joinInPast',
  present: 'deconf.session.joinInPresent',
  future: 'deconf.session.joinInFuture'
};

//
// I18n used:
// - deconf.session.joinInPast
// - deconf.session.joinInPresent
// - deconf.session.joinInFuture
//

export default {
  name: 'JoinSession',
  components: { FontAwesomeIcon },
  props: {
    slotState: { type: String, required: true },
    sessionId: { type: String, required: true }
  },
  computed: {
    classes(): object {
      return {
        'is-success': ['present', 'past'].includes(this.slotState)
      };
    },
    action(): string {
      return actions[this.slotState] || actions.past;
    },
    sessionRoute(): object {
      return { name: Routes.Session, params: { sessionId: this.sessionId } };
    }
  }
};
</script>

<style lang="scss">
@include mobile {
  .joinSession.button {
    width: 100%;
  }
}
</style>
