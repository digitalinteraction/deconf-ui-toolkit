<template>
  <div class="sessionHeader">
    <div class="icon-text">
      <template v-if="sessionType">
        <span class="icon">
          <FontAwesomeIcon
            :icon="[sessionType.iconGroup, sessionType.iconName]"
            size="lg"
            fixed-width
          />
        </span>
        <span>
          {{ localise(sessionType.title) }}
        </span>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { SessionType, Track } from '@/types';
import { localiseFromObject } from '@/utils';

export default {
  name: 'SessionHeader',
  components: { FontAwesomeIcon },
  props: {
    sessionType: { type: Object as PropType<SessionType>, default: null },
    sessionTrack: { type: Object as PropType<Track>, default: null }
  },
  methods: {
    localise(object: Record<string, string>): string | null {
      return localiseFromObject(this.$i18n.locale, object);
    }
  }
};
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
