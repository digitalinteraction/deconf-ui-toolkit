<template>
  <div class="languageWarning" v-if="!isDismissed">
    <div class="notification is-warning">
      <button class="delete" @click="dismiss"></button>
      <span class="languageWarning-text">
        <div class="icon-text">
          <span class="icon">
            <FontAwesomeIcon :icon="['fas', 'globe']" />
          </span>
          <span>
            {{
              $t('deconf.session.languageWarning', [
                availableLanguages.join('/')
              ])
            }}
          </span>
        </div>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

//
// I18n keys
// - deconf.session.languageWarning
//

export default Vue.extend({
  name: 'LanguageWarning',
  components: { FontAwesomeIcon },
  data() {
    return {
      isDismissed: false
    };
  },
  props: {
    availableLanguages: { type: Array as PropType<string[]>, required: true }
  },
  methods: {
    dismiss() {
      this.isDismissed = true;
    }
  }
});
</script>

<style lang="scss">
.languageWarning {
}
.languageWarning-text {
  color: $text-strong;
  font-weight: $weight-bold;
}
</style>
