<template>
  <div class="timeSlot">
    <div class="timeSlot-tag" v-if="tagI18nKey" :class="tagClasses">
      {{ $t(tagI18nKey) }}
    </div>
    <h3 class="timeSlot-time icon-text">
      <span :title="startDate | localeDate">
        {{ startDate | shortTime }}
      </span>
      <span class="icon ltr-only">
        <FontAwesomeIcon :icon="['fas', 'long-arrow-alt-right']" />
      </span>
      <span class="icon rtl-only">
        <FontAwesomeIcon :icon="['fas', 'long-arrow-alt-left']" />
      </span>
      <span :title="endDate | localeDate">
        {{ endDate | shortTime }}
      </span>
    </h3>
    <p class="timeSlot-timezone">
      <span>{{ timezone }}</span>
    </p>
    <p class="timeSlot-date">
      {{ startDate | localeDateShort }}
    </p>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { SlotState } from '../lib/module';

//
// i18n
// - deconf.timeSlot.past - Label when in the past
// - deconf.timeSlot.live - Label when happening now
//
// icons
// - fas long-arrow-alt-right
// - fas long-arrow-alt-left
//
// sass
// - $timeSlot-presentColor
// - $timeSlot-presentBackground
// - $timeSlot-pastColor
// - $timeSlot-pastBackground
//

export default {
  name: 'TimeSlot',
  components: { FontAwesomeIcon },
  props: {
    slotState: { type: String as PropType<SlotState>, required: true },
    startDate: { type: Date as PropType<Date>, required: true },
    endDate: { type: Date as PropType<Date>, required: true }
  },
  filters: {
    shortTime(date: Date): string {
      return new Date(date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    localeDate(date: Date): string {
      return new Date(date).toLocaleString();
    },
    localeDateShort(date: Date): string {
      return new Date(date).toLocaleDateString([], {
        month: 'long',
        day: 'numeric'
      });
    }
  },
  computed: {
    tagClasses(): string {
      return `is-${this.slotState}`;
    },
    tagI18nKey(): string | null {
      if (this.slotState === 'past') return 'deconf.timeSlot.past';
      if (this.slotState === 'present') return 'deconf.timeSlot.live';
      return null;
    },
    timezone() {
      const intl = Intl.DateTimeFormat().resolvedOptions();
      return intl.timeZoneName || intl.timeZone;
    }
  }
};
</script>

<style lang="scss">
$timeSlot-presentColor: $red !default;
$timeSlot-presentBackground: $white !default;

$timeSlot-pastColor: #ddd !default;
$timeSlot-pastBackground: #999 !default;

.timeSlot {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &.is-large {
    font-size: 1.3em;
  }
}
.timeSlot-tag {
  border-radius: $radius;
  display: inline-block;
  font-size: 0.7em;
  font-weight: $weight-bold;
  margin-bottom: 5px;
  padding: 2px 20px;
  text-transform: uppercase;

  &.is-present {
    background-color: $timeSlot-presentColor;
    color: $timeSlot-presentBackground;
  }
  &.is-past {
    background-color: $timeSlot-pastColor;
    color: $timeSlot-pastBackground;
  }
}
.timeSlot-time {
  color: $text-strong;
  font-size: 1.3em;
  font-weight: $weight-bold;
  line-height: 1.5rem;
}
.timeSlot-timezone {
  color: $text-light;
  font-size: 0.9em;
  font-weight: $weight-bold;
  line-height: 1.25rem;
}
.timeSlot-date {
  color: $text-light;
  font-size: 0.9em;
  font-weight: $weight-normal;
}
</style>
