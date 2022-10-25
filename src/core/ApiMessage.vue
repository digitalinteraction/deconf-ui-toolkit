<template>
  <div class="content">
    <template v-if="errorCode === 'login_expired'">
      <h1>{{ $t('deconf.apiMessage.loginExpired.title') }}</h1>
      <p>{{ $t('deconf.apiMessage.loginExpired.info') }}</p>
      <p>
        <router-link :to="loginRoute" class="button is-link">
          {{ $t('deconf.apiMessage.loginExpired.action') }}
        </router-link>
      </p>
    </template>
    <template v-else>
      <h1>{{ $t('deconf.apiMessage.unknown.title') }}</h1>
      <p>{{ $t('deconf.apiMessage.unknown.info') }}</p>
      <p>
        <a :href="`mailto:${$t('deconf.apiMessage.unknown.email')}`">
          {{ $t('deconf.apiMessage.unknown.email') }}
        </a>
      </p>
    </template>
  </div>
</template>

<script lang="ts">
import { Routes } from '../lib/module';

//
// i18n
// - deconf.apiMessage.loginExpired.title
// - deconf.apiMessage.loginExpired.info
// - deconf.apiMessage.loginExpired.action
// - deconf.apiMessage.unknown.title
// - deconf.apiMessage.unknown.info
// - deconf.apiMessage.unknown.email
//
// icons
// - n/a
//
// sass
// - n/a
//

export default {
  name: 'ApiMessage',
  props: {
    errorCode: { type: String, default: 'unknown' },
  },
  computed: {
    loginRoute(): unknown {
      return { name: Routes.Login };
    },
  },
};
</script>
