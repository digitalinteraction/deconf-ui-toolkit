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
        <div class="devControl-block" v-if="!devPlugin.slotState">
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
        </div>

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
          <div class="buttons">
            <button
              class="button is-success is-light"
              @click="startFastForward"
              v-if="!fastForward"
              :disabled="!devPlugin.scheduleDate"
            >
              Fast forward
            </button>
            <button
              class="button is-success"
              @click="stopFastForward"
              v-if="fastForward"
            >
              Stop Fast forward
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
import { DevPlugin, SlotState } from '../../lib/module';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

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

// TODO:
// Not translated

interface Data {
  fastForward: null | { timerId: any };
}

export default {
  components: { FontAwesomeIcon },
  data(): Data {
    return {
      fastForward: null
    };
  },
  props: {
    devPlugin: { type: Object as PropType<DevPlugin>, required: true },
    forceEnable: { type: Boolean, default: false }
  },
  computed: {
    scheduleDate(): DateTimeObject {
      const scheduleDate = this.devPlugin.scheduleDate as Date;
      const [date, time] = scheduleDate.toISOString().split(/[TZ.]/);
      const [h, m] = time.split(':');
      return { date, time: [h, m, '00'].join(':') };
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
      this.devPlugin.scheduleDate = makeDate(
        target.value,
        this.scheduleDate.time
      );
    },
    updateScheduleTime(event: InputEvent): void {
      const target = event.target as HTMLInputElement;

      const [h = '00', m = '00'] = target.value.split(':');
      const newTime = [h, m, '00'].join(':');

      this.devPlugin.scheduleDate = makeDate(this.scheduleDate.date, newTime);
    },
    setScheduleDate(): void {
      this.devPlugin.scheduleDate = new Date();
    },
    clearScheduleDate() {
      this.devPlugin.scheduleDate = undefined;
    },
    startFastForward() {
      let lastTick = Date.now();

      const timerId = setInterval(() => {
        const date = this.devPlugin.scheduleDate;
        if (!date) {
          this.stopFastForward();
          return;
        }
        const dt = Date.now() - lastTick;
        lastTick = Date.now();

        this.devPlugin.scheduleDate = new Date(date.getTime() + dt * 200);
      }, 250);

      this.fastForward = { timerId };
    },
    stopFastForward() {
      if (!this.fastForward) return;

      clearInterval(this.fastForward.timerId);
      this.fastForward = null;
    }
  },
  destroyed() {
    this.stopFastForward();
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
