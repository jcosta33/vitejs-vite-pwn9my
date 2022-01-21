<template>
  <div class="offcanvas" :class="{ 'is-active': config.isActive, 'is-large': config.isLarge }">
    <div class="offcanvas-backdrop" @click="close()"></div>
    <div class="offcanvas-content">
      <header class="offcanvas-head">
        <slot name="header"></slot>
      </header>
      <section class="offcanvas-body">
        <slot></slot>
      </section>
      <footer class="offcanvas-foot">
        <slot name="footer"></slot>
      </footer>
      <!-- <button class="button is-black mobile-close is-hidden-tablet" @click="close()">Back</button> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IOffcanvas } from '.';

export default defineComponent({
  props: {
    config: {
      type: Object as PropType<IOffcanvas>,
      required: true,
    },
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
@import "./src/bulma/elements/table";

.offcanvas {
  @extend %overlay;
  position: relative;
  align-items: right;
  align-content: right;
  flex-direction: column;
  text-emphasis: right;
  overflow: hidden;
  position: fixed;
  z-index: -1;
  display: flex;

  // Modifiers
  &.is-large {
    .offcanvas-content {
      width: 60rem;
    }
  }
  &.is-active {
    z-index: 9999;

    .offcanvas-content {
      right: 0;
      bottom: 0;
      top: 0;
      @include mobile {
        left: 17.5vw;
      }
    }
  }
  .offcanvas-head {
    margin-bottom: 1rem;
  }
  .offcanvas-head,
  .offcanvas-foot,
  .offcanvas-body {
    padding: 1.5rem;
  }
  .offcanvas-content {
    position: fixed;
    right: -120vw;
    height: 100%;
    overflow: auto;
    min-width: 30rem;
    background: $white;
    max-width: 100%;
  }
  &.is-active {
    .offcanvas-backdrop {
      display: block;
    }
    .mobile-close {
      display: block;
    }
  }
  .mobile-close {
    display: none;
    position: fixed;
    top: calc(100% - 44px);
    right: 0;
    left: 0;
    border-radius: 0;
    width: 100%;
  }
}

.offcanvas-backdrop {
  @extend %overlay;
  background: rgba(0, 0, 0, 0.5);
  display: none;
}
</style>
