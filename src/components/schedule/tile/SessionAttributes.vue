<template>
  <div class="sessionAttributes">
    <!-- 
      Language
    -->
    <span class="sessionAttributes-attribute is-bold">
      <span class="icon-text">
        <span class="icon">
          <FontAwesomeIcon :icon="['fas', 'globe']" fixed-width />
        </span>
        <span class="is-uppercase">
          {{ languages.join('/') }}
        </span>
      </span>
    </span>

    <!-- 
      Recorded
    -->
    <span class="sessionAttributes-attribute">
      <span class="icon-text">
        <span class="icon">
          <FontAwesomeIcon :icon="['fas', 'save']" fixed-width />
        </span>
        <span class="is-uppercase">
          {{
            $t(`deconf.session.${isRecorded ? 'isRecorded' : 'isNotRecorded'}`)
          }}
        </span>
      </span>
    </span>

    <!--
      Track
    -->
    <span class="sessionAttributes-attribute" v-if="track">
      <span class="icon-text">
        <span class="icon">
          <FontAwesomeIcon :icon="['fas', 'tag']" fixed-width />
        </span>
        <span class="is-uppercase">
          {{ localise(track.title) }}
        </span>
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Track } from '@openlab/deconf-shared/dist';
import { localiseFromObject } from '@/utils';

//
// I18n used:
// - deconf.session.isRecorded
// - deconf.session.isNotRecorded
//

export default {
  name: 'SessionAttributes',
  components: { FontAwesomeIcon },
  props: {
    languages: { type: Array as PropType<string[]>, required: true },
    isRecorded: { type: Boolean, required: true },
    track: { type: Object as PropType<Track>, default: null }
  },
  methods: {
    localise(object: Record<string, string>): string | null {
      return localiseFromObject(this.$i18n.locale, object);
    }
  }
};
</script>

<style lang="scss">
$sessionAttributes-color: #999 !default;
$sessionAttributes-strong: #444 !default;

.sessionAttributes {
  line-height: 2;
}

.sessionAttributes-attribute {
  color: $sessionAttributes-color;
  fill: $sessionAttributes-color;
  font-weight: $weight-bold;

  &.is-bold {
    color: $sessionAttributes-strong;
    fill: $sessionAttributes-strong;
  }

  &:not(:last-child) {
    margin-right: 1em;
  }
}
</style>
