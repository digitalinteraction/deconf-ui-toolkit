<template>
  <div class="timeSlot">
    <div class="timeSlot-tag" v-if="tagI18nKey" :class="tagClasses">
      {{ $t(tagI18nKey) }}
    </div>
    <h3 class="timeSlot-time icon-text">
      <span :title="localeDate(startDate)">
        {{ shortTime(startDate) }}
      </span>
      <BidirectionalIcon
        :ltr="['fas', 'long-arrow-alt-right']"
        :rtl="['fas', 'long-arrow-alt-left']"
      />
      <span :title="localeDate(endDate)">
        {{ shortTime(endDate) }}
      </span>
    </h3>
    <p class="timeSlot-date icon-text">
      <span>
        {{ localeDateShort(startDate) }}
      </span>
      <template v-if="isMultiDay">
        <BidirectionalIcon
          :ltr="['fas', 'long-arrow-alt-right']"
          :rtl="['fas', 'long-arrow-alt-left']"
        />
        <span>{{ localeDateShort(endDate) }}</span>
      </template>
    </p>
    <p class="timeSlot-timezone">
      <span>{{ timezone }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import BidirectionalIcon from './BidirectionalIcon.vue';
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

export default defineComponent({
  name: 'TimeSlot',
  components: { BidirectionalIcon },
  props: {
    slotState: { type: String as PropType<SlotState>, required: true },
    startDate: { type: Date as PropType<Date>, required: true },
    endDate: { type: Date as PropType<Date>, required: true },
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
    timezone(): string {
      const intl = Intl.DateTimeFormat().resolvedOptions();
      return intl.timeZoneName || intl.timeZone;
    },
    isMultiDay(): boolean {
      return this.endDate.getDate() !== this.startDate.getDate();
    },
  },
  methods: {
    shortTime(date: Date): string {
      return new Date(date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    },
    localeDate(date: Date): string {
      return new Date(date).toLocaleString();
    },
    localeDateShort(date: Date): string {
      return new Date(date).toLocaleDateString([], {
        month: 'long',
        day: 'numeric',
      });
    },
  },
});
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
.timeSlot-date {
  color: $text-light;
  font-size: 0.9em;
  font-weight: $weight-bold;
}
.timeSlot-timezone {
  color: $text-light;
  font-size: 0.9em;
  font-weight: $weight-normal;
  line-height: 1.25rem;
}
</style>
