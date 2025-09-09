<template>
  <FontAwesomeIcon v-bind="iconProps" />
</template>

<script lang="ts">
import {
  FontAwesomeIcon,
  type FontAwesomeIconProps,
} from '@fortawesome/vue-fontawesome';
import { defineComponent } from 'vue';

//
// i18n
// - n/a
//
// icons
// - [by prop]
//
// sass
// - n/a
//

export type { FontAwesomeIconProps };

export default defineComponent({
  name: 'DeconfFontAwesomeIcon',
  components: { FontAwesomeIcon },
  props: {
    icon: {
      type: [String, Array],
      required: true,
    },
    spin: { type: Boolean },
    size: { type: String },
    fixedWidth: { type: Boolean },
  },
  computed: {
    iconProps(): FontAwesomeIconProps {
      return {
        ...this.$props,
        size: this.size as FontAwesomeIconProps['size'],
        icon: this.iconify(this.icon),
      };
    },
  },
  methods: {
    iconify(input: string | unknown[]): string | string[] {
      if (typeof input === 'string') return input;
      return this.$deconf.renameIcon
        ? this.$deconf.renameIcon(input as string[])
        : (input as string[]);
    },
  },
});
</script>
