<template>
  <div class="addToCalendarDialog">
    <header class="addToCalendarDialog-header">
      <h1 class="addToCalendarDialog-title">
        {{ $t('deconf.addToCalendarDialog.title') }}
      </h1>
      <p class="addToCalendarDialog-body">
        {{ $t('deconf.addToCalendarDialog.info') }}
      </p>
    </header>
    <section class="addToCalendarDialog-actions">
      <a
        v-if="icalLink"
        :href="icalLink"
        class="button is-fullwidth is-link is-medium"
        target="_blank"
        rel="nofollow"
        @click="track('ical')"
      >
        <span class="icon">
          <FontAwesomeIcon :icon="['fas', 'calendar-plus']" />
        </span>
        <span>
          {{ $t('deconf.addToCalendarDialog.ical') }}
        </span>
      </a>
      <a
        v-if="googleLink"
        :href="googleLink"
        class="button is-fullwidth is-google is-medium"
        target="_blank"
        rel="nofollow"
        @click="track('google')"
      >
        <span class="icon">
          <FontAwesomeIcon :icon="['fab', 'google']" />
        </span>
        <span>
          {{ $t('deconf.addToCalendarDialog.google') }}
        </span>
      </a>
      <button
        class="button is-danger is-light is-medium is-fullwidth addToCalendarDialog-cancel"
        @click="cancel"
      >
        {{ $t('deconf.addToCalendarDialog.cancel') }}
      </button>
    </section>
    <!-- <hr class="addToCalendarDialog-seperator" /> -->
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Session } from '@openlab/deconf-shared';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createICalEvent } from '../../lib/module';

//
// i18n
// - deconf.addToCalendarDialog.title
// - deconf.addToCalendarDialog.ical
// - deconf.addToCalendarDialog.google
// - deconf.addToCalendarDialog.cancel
//
// icons
// - fas calendar-plus
// - fab google
//
// sass
// - $addToCalendarDialog-titleFamily
// - $addToCalendarDialog-titleSize
// - $addToCalendarDialog-titleWeight
//

export default {
  name: 'AddToCalendarDialog',
  components: { FontAwesomeIcon },
  props: {
    session: { type: Object as PropType<Session>, required: true }
  },
  computed: {
    icalLink(): string | null {
      return this.$deconf.getCalendarLink(this.session, 'ical');
    },
    googleLink(): string | null {
      return this.$deconf.getCalendarLink(this.session, 'google');
    }
  },
  methods: {
    track(kind: string) {
      this.$deconf.trackMetric(createICalEvent(this.session.id, kind));
    },
    cancel() {
      this.$deconf.closeDialog();
    }
  }
};
</script>

<style lang="scss">
$addToCalendarDialog-titleFamily: $family-title !default;
$addToCalendarDialog-titleSize: $size-5 !default;
$addToCalendarDialog-titleWeight: $weight-bold !default;

.addToCalendarDialog {
}
.addToCalendarDialog-header {
  margin-bottom: $gap;
}
.addToCalendarDialog-title {
  font-weight: $addToCalendarDialog-titleWeight;
  font-size: $addToCalendarDialog-titleSize;
  font-family: $addToCalendarDialog-titleFamily;
}
.addToCalendarDialog-body {
}

.addToCalendarDialog-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  > .button.is-google {
    background-color: #4285f4;
    color: $white;
  }
}
.addToCalendarDialog-cancel {
  margin-top: $block-spacing;
}
.addToCalendarDialog-seperator {
  margin: 5rem 0;
}
</style>
