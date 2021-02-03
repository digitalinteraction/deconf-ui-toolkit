<template>
  <div class="sessionLayout">
    <div class="container">
      <section class="section">
        <div class="sessionLayout-header">
          <div class="sessionLayout-back">
            <slot name="backButton" />
          </div>
          <div class="sessionLayout-state">
            <slot name="state" />
          </div>
        </div>
        <div class="sessionLayout-box">
          <div class="sessionLayout-main">
            <slot name="main" />
          </div>
          <div class="sessionLayout-sidebar">
            <slot name="sidebar" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SessionLayout'
});
</script>

<style lang="scss">
$sessionLayout-background: $background !default;

.sessionLayout {
  background: $sessionLayout-background;
}
.sessionLayout-header {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
}
.sessionLayout-box {
  background-color: $white;
  border-radius: $radius-large;
  box-shadow: $box-shadow;

  @include desktop {
    display: flex;
    justify-content: stretch;
  }
}
.sessionLayout-main {
  flex-grow: 1;
  flex-basis: 440px;

  @include desktop {
    border-right: 1px solid $border;
  }
}
.sessionLayout-sidebar {
  flex-basis: 360px;
  flex-grow: 0;
  flex-shrink: 1;
}

.sessionLayout-main,
.sessionLayout-sidebar {
  padding: 1.5rem;
}
</style>
