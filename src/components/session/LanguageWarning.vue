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
              $t('deconf.languageWarning.message', [
                availableLanguages.join('/'),
              ])
            }}
          </span>
        </div>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { FontAwesomeIcon } from '../../lib/module'

//
// i18n
// - deconf.languageWarning.message - The warning when a session is in a different language (^1)
//
// icons
// - fas globe
//
// sass
// - n/a
//

export default defineComponent({
  name: 'LanguageWarning',
  components: { FontAwesomeIcon },
  data() {
    return {
      isDismissed: false,
    }
  },
  props: {
    availableLanguages: { type: Array as PropType<string[]>, required: true },
  },
  methods: {
    dismiss() {
      this.isDismissed = true
    },
  },
})
</script>

<style lang="scss">
.languageWarning {
}
.languageWarning-text {
  color: $text-strong;
  font-weight: $weight-bold;
}
</style>
