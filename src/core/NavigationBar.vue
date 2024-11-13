<template>
  <div class="navigationBar">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link :to="homeRoute" class="navbar-item" active-class="">
          <slot name="brandA"></slot>
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
            :disabled="!item.enabled || undefined"
            :title="item.title"
            class="navbar-item"
            active-class="is-active"
          >
            <component :is="item.icon" class="navbar-item-icon" />
            <span class="navbar-item-text" v-text="item.title"></span>
            <span v-if="!item.enabled">
              &nbsp;
              {{ $t('deconf.navigationBar.unavailable') }}
            </span>
          </router-link>
        </div>
        <div class="navbar-end">
          <!-- 
            Show the owner brand if provided
          -->
          <div v-if="$slots.brandB" class="navbar-item">
            <slot name="brandB"></slot>
          </div>

          <!-- 
            Language control
          -->
          <div class="navbar-item" v-if="$slots.languageControl">
            <slot name="languageControl"></slot>
          </div>

          <!-- 
            Interpret mode button
          -->
          <div
            v-if="isLoggedIn && isInterpreter && showLink('interpret')"
            class="navbar-item"
          >
            <router-link
              class="button is-secondary is-small"
              :to="interpretRoute"
            >
              {{ $t('deconf.navigationBar.interpret') }}
            </router-link>
          </div>

          <!-- 
            Profile button
          -->
          <div v-if="isLoggedIn && showLink('profile')" class="navbar-item">
            <router-link class="button is-small has-addons" :to="profileRoute">
              <span class="icon">
                <FontAwesomeIcon :icon="['fas', 'user']" />
              </span>
              <span>{{ $t('deconf.navigationBar.profile') }}</span>
            </router-link>
          </div>

          <!-- 
            Login Button
          -->
          <div
            class="navbar-item"
            v-if="!isLoggedIn && (showLink('login') || showLink('register'))"
          >
            <div class="buttons">
              <router-link
                v-if="showLink('login')"
                class="button is-light is-small"
                :to="loginRoute"
              >
                {{ $t('deconf.navigationBar.login') }}
              </router-link>
              <!-- Register button -->
              <router-link
                v-if="showLink('register')"
                class="button is-primary is-small"
                :to="registerRoute"
              >
                {{ $t('deconf.navigationBar.register') }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { AppRoute, Routes } from '../lib/module';
import { defineComponent, PropType } from 'vue';
import { RouteLocationRaw } from 'vue-router';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { SelectOption } from '../form/module.js';

//
// i18n
// - deconf.navigationBar.unavailable - Unavailable string in the menu
// - deconf.navigationBar.login - The title of the Log In menu item
// - deconf.navigationBar.profile - The title of the Profile menu item
// - deconf.navigationBar.register - The title of the Register menu item
// - deconf.navigationBar.interpret - The title of the Interpret menu item
//
// icons
// - fas user
//
// sass
// - $navigationBar-activeColor
// - $navigationBar-activeBackground
// - $navigationBar-mobileBackground
// - $navigationBar-mobileColor
//

export default defineComponent({
  name: 'NavigationBar',
  components: { FontAwesomeIcon },
  data() {
    return {
      isShowingMenu: false,
    };
  },
  props: {
    isLoggedIn: { type: Boolean, required: true },
    isInterpreter: { type: Boolean, required: true },
    routes: { type: Array as PropType<AppRoute[]>, required: true },
    languages: { type: Array as PropType<SelectOption[]>, default: null },
    links: {
      type: Array as PropType<string[]>,
      default: () => ['login', 'register', 'interpret', 'profile'],
    },
  },
  computed: {
    activeClasses(): unknown {
      return {
        'is-active': this.isShowingMenu,
      };
    },
    homeRoute(): RouteLocationRaw {
      return { name: Routes.Atrium };
    },
    interpretRoute(): RouteLocationRaw {
      return { name: Routes.InterpretHome };
    },
    profileRoute(): RouteLocationRaw {
      return { name: Routes.Profile };
    },
    loginRoute(): RouteLocationRaw {
      return { name: Routes.Login };
    },
    registerRoute(): RouteLocationRaw {
      return { name: Routes.Register };
    },
  },
  methods: {
    toggleMenu(): void {
      this.isShowingMenu = !this.isShowingMenu;
    },
    showLink(link: string) {
      return this.links.includes(link);
    },
  },
});
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
