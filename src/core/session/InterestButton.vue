<template>
  <button
    class="interestButton button"
    :class="classes"
    @click="$emit('toggle')"
    :disabled="isProcessing"
  >
    <span class="icon">
      <FontAwesomeIcon :icon="icon" />
    </span>
    <span>
      {{ text }}
    </span>
  </button>
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { defineComponent } from 'vue';
import { TranslateResult } from 'vue-i18n';

//
// i18n
// - deconf.interestSection.unregisterButton
// - deconf.interestSection.registerButton
//
// icons
// - fas times
// - fas user-plus
//
// sass
// - n/a
//

export default defineComponent({
  name: 'InterestButton',
  components: { FontAwesomeIcon },
  props: {
    isInterested: { type: Boolean, required: true },
    isProcessing: { type: Boolean, required: true },
  },
  computed: {
    classes(): string {
      if (this.isProcessing) return 'is-loading';
      if (this.isInterested) return 'is-danger is-outlined';
      return 'is-primary';
    },
    icon(): [string, string] {
      return this.isInterested ? ['fas', 'times'] : ['fas', 'user-plus'];
    },
    text(): TranslateResult {
      return this.$t(
        this.isInterested
          ? 'deconf.interestSection.unregisterButton'
          : 'deconf.interestSection.registerButton',
      );
    },
  },
});
</script>
