<template>
  <div class="content">
    <p>{{ $t('deconf.tokenCaptureView.message') }}</p>
  </div>
</template>

<script lang="ts">
import { AuthToken } from '@openlab/deconf-shared';
import { createLoginFinishEvent, namespaceForApi } from '../lib/module';

//
// i18n
// - deconf.tokenCaptureView.message - temporary message to show
//
// icons
// - n/a
//
// sass
// - n/a
//
// events
// - success (user) - emitted when a token was captured and parsed
// - failed () - emitted when a token was not captured
//

export default {
  name: 'TokenCaptureView',
  props: {
    tokenKey: { type: String, required: true },
  },
  mounted() {
    this.processHash(window.location.hash);
  },
  methods: {
    async processHash(hash: string) {
      if (!hash || !hash.startsWith('#')) return this.$emit('failed');

      const params = new URLSearchParams(hash.slice(1));
      const authToken = params.get('token');
      if (!authToken) return this.$emit('failed');

      localStorage.setItem(this.tokenKey, authToken);
      await this.$store.dispatch(
        namespaceForApi(this.$deconf, 'authenticate'),
        { token: authToken }
      );

      const user: AuthToken = this.$store.state.api.user;
      if (!user) this.$emit('failed');

      this.$deconf.trackMetric(createLoginFinishEvent());

      this.$emit('success', user, params);
    },
  },
};
</script>
