<template>
  <div class="inlineFilter">
    <div class="field has-addons">
      <div class="control">
        <div class="button is-static">
          {{ label }}
        </div>
      </div>
      <div class="control">
        <div class="select">
          <!-- TODO needs work to work with non-strings -->
          <select :value="chosenIndex" @input="onInput">
            <option :value="undefined">
              {{ offLabel }}
            </option>
            <option v-for="(item, i) in options" :key="item.value" :value="i">
              {{ item.text }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { localiseFromObject } from '../../../lib/module'
import { FilterOption } from './FilterOption'

//
// i18n
// - n/a
//
// icons
// - n/a
//
// sass
// - n/a
//

export default defineComponent({
  name: 'InlineFilter',
  props: {
    label: { type: String, required: true },
    offLabel: { type: String, required: true },
    options: { type: Array as PropType<FilterOption[]>, required: true },
    modelValue: {
      type: [String, Number, Boolean, Object] as PropType<any>,
      required: false,
    },
  },
  computed: {
    allOptions(): unknown[] {
      return [null, ...this.options.map((o) => o.value)]
    },
    chosenIndex(): number {
      for (let i = 0; i < this.allOptions.length; i++) {
        if (this.allOptions[i] === this.modelValue) return i
      }
      return 0
    },
  },
  methods: {
    localise(object: Record<string, string>): string | null {
      return localiseFromObject(this.$i18n.locale, object)
    },
    onInput(event: InputEvent) {
      const target = event.target as HTMLSelectElement
      if (!target) return

      const value = this.allOptions[target.selectedIndex]
      this.$emit('update:modelValue', value)
    },
  },
})
</script>

<style lang="scss">
.inlineFilter {
  // ...
}
</style>
