<template>
  <div class="loginView">
    <div class="loginView">
      <h1 class="title">{{ $t('deconf.login.title') }}</h1>
      <div class="content">
        <slot name="infoText"></slot>
      </div>
      <div class="notification is-success" v-if="state === 'success'">
        <button class="delete" @click="state = 'pending'"></button>
        <slot name="doneText"></slot>
      </div>
      <div class="notification is-danger" v-if="state === 'error'">
        <p>{{ $t('deconf.login.badEmail') }}</p>
      </div>
      <div class="loginView-form" v-if="state !== 'success'">
        <TextField
          name="email"
          type="email"
          :label="$t('deconf.login.email.label')"
          :placeholder="$t('deconf.login.email.placeholder')"
          :help="$t('deconf.login.email.help')"
          :has-error="state === 'error'"
          :disabled="state === 'working'"
          v-model="email"
          @enter="submit"
        />
        <div class="buttons">
          <button
            class="button is-primary"
            @click="submit"
            :disabled="state === 'working'"
          >
            {{ $t('deconf.login.submitButton') }}
          </button>
        </div>
      </div>

      <slot name="extraOptions"></slot>

      <hr />

      <div class="content">
        <p>
          {{ $t('deconf.login.registerLabel') }}
          <router-link :to="registerRoute">
            {{ $t('deconf.login.registerAction') }}
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import { TextField } from '../form/module.js';
import {
  createLoginStartEvent,
  namespaceForApi,
  Routes,
} from '../lib/module.js';

//
// i18n
// - deconf.login.title
// - deconf.login.badEmail
// - deconf.login.email.label
// - deconf.login.email.placeholder
// - deconf.login.email.help
// - deconf.login.submitButton
// - deconf.login.registerLabel
// - deconf.login.registerAction
//
// icons
// - n/a
//
// sass
// - n/a
//

type LoginState = 'pending' | 'working' | 'error' | 'success';

export interface _Data {
  email: string;
  state: LoginState;
}

export default defineComponent({
  name: 'LoginView',
  components: { TextField },
  props: {
    initialState: {
      type: String as PropType<LoginState>,
      default: 'pending' as LoginState,
    },
  },
  data(): _Data {
    return {
      email: '',
      state: this.initialState,
    };
  },
  computed: {
    registerRoute(): RouteLocationRaw {
      return { name: Routes.Register };
    },
  },
  methods: {
    async submit() {
      this.state = 'working';
      const success = await this.$store.dispatch(
        namespaceForApi(this.$deconf, 'login'),
        this.email,
      );

      this.state = success ? 'success' : 'error';

      this.$deconf.trackMetric(createLoginStartEvent('_feature_removed_'));
    },
  },
});
</script>
