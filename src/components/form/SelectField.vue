<template>
  <div class="field">
    <label class="label" v-if="label" :for="name">
      {{ label }}
    </label>
    <div class="control">
      <div class="select" :class="selectClass">
        <select
          :value="value"
          @change="onInput"
          :id="name"
          :disabled="disabled"
        >
          <option disabled selected value="">{{ notSelected }}</option>
          <option
            v-for="option in options"
            :key="option.value"
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
import { PropType } from 'vue';

//
// Wraps a bulma select field
//

interface SelectOption {
  text: unknown;
  value: unknown;
}

export default {
  props: {
    name: { type: String, required: true },
    label: { type: String, default: null },
    value: { type: String as PropType<string | null>, default: null },
    help: { type: String, default: null },
    options: { type: Array as PropType<SelectOption[]>, required: true },
    hasError: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    fullwidth: { type: Boolean, default: false },
    notSelected: { type: String, default: 'Please select...' }
  },
  computed: {
    selectClass(): unknown {
      return {
        'is-danger': this.hasError,
        'is-fullwidth': this.fullwidth
      };
    }
  },
  methods: {
    onInput(e: Event) {
      if (!(e.target instanceof HTMLSelectElement)) return;
      this.$emit('input', e.target.value);
    }
  }
};
</script>
