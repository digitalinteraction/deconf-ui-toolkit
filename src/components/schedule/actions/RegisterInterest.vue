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
        {{ isRegistered ? 'Registered' : 'Register now' }}
      </span>
    </div>
  </button>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default Vue.extend({
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
