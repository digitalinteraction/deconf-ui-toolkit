import { Component, defineComponent, h, PropType } from 'vue'
import { FontAwesomeIcon as fa } from '@fortawesome/vue-fontawesome'

//
// Normalised relative time to a slot
//
export type SlotState = 'future' | 'soon' | 'present' | 'past'

//
// These types were previously in .vue files but moved out for building TypeScript
// - https://github.com/vuejs/vue-loader/issues/1281
//

//
// Previously in  SponsorRow.vue
//
export type SponsorSize = 'large' | 'medium' | 'regular' | 'small'

export interface Sponsor {
  title: string
  image: string
  href?: string
}

//
// Previously in  SponsorGroup.vue
//
export interface SponsorGroup {
  title: string
  size: SponsorSize
  sponsors: Sponsor[]
}

//
// Previously in NavigationBar.vue
//
export interface AppRoute {
  title: string
  name: string
  enabled: boolean
  icon?: Component
}

//
//
//

export interface ScheduleConfig {
  tileHeader: Array<'type' | 'track' | 'themes'>
  tileAttributes: Array<'languages' | 'recorded' | 'track' | 'themes'>
}

//
// vue3 migration types
//
export type TranslateResult = string

export interface RouterLocation {
  name: string
  params?: Record<string, unknown>
}

export const FontAwesomeIcon = defineComponent({
  name: 'FontAwesomeIcon',
  props: {
    icon: { type: Array as PropType<string[]>, required: true },
    class: { type: String, required: false },
  },
  render() {
    return h(fa, {
      icon: this.icon,
      class: this.class,
    })
  },
})
