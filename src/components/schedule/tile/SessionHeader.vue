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
  name: 'SessionHeader',
  components: { FontAwesomeIcon },
  props: {
    sessionType: { type: Object as PropType<SessionType>, required: true }
  }
});
</script>

<style lang="scss">
$sessionHeader-color: $grey !default;
$sessionHeader-weight: $weight-semibold !default;

.sessionHeader {
  color: $sessionHeader-color;
  font-size: 0.9em;
  font-weight: $sessionHeader-weight;
  letter-spacing: 0.05em;
  line-height: 1.25rem;
  text-transform: uppercase;
}
</style>
