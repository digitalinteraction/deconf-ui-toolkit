<template>
  <div class="field">
    <label class="label" v-if="label" :for="name">
      {{ label }}
    </label>
    <div class="control">
      <div class="select" :class="selectClass">
        <select
          :value="modelValue"
          @change="onInput"
          :id="name"
          :disabled="disabled"
        >
          <option disabled selected value="">{{ notSelected }}</option>
          <option
            v-for="option in options"
            :key="option.text"
            :value="option.value"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
    </div>
    <div class="help" v-if="help" :class="selectClass">
      {{ help }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { SelectOption } from './select-option'

//
// Wraps a bulma select field
//

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
  name: 'SelectField',
  props: {
    name: { type: String, required: true },
    label: { type: String, default: null },
    modelValue: { type: String, required: false },
    help: { type: String, default: null },
    options: { type: Array as PropType<SelectOption[]>, required: true },
    hasError: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    fullwidth: { type: Boolean, default: false },
    notSelected: { type: String, default: 'Please select...' },
  },
  computed: {
    selectClass(): unknown {
      return {
        'is-danger': this.hasError,
        'is-fullwidth': this.fullwidth,
      }
    },
  },
  methods: {
    onInput(e: Event) {
      if (!(e.target instanceof HTMLSelectElement)) return
      this.$emit('update:modelValue', e.target.value)
    },
  },
})
</script>
