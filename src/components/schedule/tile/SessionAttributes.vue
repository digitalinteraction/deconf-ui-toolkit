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
          {{ isRecorded ? 'Recorded' : 'Not recorded' }}
        </span>
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default Vue.extend({
  components: { FontAwesomeIcon },
  props: {
    languages: { type: Array as PropType<string[]>, required: true },
    isRecorded: { type: Boolean, required: true }
  }
});
</script>

<style lang="scss" scoped>
.sessionAttributes {
  // display: flex;
}

.sessionAttributes-attribute {
  // font-size: 1em;
  // padding: 0;
  // margin: 10px;
  color: #999;
  fill: #999;
  font-weight: $weight-bold;

  &.is-bold {
    color: #444;
    fill: #444;
  }

  &:not(:last-child) {
    margin-right: 1em;
  }
}
</style>
