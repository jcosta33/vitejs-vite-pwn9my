<template>
  <div class="field" :class="{ 'is-horizontal': config.isHorizontal }">
    <label class="label" :for="`${config.id}`" v-if="config.label">
      {{ config.label }}
      <span
        class="has-text-dark is-size-7 tooltip is-tooltip-top"
        :data-tooltip="config.info"
        v-if="config.info"
        style="vertical-align: bottom"
      >*</span>
    </label>
    <div class="field-body">
      <div class="control">
        <div class="select is-fullwidth" :class="{ 'is-loading': !config.options }">
          <select
            @change="updateValue(($event.target as any).value)"
            :value="config.default ? 'default' : state.value"
          >
            <option v-if="config.default" value="default" disabled selected>{{ config.default }}</option>
            <option
              v-for="  option in config.options"
              :value="option.value"
              :key="option.value"
              :selected="option.value === config.value"
            >{{ option.label }}</option>
          </select>
        </div>
        <span class="label-error" v-if="config.error">
          <span class="icon">
            <i class="material-icons-outlined">info</i>
          </span>
          <span style="vertical-align: text-bottom">{{ config.message }}</span>
        </span>
        <span class="label-message" v-if="!config.error && config.message">
          <span class="icon">
            <i class="material-icons-outlined">info</i>
          </span>
          <span style="vertical-align: text-bottom">{{ config.message }}</span>
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
// @ is an alias to /src

import { defineComponent, PropType, reactive, watch } from 'vue';
import { ISelect } from '.';

export default defineComponent({
  props: {
    config: {
      type: Object as PropType<ISelect>,
      required: true,
    },
    modelValue: [Number, String],
  },

  setup(props, { emit }) {
    const state = reactive({
      value: props.config.value
    });

    emit('update:modelValue', props.config.value);

    const updateValue = (value: string) => {
      emit('update:modelValue', value);

      if (props.config.error) {
        props.config.error = false;
        props.config.message = undefined;
      }
      if (props.config.onChange) {
        props.config.onChange(value);
      }
    };

    return { updateValue, state };
  },
});
</script>
