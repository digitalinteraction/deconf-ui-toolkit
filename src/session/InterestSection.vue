<template>
  <div class="interestSection">
    <p class="interestSection-message">
      {{ $t('deconf.interestSection.message') }}
    </p>

    <InterestButton
      :is-interested="isRegistered"
      :is-processing="isProcessing"
      @click="register"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { UserSessionAttendance } from '@openlab/deconf-shared';
import InterestButton from '../core/session/InterestButton.vue';

//
// i18n
// - deconf.interestSection.message
//
// icons
// - n/a
//
// sass
// - n/a
//

export default defineComponent({
  name: 'InterestSection',
  components: { InterestButton },
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
.interestSection > .interestButton {
  width: 100%;
}
</style>
