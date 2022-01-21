<template>
  <article class="accordion" :class="{ 'is-active': state.isActive }">
    <div class="accordion-header toggle" @click="toggle()">
      <slot name="header"></slot>
      <button class="toggle" aria-label="toggle"></button>
    </div>
    <div class="accordion-body">
      <div class="accordion-content">
        <slot></slot>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  props: {
    isActive: Boolean,
  },

  setup(props) {
    const state = reactive({
      isActive: props.isActive,
    });
    const toggle = () => {
      state.isActive = !state.isActive;
    };
    return { state, toggle };
  },
});
</script>

<style lang="scss">
@import './src/bulma/components/accordion';
</style>
