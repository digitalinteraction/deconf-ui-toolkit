<template>
  <button
    class="button is-small"
    :class="classes"
    @click="onClick"
    :disabled="isWorking"
  >
    <div class="icon-text">
      <span class="icon">
        <FontAwesomeIcon :icon="icon" />
      </span>
      <span>
        {{ $t(`deconf.session.${isRegistered ? 'registered' : 'register'}`) }}
      </span>
    </div>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

//
// I18n usage:
// - deconf.session.registered
// - deconf.session.register
//

export default Vue.extend({
  name: 'RegisterInterest',
  components: { FontAwesomeIcon },
  props: {
    isWorking: { type: Boolean, required: true },
    isRegistered: { type: Boolean, required: true }
  },
  computed: {
    classes(): object {
      return {
        'is-loading': this.isWorking,
        'is-primary': !this.isWorking && this.isRegistered,
        'is-success': !this.isWorking && this.isRegistered
      };
    },
    icon(): string[] {
      return this.isRegistered ? ['fas', 'check'] : ['fas', 'user-plus'];
    }
  },
  methods: {
    onClick(e: MouseEvent): void {
      this.$emit('click', e);
    }
  }
});
</script>
