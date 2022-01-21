<template>
  <div
    class="dropdown"
    :class="{ 'is-active': state.isActive, 'is-right': config.position === 'right' }"
    @mouseleave="config.isHover ? close() : () => {}"
  >
    <div v-if="!config.isHover" class="dropdown-trigger" @click="state.isActive ? close() : open()">
      <slot name="trigger"></slot>
    </div>
    <div v-if="config.isHover" class="dropdown-trigger" @mouseover="open()">
      <slot name="trigger"></slot>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu" @click="close()">
      <div class="dropdown-content">
        <slot></slot>
      </div>
    </div>
    <div class="dropdown-overlay" v-if="!config.isHover && state.isActive" @click="close()"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';
import { IDropdown } from '.';

export default defineComponent({
  props: {
    config: {
      type: Object as PropType<IDropdown>,
      required: true,
    },
    value: String,
  },

  setup(props) {
    const state = reactive({
      isActive: false,
      openClick: true,
    });
    state.isActive = !!props.config.isActive;
    if (props.config.isActive === undefined) {
      props.config.isActive = false;
    }

    const open = () => {
      state.isActive = true;
    };

    const close = () => {
      state.openClick = false;
      if (props.config.close) {
        props.config.close();
      } else {
        if (props.config.onClose) {
          props.config.onClose();
        }

        state.isActive = false;
      }
    };

    return { open, close, state };
  },
});
</script>
<style lang="scss">
@import './src/bulma/components/dropdown';
.dropdown-overlay {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 4rem;
  z-index: 1;
}
</style>
