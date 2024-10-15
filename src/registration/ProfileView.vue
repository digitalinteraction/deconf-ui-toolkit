<template>
  <div class="profileView">
    <h1 class="profileView-title">
      {{ $t('deconf.profile.title') }}
    </h1>

    <table class="table">
      <tbody>
        <tr v-for="field in fields" :key="field.label">
          <th>{{ field.label }}</th>
          <td>{{ field.value }}</td>
        </tr>
      </tbody>
    </table>

    <slot name="preActions"></slot>

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
import { defineComponent, PropType } from 'vue';
import { createLogoutEvent, createUnregisterEvent } from '../lib/metrics';
import { ProfileField } from './profile-field';
import { namespaceForApi } from '../lib/module';

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
// - $profileView-headingFamily
// - $profileView-titleWeight
// - $profileView-titleSize
// - $profileView-titleFamily
//
// events
// - logout – When the user logged out
// - unregister – When the user unregistered
//

export default defineComponent({
  name: 'ProfileView',
  props: {
    fields: { type: Array as PropType<ProfileField[]>, required: true },
  },
  methods: {
    logout() {
      this.$deconf.trackMetric(createLogoutEvent());

      this.$emit('logout');
    },
    async unregister() {
      const msg = this.$t('deconf.profile.deleteText');
      const confirmed = window.confirm(msg as string);

      this.$deconf.trackMetric(createUnregisterEvent(confirmed));

      if (!confirmed) return;

      const success = await this.$store.dispatch(
        namespaceForApi(this.$deconf, 'unregister'),
      );

      if (!success) {
        alert(this.$t('deconf.general.genericError'));
        return;
      }

      this.$emit('unregister');
    },
  },
});
</script>

<style lang="scss">
$profileView-headingWeight: bold !default;
$profileView-headingSize: $size-5 !default;
$profileView-headingFamily: $family-title !default;

$profileView-titleWeight: bold !default;
$profileView-titleSize: $size-3 !default;
$profileView-titleFamily: $family-title !default;

.profileView-title {
  font-weight: $profileView-titleWeight;
  font-size: $profileView-titleSize;
  font-family: $profileView-titleFamily;
}

.profileView-heading {
  font-weight: $profileView-headingWeight;
  font-size: $profileView-headingSize;
  font-family: $profileView-headingFamily;
  margin-bottom: 0.3em;
}
</style>
