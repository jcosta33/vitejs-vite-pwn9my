<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <span class="navbar-item">
          <img src="@/assets/logo.png" width="112" height="28" />
        </span>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start" v-if="showNavigation">
          <router-link to="/" class="navbar-item">Home</router-link>

          <a class="navbar-item">Exhibitors</a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">More</a>

            <div class="navbar-dropdown">
              <a class="navbar-item">About</a>
              <a class="navbar-item">Jobs</a>
              <a class="navbar-item">Contact</a>
              <hr class="navbar-divider" />
              <a class="navbar-item">Report an issue</a>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons" v-if="!showNavigation">
              <router-link to="/register" class="button is-primary">
                <strong>Sign up</strong>
              </router-link>
              <router-link to="/login" class="button is-light">Log in</router-link>
            </div>
            <div class="buttons" v-if="showNavigation">
              <router-link to="/login" class="button is-black">
                <span>Log out</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineProps({
  showNavigation: Boolean
});
</script>
<style lang="scss">
</style>
