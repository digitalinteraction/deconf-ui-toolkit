<template>
  <FontAwesomeIcon v-bind="iconProps" />
</template>

<script lang="ts">
import {
  FontAwesomeIcon,
  type FontAwesomeIconProps,
} from '@fortawesome/vue-fontawesome';
import { defineComponent, PropType } from 'vue';

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

export default defineComponent({
  name: 'DeconfFontAwesomeIcon',
  components: { FontAwesomeIcon },
  props: {
    icon: {
      type: [String, Array],
      required: true,
    },
    spin: { type: Boolean },
    size: { type: String as PropType<FontAwesomeIconProps['size']> },
    fixedWidth: { type: Boolean },
  },
  computed: {
    iconProps(): FontAwesomeIconProps {
      return {
        ...this.$props,
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
