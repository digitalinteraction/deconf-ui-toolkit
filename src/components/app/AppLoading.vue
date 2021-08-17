<template>
  <div class="appLoading" v-if="hasWaited">
    <div class="appLoading-box">
      <span class="icon-text">
        <span class="icon">
          <FontAwesomeIcon :icon="['fas', 'sync']" spin size="sm" />
        </span>
        <span>{{ $t('deconf.appLoading.message') }}</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

//
// I18n Keys:
// - deconf.appLoading.message
//

interface Data {
  hasWaited: boolean;
  timerId: number | null;
}

const DEBOUNCE_MS = 500;

export default {
  components: { FontAwesomeIcon },
  data(): Data {
    return { hasWaited: false, timerId: null };
  },
  mounted() {
    //
    // Only show loading after 500ms
    //
    this.timerId = setTimeout(() => (this.hasWaited = true), DEBOUNCE_MS);
  },
  destroyed() {
    if (this.timerId) clearInterval(this.timerId);
    this.timerId = null;
  }
};
</script>

<style lang="scss">
@keyframes appLoadingEnterance {
  from {
    opacity: 0%;
  }
  to {
    opacity: 100%;
  }
}

.appLoading {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  animation: appLoadingEnterance 300ms ease;
  animation-fill-mode: both;

  background-color: $background;
}
.appLoading-box {
  line-height: 1;
  padding: 2rem 2.5rem;
  background: $white;
  border-radius: 1rem;
  box-shadow: $box-shadow;
  font-size: $size-4;
  font-family: $family-monospace;
  font-weight: $weight-bold;
}
</style>
