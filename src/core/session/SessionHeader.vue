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
        <span class="text">
          {{ localise(sessionType.title) }}
        </span>
      </template>
      <template v-if="track">
        <span class="icon">
          <FontAwesomeIcon
            :icon="['fas', 'code-branch']"
            size="lg"
            fixed-width
          />
        </span>
        <span class="text">
          {{ localise(track.title) }}
        </span>
      </template>
      <template v-if="themes && themes.length > 0">
        <span class="icon">
          <FontAwesomeIcon :icon="['fas', 'tags']" size="lg" fixed-width />
        </span>
        <span class="text">
          {{ themes.map((t) => localise(t.title)).join(', ') }}
        </span>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import FontAwesomeIcon from '../FontAwesomeIcon.vue';
import { localiseFromObject } from '../../lib/module';
import { Localised, SessionType, Theme, Track } from '@openlab/deconf-shared';

//
// i18n
// - n/a
//
// icons
// - fas code-branch
// - fas tags
// - [from SessionType prop]
//
// sass
// - $sessionHeader-color
// - $sessionHeader-weight
//

export default defineComponent({
  name: 'SessionHeader',
  components: { FontAwesomeIcon },
  props: {
    sessionType: { type: Object as PropType<SessionType>, default: null },
    track: { type: Object as PropType<Track>, default: null },
    themes: { type: Array as PropType<Theme[]>, default: null },
  },
  methods: {
    localise(object: Localised): string | null {
      return localiseFromObject(this.$i18n.locale, object);
    },
  },
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

  .icon-text > .text:not(:last-child) {
    margin-right: $block-spacing;
  }
}
</style>
