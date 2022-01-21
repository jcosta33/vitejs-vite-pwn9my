<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import Navbar from '@/components/navbar.vue'
import { reactive } from 'vue';
import { useStore } from 'vuex';
import router from './router';

const store = useStore();

const state = reactive({
  show_navigation: true
})

const localAuth = localStorage.getItem('ehub-user-auth');

if (localAuth) {
  store.commit('setLogin', localAuth);
  state.show_navigation = true;
} else {
  state.show_navigation = false;
  router.push('/login')
}

store.subscribe(mutation => {
  if (mutation.type === 'setLogin') {
    state.show_navigation = true;
  }
  if (mutation.type === 'setLogout') {
    state.show_navigation = false;
  }
})

</script>

<template>
  <Navbar :show-navigation="state.show_navigation" />
  <div class="container">
    <section class="section">
      <router-view />
    </section>
  </div>
</template>

<style lang="scss">
#app {
  .material-icons-outlined {
    font-size: $size-6;
  }
}
</style>