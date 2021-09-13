<template>
  <div class="loginView">
    <div class="loginView">
      <h1 class="title">{{ $t('deconf.login.title') }}</h1>
      <div class="content">
        <p>{{ $t('deconf.login.infoText') }}</p>
      </div>
      <div class="notification is-success" v-if="state === 'success'">
        <button class="delete" @click="state = 'pending'"></button>
        <p>{{ $t('deconf.login.doneText') }}</p>
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
import TextField from '../../components/form/TextField.vue';
import { createLoginStartEvent, Routes } from '../../lib/module';

//
// i18n
// - deconf.login.title
// - deconf.login.infoText
// - deconf.login.doneText
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

interface Data {
  email: string;
  state: 'pending' | 'working' | 'error' | 'success';
}

export default {
  name: 'LoginView',
  components: { TextField },
  props: {
    apiModule: { type: String, required: true }
  },
  data(): Data {
    return {
      email: '',
      state: 'pending'
    };
  },
  computed: {
    registerRoute(): unknown {
      return { name: Routes.Register };
    }
  },
  methods: {
    async submit() {
      this.state = 'working';
      const success = await this.$store.dispatch(
        `${this.apiModule}/login`,
        this.email
      );

      this.state = success ? 'success' : 'error';

      this.$deconf.trackMetric(createLoginStartEvent());
    }
  }
};
</script>
