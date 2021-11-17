<template>
  <div class="devControl" v-if="devPlugin.isEnabled || forceEnable">
    <button
      class="button devControl-toggle"
      @click="toggleExpanded"
      v-if="!devPlugin.isVisible"
    >
      <span class="icon">
        <FontAwesomeIcon :icon="['fas', 'terminal']" />
      </span>
    </button>
    <div class="devControl-panel" v-if="devPlugin.isVisible">
      <div class="panel is-warning">
        <p class="devControl-heading">Dev controls</p>

        <!-- Slot state -->
        <!-- <div class="devControl-block" v-if="!devPlugin.slotState">
          <button
            class="button is-fullwidth is-primary is-light"
            @click="devPlugin.slotState = 'future'"
          >
            Override session slot state
          </button>
        </div>
        <div class="devControl-block" v-else>
          <div class="field">
            <label class="label">Override slot state</label>
            <div class="control has-icons-left">
              <div class="select is-fullwidth">
                <select v-model="devPlugin.slotState">
                  <option :value="undefined">Reset</option>
                  <option value="future">Future</option>
                  <option value="soon">Soon</option>
                  <option value="present">Present</option>
                  <option value="past">Past</option>
                </select>
              </div>
              <span class="icon is-left">
                <FontAwesomeIcon :icon="['fas', 'clock']" />
              </span>
            </div>
          </div>
        </div> -->

        <!-- Schedule date -->
        <div class="devControl-block" v-if="!devPlugin.scheduleDate">
          <button
            class="button is-fullwidth is-primary is-light"
            @click="devPlugin.scheduleDate = new Date()"
          >
            Override schedule date
          </button>
        </div>
        <div class="devControl-block has-columns" v-else>
          <div class="field">
            <label class="label">Schedule Date</label>
            <div class="control">
              <input
                class="input"
                type="date"
                :value="scheduleDate.date"
                @input="updateScheduleDate"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Time</label>
            <div class="control">
              <input
                class="input"
                type="time"
                :value="scheduleDate.time"
                @input="updateScheduleTime"
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button
                class="devControl-smallButton button is-danger"
                @click="devPlugin.scheduleDate = undefined"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <div class="devControl-block">
          <div class="buttons is-centered">
            <!-- Fast backwards -->
            <button
              @click="startTracking('fastBackward')"
              :disabled="disableButton('fastBackward')"
              :class="trackClasses('fastBackward')"
            >
              <span class="icon">
                <FontAwesomeIcon :icon="['fas', 'fast-backward']" />
              </span>
            </button>

            <!-- Backwards -->
            <button
              @click="startTracking('backward')"
              :disabled="disableButton('backward')"
              :class="trackClasses('backward')"
            >
              <span class="icon">
                <FontAwesomeIcon :icon="['fas', 'backward']" />
              </span>
            </button>

            <!-- Stop -->
            <button
              class="button is-primary"
              @click="stopTracking"
              :disabled="!tracking"
            >
              <span class="icon">
                <FontAwesomeIcon :icon="['fas', 'stop']" />
              </span>
            </button>

            <!-- Play -->
            <button
              @click="startTracking('play')"
              :disabled="disableButton('play')"
              :class="trackClasses('play')"
            >
              <span class="icon">
                <FontAwesomeIcon :icon="['fas', 'play']" />
              </span>
            </button>

            <!-- Forwards -->
            <button
              @click="startTracking('forward')"
              :disabled="disableButton('forward')"
              :class="trackClasses('forward')"
            >
              <span class="icon">
                <FontAwesomeIcon :icon="['fas', 'forward']" />
              </span>
            </button>

            <!-- Fast Forwards -->
            <button
              @click="startTracking('fastForward')"
              :disabled="disableButton('fastForward')"
              :class="trackClasses('fastForward')"
            >
              <span class="icon">
                <FontAwesomeIcon :icon="['fas', 'fast-forward']" />
              </span>
            </button>
          </div>
        </div>

        <div class="devControl-block">
          <button class="button is-fullwidth is-small" @click="toggleExpanded">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { DevPlugin, SlotState } from '../lib/module';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

//
// i18n
// - n/a
//
// icons
// - fas terminal
// - fas clcok
//
// sass
// - n/a
//

interface DateTimeObject {
  date: string;
  time: string;
}

// compose a real date from our date/time components from <input> elements
function makeDate(date: string, time: string): Date | undefined {
  const [fallbackDate, fallbackTime] = new Date().toISOString().split(/[TZ.]/);

  try {
    const result = new Date(
      `${date || fallbackDate}T${time || fallbackTime}.000Z`
    );
    result.setMinutes(
      result.getMinutes() + result.getTimezoneOffset(),
      result.getSeconds(),
      result.getMilliseconds()
    );
    if (Number.isNaN(result)) {
      console.error('Failed to create a date');
      return undefined;
    }
    return result;
  } catch (error) {
    return undefined;
  }
}

//
// Icons
// - fas terminal
// - fas clock
//

type TrackingSpeed =
  | 'fastBackward'
  | 'backward'
  | 'play'
  | 'forward'
  | 'fastForward';

const trackingSpeeds: Record<TrackingSpeed, number> = {
  fastBackward: -1000,
  backward: -200,
  play: 1,
  forward: 200,
  fastForward: 1000
};

interface Data {
  tracking: null | {
    timerId: number;
    speed: TrackingSpeed;
  };
}

export default {
  name: 'DevControl',
  components: { FontAwesomeIcon },
  data(): Data {
    return {
      tracking: null
    };
  },
  props: {
    devPlugin: { type: Object as PropType<DevPlugin>, required: true },
    forceEnable: { type: Boolean, default: false }
  },
  computed: {
    scheduleDate(): DateTimeObject {
      const scheduleDate = new Date(this.devPlugin.scheduleDate as Date);

      const padStart = (n: number) => n.toString().padStart(2, '0');

      return {
        date: [
          scheduleDate.getFullYear(),
          padStart(scheduleDate.getMonth() + 1),
          padStart(scheduleDate.getDate())
        ].join('-'),
        time: [
          padStart(scheduleDate.getHours()),
          padStart(scheduleDate.getMinutes()),
          padStart(scheduleDate.getSeconds())
        ].join(':')
      };
    }
  },
  methods: {
    toggleExpanded(): void {
      this.devPlugin.isVisible = !this.devPlugin.isVisible;
    },
    updateSlotState(event: Event): void {
      if (this.devPlugin) {
        this.devPlugin.slotState =
          ((event.target as HTMLSelectElement).value as SlotState) || undefined;
      }
    },
    updateScheduleDate(event: InputEvent): void {
      const target = event.target as HTMLInputElement;
      console.debug('updateScheduleDate', target.value);
      this.devPlugin.scheduleDate = makeDate(
        target.value,
        this.scheduleDate.time
      );
    },
    updateScheduleTime(event: InputEvent): void {
      const target = event.target as HTMLInputElement;
      console.debug('updateScheduleTime', target.value);

      const [h = '00', m = '00', s = '00'] = target.value.split(':');
      const newTime = [h, m, s].join(':');

      this.devPlugin.scheduleDate = makeDate(this.scheduleDate.date, newTime);
    },
    setScheduleDate(): void {
      this.devPlugin.scheduleDate = new Date();
    },
    clearScheduleDate() {
      this.devPlugin.scheduleDate = undefined;
    },
    startTracking(speed: TrackingSpeed) {
      this.stopTracking();
      let lastTick = Date.now();

      const timerId = window.setInterval(() => {
        const date = this.devPlugin.scheduleDate;
        if (!date) {
          this.stopTracking();
          return;
        }
        const dt = Date.now() - lastTick;
        lastTick = Date.now();

        this.devPlugin.scheduleDate = new Date(
          date.getTime() + dt * trackingSpeeds[speed]
        );
      }, 250);

      this.tracking = { timerId, speed };
    },
    stopTracking() {
      if (!this.tracking) return;

      window.clearInterval(this.tracking.timerId);
      this.tracking = null;
    },
    disableButton(speed: TrackingSpeed) {
      if (!this.devPlugin.scheduleDate) return true;
      return this.tracking ? this.tracking.speed === speed : false;
    },
    trackClasses(/*speed: TrackingSpeed*/) {
      return {
        button: true,
        'is-primary': true
      };
    }
  },
  destroyed() {
    this.stopTracking();
  }
};
</script>

<style lang="scss">
.devControl {
  position: fixed;
  z-index: 100;
  bottom: 1em;
  right: 1em;

  box-shadow: $box-shadow;

  .field {
    width: 100%;
  }
}
.devControl-panel {
  width: 420px;
  background: $white;
}

.devControl-heading {
  font-family: $family-monospace;
  background-color: $warning;
  color: $black;
  font-size: $size-4;
  font-weight: $weight-bold;
  line-height: 1.25;
  padding: 0.75em 1em;

  border-top-left-radius: $radius;
  border-top-right-radius: $radius;
}

.devControl-block {
  padding: 0.5em 0.75em;
  border-left: 1px solid $border;
  border-right: 1px solid $border;
  border-bottom: 1px solid $border;

  &.has-columns {
    display: flex;
    flex-direction: row;
    align-items: flex-end;

    .field:not(:last-child) {
      margin-right: 8px;
      margin-bottom: 0;
    }
  }

  .label {
    font-size: $size-7;
  }

  &:last-child {
    border-bottom-left-radius: $radius;
    border-bottom-right-radius: $radius;
  }
}

.devControl-smallButton.button {
  padding-left: 0.5em;
  padding-right: 0.5em;
}
</style>
