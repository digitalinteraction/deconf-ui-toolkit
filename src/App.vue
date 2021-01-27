<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <p>{{ appName }} / {{ appVersion }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  components: {},
  computed: {
    appName: () => process.env.VUE_APP_NAME,
    appVersion: () => process.env.VUE_APP_VERSION
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
