<template>
  <div class="sessionHeader">
    <div class="icon-text">
      <span class="icon">
        <FontAwesomeIcon
          :icon="[sessionType.iconGroup, sessionType.iconName]"
          size="lg"
          fixed-width
        />
      </span>
      <span>
        {{ sessionType.title.en }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { SessionType } from '@/types';

export default Vue.extend({
  components: { FontAwesomeIcon },
  props: {
    sessionType: { type: Object as PropType<SessionType>, required: true }
  }
});
</script>

<style lang="scss" scoped>
.sessionHeader {
  color: $grey;
  font-size: 0.9em;
  font-weight: $weight-semibold;
  letter-spacing: 0.05em;
  line-height: 1.25rem;
  text-transform: uppercase;
}
</style>
