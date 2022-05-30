<template>
  <div class="interestSection">
    <p class="interestSection-message">
      {{ $t('deconf.interestSection.message') }}
    </p>

    <!-- Remove interest button -->
    <button
      class="button interestSection-button"
      v-if="isRegistered"
      @click="register"
      :class="buttonClasses"
      :disabled="disabled"
    >
      <span class="icon">
        <FontAwesomeIcon :icon="['fas', 'times']" />
      </span>
      <span>
        {{ $t('deconf.interestSection.unregisterButton') }}
      </span>
    </button>

    <!-- Register interest button -->
    <button
      class="button interestSection-button"
      v-else
      @click="register"
      :class="buttonClasses"
      :disabled="disabled"
    >
      <span class="icon">
        <FontAwesomeIcon :icon="['fas', 'user-plus']" />
      </span>
      <span>
        {{ $t('deconf.interestSection.registerButton') }}
      </span>
    </button>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { UserSessionAttendance } from '@openlab/deconf-shared';

//
// i18n
// - deconf.interestSection.message
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

export default Vue.extend({
  name: 'InterestSection',
  components: { FontAwesomeIcon },
  props: {
    attendance: {
      type: Object as PropType<UserSessionAttendance | null>,
      default: null,
    },
    isProcessing: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isRegistered(): boolean {
      if (!this.attendance) return false;
      return this.attendance.isAttending;
    },
    buttonClasses(): string {
      if (this.isProcessing) return 'is-loading';
      if (this.isRegistered) return 'is-danger is-outlined';
      return 'is-primary';
    },
    disabled(): boolean {
      return this.isProcessing;
    },
  },
  methods: {
    async register(): Promise<void> {
      this.$emit(this.isRegistered ? 'unattend' : 'attend');
    },
  },
});
</script>

<style lang="scss">
.interestSection {
}
.interestSection-message {
  font-weight: $weight-bold;
  margin-bottom: 0.3em;
}
.interestSection-button {
  width: 100%;
}
</style>
