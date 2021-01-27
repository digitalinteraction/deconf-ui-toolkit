<template>
  <div class="timeSlot">
    <div class="timeSlot-tag" v-if="tagText" :class="tagClasses">
      {{ tagText }}
    </div>
    <h3 class="timeSlot-time">
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
import Vue, { PropType } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// interface Props {
//   currentDate: Date;
//   startDate: Date;
//   endDate: Date;
// }

export default Vue.extend({
  components: { FontAwesomeIcon },
  props: {
    currentDate: { type: Date as PropType<Date>, required: true },
    startDate: { type: Date as PropType<Date>, required: true },
    endDate: { type: Date as PropType<Date>, required: true }
    // isPadded: { type: Boolean, default: false },
    // forceActiveSessionState: { type: Boolean, default: false },
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
        // weekday: 'long',
        // year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  },
  computed: {
    timeState(): 'past' | 'present' | 'future' {
      if (this.currentDate.getTime() < this.startDate.getTime()) {
        return 'future';
      }
      if (this.currentDate.getTime() > this.endDate.getTime()) {
        return 'past';
      }
      return 'present';
    },
    tagClasses(): string {
      return `is-${this.timeState}`;
    },
    tagText(): string | null {
      if (this.timeState === 'past') return 'Past';
      if (this.timeState === 'present') return 'Live';
      return null;
    },
    timezone() {
      const intl = Intl.DateTimeFormat().resolvedOptions();
      return intl.timeZoneName || intl.timeZone;
    }
  }
});
</script>

<style lang="scss" scoped>
.timeSlot {
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
    background-color: $red;
    color: $white;
  }
  &.is-past {
    background-color: #ddd;
    color: #999;
  }
}
.timeSlot-time {
  color: $black;
  font-size: 1.3em;
  font-weight: $weight-bold;
  line-height: 1.5rem;
}
.timeSlot-timezone {
  color: #757a8a;
  font-size: 0.9em;
  font-weight: $weight-bold;
  line-height: 1.25rem;
}
.timeSlot-date {
  color: $text-light;
  color: #999;
  font-size: 0.9em;
  font-weight: $weight-normal;
}
</style>
