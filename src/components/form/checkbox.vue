<template>
  <div class="field" :class="{ 'is-horizontal': config.isHorizontal }">
    <div class="control">
      <input
        :id="`${config.id}`"
        type="checkbox"
        :checked="config.value"
        v-on:change="updateValue()"
      />
      <label class="label" :for="`${config.id}`" style="display:inline-block;margin-left:.5rem">
        <span v-html="config.label"></span>
        <span
          class="has-text-dark is-size-7 tooltip is-tooltip-top"
          :data-tooltip="config.info"
          v-if="config.info"
          style="vertical-align: bottom"
        >*</span>
      </label>
    </div>
    <span class="label-message" v-if="!config.error && config.message">
      <span class="icon">
        <i class="material-icons-outlined">info</i>
      </span>
      <span style="vertical-align: text-bottom">{{ config.message }}</span>
    </span>
    <span class="label-error" v-if="config.error">
      <span class="icon">
        <i class="material-icons-outlined">info</i>
      </span>
      <span style="vertical-align: text-bottom">{{ config.message }}</span>
    </span>
  </div>
</template>
<script lang="ts">
// @ is an alias to /src
import { defineComponent, PropType } from 'vue';

import { ICheckbox } from '.';

export default defineComponent({
  props: {
    config: {
      type: Object as PropType<ICheckbox>,
      required: true,
    },
  },
  setup(props, { emit }) {
    emit('update:modelValue', props.config.value);

    const updateValue = (): void => {
      if (props.config.error) {
        props.config.error = false;
        props.config.message = undefined;
      }
      props.config.value = !props.config.value;
      emit('update:modelValue', props.config.value);

      if (props.config.onClick) {
        props.config.onClick(props.config.value ? 'on' : 'off');
      }
    };
    return { updateValue };
  },
});
</script>
