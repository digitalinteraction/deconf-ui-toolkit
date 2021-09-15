<template>
  <div class="profileView">
    <h1 class="title">{{ $t('deconf.profile.title') }}</h1>

    <table class="table">
      <tbody>
        <tr v-for="field in fields" :key="field.label">
          <th>{{ field.label }}</th>
          <td>{{ field.value }}</td>
        </tr>
      </tbody>
    </table>

    <p class="profileView-heading">
      {{ $t('deconf.profile.actionLabel') }}
    </p>

    <div class="buttons">
      <button class="button is-link" @click="logout">
        {{ $t('deconf.profile.logoutButton') }}
      </button>
    </div>

    <template>
      <p class="profileView-heading">
        {{ $t('deconf.profile.dangerLabel') }}
      </p>

      <div class="buttons">
        <button class="button is-danger" @click="unregister">
          {{ $t('deconf.profile.deleteButton') }}
        </button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { createLogoutEvent, createUnregisterEvent } from '../../lib/metrics'

//
// i18n
// - deconf.profile.title
// - deconf.profile.actionLabel
// - deconf.profile.logoutButton
// - deconf.profile.dangerLabel
// - deconf.profile.deleteButton
// - deconf.profile.deleteText
// - deconf.general.genericError
//
// icons
// - n/a
//
// sass
// - $profileView-headingWeight
// - $profileView-headingSize
//
// events
// - logout – When the user logged out
// - unregister – When the user unregistered
//

interface ProfileField {
  label: string
  value: string
}

export default defineComponent({
  name: 'ProfileView',
  props: {
    apiModule: { type: String, required: true },
    fields: { type: Array as PropType<ProfileField[]>, required: true },
  },
  methods: {
    logout() {
      this.$deconf.trackMetric(createLogoutEvent())

      this.$emit('logout')
    },
    async unregister() {
      const msg = this.$t('deconf.profile.deleteText')
      const confirmed = window.confirm(msg as string)

      this.$deconf.trackMetric(createUnregisterEvent(confirmed))

      if (!confirmed) return

      const success = await this.$store.dispatch(`${this.apiModule}/unregister`)

      if (!success) {
        alert(this.$t('deconf.general.genericError'))
        return
      }

      this.$emit('unregister')
    },
  },
})
</script>

<style lang="scss">
$profileView-headingWeight: bold !default;
$profileView-headingSize: $size-5 !default;

.profileView-heading {
  // TODO: font-family
  font-weight: $profileView-headingWeight;
  font-size: $profileView-headingSize;
  margin-bottom: 0.3em;
}
</style>
