<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link :to="homeRoute" class="navbar-item" active-class="">
        <img
          :src="appBrand.image"
          :alt="appBrand.title"
          :title="appBrand.title"
          :width="appBrand.width"
          :height="appBrand.height"
        />
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
        </router-link>
      </div>
      <div class="navbar-end">
        <!-- 
          Show the owner brand if provided
        -->
        <div v-if="ownerBrand" class="navbar-item">
          <img
            :src="ownerBrand.image"
            :alt="ownerBrand.title"
            :title="ownerBrand.title"
            :width="ownerBrand.width"
            :height="ownerBrand.height"
          />
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
        <div v-if="isInterpreter" class="navbar-item">
          <router-link
            class="button is-secondary is-small"
            :to="interpretRoute"
          >
            {{ interpretTitle }}
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
            <span>{{ profileTitle }}</span>
          </router-link>
        </div>

        <!-- 
          Login Button
        -->
        <div class="navbar-item" v-if="!isLoggedIn">
          <div class="buttons">
            <router-link class="button is-light is-small" :to="loginRoute">
              {{ routeTitles.login }}
            </router-link>
            <!-- Register button -->
            <router-link class="button is-primary is-small" :to="registerRoute">
              {{ routeTitles.register }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { AppSettings } from '@/types';
import Vue, { Component } from 'vue';
import { Routes } from '@/constants';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export interface HeaderBrand {
  image: string;
  title: string;
  width: number;
  height: number;
}

export interface AppRoute {
  title: string;
  name: string;
  enabled: boolean;
  icon?: Component;
}

interface Data {
  isShowingMenu: boolean;
}

interface Props {
  appSettings: AppSettings;
  isLoggedIn: boolean;
  isInterpreter: boolean;
  routeTitles: {
    profile: string;
    interpret: string;
    login: string;
    register: string;
  };
  routes: AppRoute[];
  appBrand: HeaderBrand;
  ownerBrand?: HeaderBrand;
}

export default Vue.extend<Data, {}, {}, Props>({
  components: { FontAwesomeIcon },
  data() {
    return {
      isShowingMenu: false
    };
  },
  props: {
    appSettings: { type: Object, required: true },
    isLoggedIn: { type: Boolean, required: true },
    isInterpreter: { type: Boolean, required: true },
    routeTitles: { type: Object, required: true },
    routes: { type: Array, required: true },
    appBrand: { type: Object, required: true },
    ownerBrand: { type: Object, required: true }
  },
  computed: {
    activeClasses() {
      return {
        'is-active': this.isShowingMenu
      };
    },
    homeRoute() {
      return Routes.Atrium;
    },
    interpretRoute() {
      return Routes.InterpretHome;
    },
    interpretTitle() {
      return this.routeTitles.interpret;
    },
    profileRoute() {
      return Routes.Profile;
    },
    profileTitle() {
      return this.routeTitles.profile;
    },
    loginRoute() {
      return Routes.Login;
    },
    registerRoute() {
      return Routes.Register;
    }
  },
  methods: {
    toggleMenu() {
      this.isShowingMenu = !this.isShowingMenu;
    }
  }
});
</script>

<style lang="scss" scoped>
@mixin link {
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
    color: $primary;
    background-color: white;
  }
}

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
    background: $black;
    padding: 12px 0;
  }
  .navbar-end {
    border-top: 1px solid $grey-dark;
    padding-top: 12px;
  }
  .navbar-menu .navbar-item {
    color: $white;
    margin: 0 12px 0;
    border-radius: $radius;
    font-weight: bold;

    &:hover:not(.is-active) {
      background-color: inherit;
    }

    &.is-active {
      color: $primary;
      background-color: $white;
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

  @include link;
}
.navbar-item-icon {
  width: 3rem;
  height: 3rem;
  margin-right: 0.5rem;
}
</style>
