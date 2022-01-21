<template>
  <div class="modal" :class="{ 'is-active': config.isActive }">
    <div class="modal-background" @click="close()"></div>
    <div class="modal-card" :class="{ 'is-large': config.isLarge }" v-if="config.isCard">
      <header class="modal-card-head">
        <slot name="header"></slot>
        <button class="modal-close is-large" aria-label="close" @click="close()"></button>
      </header>
      <section class="modal-card-body">
        <slot></slot>
      </section>
      <footer class="modal-card-foot">
        <slot name="footer"></slot>
      </footer>
    </div>
    <div class="modal-content" v-if="!config.isCard">
      <slot></slot>
    </div>
    <button class="modal-close is-large" aria-label="close" v-if="!config.isCard" @click="close()"></button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { IModal } from '.';

export default defineComponent({
  props: {
    config: {
      type: Object as PropType<IModal>,
      required: true,
    },
    value: String,
  },

  setup(props) {
    const close = () => {
      if (props.config.close) {
        props.config.close();
      } else {
        if (props.config.onClose) {
          props.config.onClose();
        }

        props.config.isActive = false;
      }
    };
    return { close };
  },
});
</script>

<style lang="scss">
@import "./src/bulma/components/modal";

.modal {
  .modal-card {
    padding: 0;
  }
  .modal-card-foot {
    .buttons {
    }
  }
  .modal-card-foot:empty {
    display: none;
  }
  .modal-card-body {
    max-height: 84vh;
    overflow: auto;
  }
  .modal-card-head {
    .title {
      margin: 0 !important;
    }
  }
}
</style>
