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
    <figure
      class="image"
      v-if="isUrl(config.message || '')"
      style="border: 1px solid #f1f1f1; border-radius: 4px; margin-top: 1.75rem"
    >
      <img :src="config.message" />
    </figure>

    <div class="field-body file-layout file has-name" v-if="config.type === 'file'">
      <div class="columns" style="margin-bottom: 0">
        <div class="column" style="padding-bottom: 0">
          <label class="file-label">
            <input
              class="file-input"
              :name="config.name"
              :type="config.type"
              :placeholder="config.placeholder"
              :disabled="config.disabled === true"
              @change="updateFile($event.target as HTMLInputElement)"
            />
            <span class="file-cta">
              <span class="file-icon">
                <i class="material-icons-outlined">cloud_upload</i>
              </span>
              <!-- <span class="file-label">Choose a file…</span> -->
            </span>
            <span
              class="file-name"
              v-if="(modelValue && typeof modelValue === 'object' && modelValue.name && modelValue.name !== '') || state.fileName !== ''"
            >{{ modelValue && typeof modelValue === 'object' && modelValue.name !== '' ? modelValue.name : state.fileName }}</span>
            <span
              class="file-name has-text-grey"
              v-if="(!modelValue || typeof modelValue !== 'object' || !modelValue.name || modelValue.name === '') && state.fileName === ''"
            >{{ config.placeholder }}</span>
          </label>
        </div>
        <div
          class="column"
          style="max-width: 4rem; padding-bottom: 0"
          v-if="(modelValue && typeof modelValue === 'object' && modelValue.name && modelValue.name !== '') || state.fileName !== ''"
        >
          <button class="button is-danger is-pulled-right" style="min-width: 0" @click="onDelete()">
            <span class="icon">
              <i class="material-icons-outlined">delete</i>
            </span>
          </button>
        </div>
      </div>
      <a v-if="config.file" target="_blank" class="file-link">{{ config.file.name }}</a>
      <span class="label-message" v-if="!config.error && config.message && !isUrl(config.message)">
        <span class="icon">
          <i class="material-icons-outlined">info</i>
        </span>
        <span style="vertical-align: text-bottom">{{ config.message }}</span>
      </span>
      <a
        :href="config.message"
        target="_blank"
        class="label-message"
        v-if="!config.error && config.message && isUrl(config.message)"
      >
        <span style="vertical-align: text-bottom; overflow-wrap: break-word">{{ config.message }}</span>
      </a>
      <span class="label-error" v-if="config.error">
        <span class="icon">
          <i class="material-icons-outlined">info</i>
        </span>
        <span style="vertical-align: text-bottom">{{ config.message }}</span>
      </span>
    </div>
    <div class="field-body" v-if="config.type !== 'file'">
      <div class="field">
        <div
          class="control"
          :class="{ 'has-icons-left': config.icon, 'is-loading': config.loading }"
        >
          <input
            class="input"
            :name="config.name"
            :type="config.type"
            :placeholder="config.placeholder"
            :disabled="config.disabled === true"
            :maxlength="config.maxLength ? config.maxLength : 500"
            :max="config.maxValue ? config.maxValue : 500"
            :value="state.value"
            @focus="onFocus"
            @blur="onBlur"
            v-on:change="updateValue(($event.target as HTMLInputElement).value, $event)"
            @input="($event) => updateValue(($event.target as HTMLInputElement).value, $event)"
          />
          <span class="icon is-small is-left" v-if="config.icon">
            <i class="material-icons-outlined">{{ config.icon }}</i>
          </span>
          <a
            v-if="config.file"
            target="_blank"
            class="file-link"
          >{{ config.file.name }}</a>
          <span
            class="label-message"
            v-if="!config.error && config.message && !isUrl(config.message)"
          >
            <span class="icon">
              <i class="material-icons-outlined">info</i>
            </span>
            <span style="vertical-align: text-bottom">{{ config.message }}</span>
          </span>
          <a
            :href="config.message"
            target="_blank"
            class="label-message"
            v-if="!config.error && config.message && isUrl(config.message)"
          >
            <span
              style="vertical-align: text-bottom; overflow-wrap: break-word"
            >{{ config.message }}</span>
          </a>
          <span class="label-error" v-if="config.error">
            <span class="icon">
              <i class="material-icons-outlined">info</i>
            </span>
            <span style="vertical-align: text-bottom">{{ config.message }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.field {
  max-width: 100%;
}
.file-layout {
  display: block;
}
.file,
.file-label {
  width: 100%;
  .file-name {
    width: 100%;
    max-width: none;
  }
}
.file-link {
  color: $text;
  font-size: $size-7;
}
</style>
<script lang="ts">
// @ is an alias to /src
import { defineComponent, PropType, reactive } from 'vue';

import useUtils from '@/composition/utils';
import { IInput } from '.';

export default defineComponent({
  props: {
    config: {
      type: Object as PropType<IInput>,
      required: true,
    },
    modelValue: [Number, String, Object, File],
  },

  setup(props, { emit }) {
    const { isUrl } = useUtils();
    const state = reactive({
      fileName: '',
      prevValue: '',
      value: props.config.value
    });

    const onFocus = (e: Event): void => {
      if (props.config.onFocus) {
        props.config.onFocus(e);
      }
    };

    const updateFile = ($input: HTMLInputElement): void => {
      if (props.config.error) {
        props.config.error = false;
        props.config.message = undefined;
      }
      if ($input.files && $input.files[0]) {
        // Clear previous file
        emit('update:modelValue', $input.files[0]);

        state.fileName = $input.files[0].name;

        if (props.config.onFileSelect) {
          props.config.onFileSelect($input.files[0]);
        } else {
          props.config.file = undefined;
        }
        $input.value = '';
        props.config.message = '';
      }
    };

    const onBlur = (): void => {
      if (props.config.onBlur) {
        props.config.onBlur();
      }
    };

    const onDelete = (): void => {
      if (props.config.onDelete) {
        props.config.onDelete();
      }
      state.fileName = '';
      emit('update:modelValue', '');
    };

    const updateValue = (value: string, $event: Event): void => {
      if (props.config.error) {
        props.config.error = false;
        props.config.message = undefined;
      }
      if (!props.config.maxValue || props.config.maxValue > parseInt(value, 10)) {
        state.prevValue = value;
        state.value = value;
        if (props.config.type === 'number') {
          emit('update:modelValue', parseInt(value, 10));
        } else {
          emit('update:modelValue', value);
        }
        if (props.config.onInput) {
          props.config.onInput(value);
        }
      } else if (value && props.config.maxValue && $event.target) {
        // eslint-disable-next-line no-param-reassign
        (<HTMLInputElement>$event.target).value = state.prevValue;
      }
    };

    emit('update:modelValue', props.config.value);
    return {
      onBlur,
      updateValue,
      updateFile,
      onFocus,
      onDelete,
      isUrl,
      state,
    };
  },
});
</script>
