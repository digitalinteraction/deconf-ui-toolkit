<template>
  <div class="navigationBar">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link :to="homeRoute" class="navbar-item" active-class="">
          <slot name="brandA" />
        </router-link>

        <!-- Burger -->
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          @click.prevent="toggleMenu"
          ref="menuButton"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" :class="activeClasses">
        <div class="navbar-start">
          <router-link
            v-for="item in routes"
            :key="item.name"
            :to="{ name: item.name }"
            :disabled="!item.enabled"
            :title="item.title"
            class="navbar-item"
          >
            <component :is="item.icon" class="navbar-item-icon" />
            <span class="navbar-item-text" v-text="item.title" />
            <span
              v-if="!item.enabled"
              v-text="$t('deconf.appLayout.unavailable')"
            />
          </router-link>
        </div>
        <div class="navbar-end">
          <!-- 
          Show the owner brand if provided
        -->
          <div v-if="$slots.brandB" class="navbar-item">
            <slot name="brandB" />
          </div>

          <!-- 
            Language control
          -->
          <!-- <div class="navbar-item">
            <LanguageControl />
          </div> -->

          <!-- 
            Interpret mode button
          -->
          <div v-if="isLoggedIn && isInterpreter" class="navbar-item">
            <router-link
              class="button is-secondary is-small"
              :to="interpretRoute"
            >
              {{ $t('deconf.appLayout.interpret') }}
            </router-link>
          </div>

          <!-- 
            Profile button
          -->
          <div v-if="isLoggedIn" class="navbar-item">
            <router-link class="button is-small has-addons" :to="profileRoute">
              <span class="icon">
                <FontAwesomeIcon :icon="['fas', 'user']" />
              </span>
              <span>{{ $t('deconf.appLayout.profile') }}</span>
            </router-link>
          </div>

          <!-- 
            Login Button
          -->
          <div class="navbar-item" v-if="!isLoggedIn">
            <div class="buttons">
              <router-link class="button is-light is-small" :to="loginRoute">
                {{ $t('deconf.appLayout.login') }}
              </router-link>
              <!-- Register button -->
              <router-link
                class="button is-primary is-small"
                :to="registerRoute"
              >
                {{ $t('deconf.appLayout.register') }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { AppRoute, ConfigSettings } from '@/types';
import { PropType } from 'vue';
import { Routes } from '@/constants';
import { Location } from 'vue-router';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

//
// I18n keys
// - deconf.appLayout.unavailable
// - deconf.appLayout.login
// - deconf.appLayout.profile
// - deconf.appLayout.register
// - deconf.appLayout.interpret
//

export default {
  name: 'NavigationBar',
  components: { FontAwesomeIcon },
  data() {
    return {
      isShowingMenu: false
    };
  },
  props: {
    appSettings: { type: Object as PropType<ConfigSettings>, required: true },
    isLoggedIn: { type: Boolean, required: true },
    isInterpreter: { type: Boolean, required: true },
    routes: { type: Array as PropType<AppRoute[]>, required: true }
  },
  computed: {
    activeClasses(): object {
      return {
        'is-active': this.isShowingMenu
      };
    },
    homeRoute(): Location {
      return { name: Routes.Atrium };
    },
    interpretRoute(): Location {
      return { name: Routes.InterpretHome };
    },
    profileRoute(): Location {
      return { name: Routes.Profile };
    },
    loginRoute(): Location {
      return { name: Routes.Login };
    },
    registerRoute(): Location {
      return { name: Routes.Register };
    }
  },
  methods: {
    toggleMenu(): void {
      this.isShowingMenu = !this.isShowingMenu;
    }
  }
};
</script>

<style lang="scss">
$navigationBar-activeColor: $primary !default;
$navigationBar-activeBackground: $white !default;
$navigationBar-mobileBackground: $black-ter !default;
$navigationBar-mobileColor: $white !default;

.navigationBar {
  .navbar {
    &:after {
      content: '';
      height: 1px;
      background-color: $border;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: -1;
    }
  }

  @include desktop {
    .navbar-start {
      display: none;
    }
  }

  @include touch {
    .navbar-menu {
      padding: 0;
      background: $navigationBar-mobileBackground;
      padding: 12px 0;
    }
    .navbar-end {
      border-top: 1px solid $grey-dark;
      padding-top: 12px;
    }
    .navbar-menu .navbar-item {
      color: $navigationBar-mobileColor;
      margin: 0 12px 0;
      border-radius: $radius;
      font-weight: bold;

      &:hover:not(.is-active) {
        background-color: inherit;
      }

      &.is-active {
        color: $navigationBar-activeColor;
        background-color: $navigationBar-mobileColor;
      }

      &[disabled] {
        color: $grey;
      }
    }
  }

  .navbar-item {
    display: flex;
    align-items: center;
    color: grey;

    &[disabled] {
      color: $grey-light;
      pointer-events: none;

      cursor: not-allowed;
    }

    @include desktop {
      &:hover:not([disabled]):not(.is-active) {
        background-color: rgba(255, 255, 255, 0.15);
      }
    }

    &.is-active {
      color: $navigationBar-activeColor;
      background-color: $white;
    }
  }
  .navbar-item-icon {
    width: 3rem;
    height: 3rem;
    margin-right: 0.5rem;
  }
}
</style>
