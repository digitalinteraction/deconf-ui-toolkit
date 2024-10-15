<template>
  <div class="privateCalendarCreator">
    <p class="privateCalendarCreator-title">
      {{ $t('deconf.addUserCalendar.title') }}
    </p>

    <!-- The "generate" button -->
    <template v-if="!privateCal">
      <button class="button is-primary" @click="generate">
        {{ $t('deconf.addUserCalendar.generate') }}
      </button>
    </template>

    <!-- The control to copy the URL -->
    <template v-else>
      <div class="addUserCalendar-control">
        <input
          type="text"
          class="input addUserCalendar-input"
          :value="privateCal.url"
          readonly
        />
        <button class="button" :class="copyClasses" @click="copyLink">
          {{
            didCopy
              ? $t('deconf.addUserCalendar.copied')
              : $t('deconf.addUserCalendar.copy')
          }}
        </button>
        <p class="addUserCalendar-help">
          {{ $t('deconf.addUserCalendar.info') }}
        </p>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import copyToClipboard from 'copy-to-clipboard';
import { PrivateCalendar } from '@openlab/deconf-shared';
import { namespaceForApi } from '../lib/module';
import { defineComponent } from 'vue';

//
// i18n
// - deconf.addUserCalendar.title
// - deconf.addUserCalendar.generate
// - deconf.addUserCalendar.copy
// - deconf.addUserCalendar.copied
// - deconf.addUserCalendar.info
//
// icons
// - n/a
//
// sass
// - $privateCalendarCreator-titleWeight
// - $privateCalendarCreator-titleSize
// - $privateCalendarCreator-titleFamily
//
// store actions
// - api/fetchUserCalendar
//
// metrics
// - profile/userCalendar
//

interface Data {
  privateCal: PrivateCalendar | null;
  didCopy: boolean;
  timerId: number | null;
}

export default defineComponent({
  name: 'PrivateCalendarCreator',
  data(): Data {
    return { privateCal: null, didCopy: false, timerId: null };
  },
  computed: {
    copyClasses(): unknown {
      return {
        'is-dark': !this.didCopy,
        'is-success': this.didCopy,
      };
    },
  },
  unmounted() {
    if (this.timerId) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  },
  methods: {
    async generate() {
      this.$deconf.trackMetric({
        eventName: 'profile/userCalendar',
        payload: {},
      });

      this.privateCal = await this.$store.dispatch(
        namespaceForApi(this.$deconf, 'fetchUserCalendar'),
      );
      if (!this.privateCal) alert('Something went wrong');
    },
    copyLink() {
      if (!this.privateCal) return;
      copyToClipboard(this.privateCal.url.toString());

      this.didCopy = true;
      this.timerId = window.setTimeout(() => (this.didCopy = false), 5000);
    },
  },
});
</script>

<style lang="scss">
$privateCalendarCreator-titleWeight: bold !default;
$privateCalendarCreator-titleSize: $size-5 !default;
$privateCalendarCreator-titleFamily: $family-title !default;

.privateCalendarCreator {
  margin-bottom: $block-spacing;
}
.privateCalendarCreator-title {
  font-weight: $privateCalendarCreator-titleWeight;
  font-size: $privateCalendarCreator-titleSize;
  font-family: $privateCalendarCreator-titleFamily;
  margin-bottom: 0.3em;
}
.addUserCalendar-control {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.addUserCalendar-input {
  flex: 400px 0;
  color: $grey;
}
.addUserCalendar-help {
  flex: 100%;
  font-size: $size-7;
}
</style>
