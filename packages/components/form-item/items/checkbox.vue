<!-- @format -->

<template>
  <span v-if="optionsLoading">
    <i class="el-icon-loading" style="width: inherit; height: inherit"></i>
  </span>
  <el-checkbox-group
    v-model="Value"
    v-else-if="multiple"
    ref="ref"
    v-bind="getProps($attrs, 'group')"
    v-on="$listeners"
  >
    <component
      :is="is"
      v-for="(option, index) of proxyOptions"
      v-bind="getProps(option)"
      :key="option.value"
      :label="option.value"
    >
      <slot name="option" :option="option" :index="index">{{
        option.label
      }}</slot>
    </component>
  </el-checkbox-group>
  <component
    v-model="Value"
    v-else
    :is="is"
    ref="ref"
    v-bind="getProps($attrs)"
    v-on="$listeners"
  >
    <template v-slot:default>
      <slot name="default" />
    </template>
  </component>
</template>

<script>
import optionsMinxin from './optionsMinxin';
import { getIncludeAttrs } from '../../../utils/utils';

const propsKeys = ['label', 'true-label', 'false-label', 'disabled', 'border', 'size', 'name', 'checked', 'indeterminate', 'style', 'class'];

const groupPropsKyes = ['size', 'disabled', 'min', 'max', 'text-color', 'fill'];

export default {
  name: 'zCheckbox',
  inheritAttrs: false,
  mixins: [optionsMinxin],


  props: {
    value: {
      type: [String, Number, Boolean, Array],
      default: ''
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false
    },
    button: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    is() {
      return this.button ? 'el-checkbox-button' : 'el-checkbox';
    },
    multiple() {
      return this.data !== undefined;
    },
    proxyValue() {
      if (this.multiple) {
        if (this.isProxyStrValue) {
          return String(this.value)
            .split(',')
            .filter((v) => v.trim() != '');
        }
        return this.value;
      } else {
        return this.value === this.activeValue;
      }
    }
  },
  created() {
    if (!this.multiple && this.value !== this.activeValue && this.value !== this.inactiveValue) {
      this.$emit('input', this.inactiveValue);
    }
  },
  methods: {
    proxyInput(value) {
      if (value === this.value) return;
      if (this.multiple) {
        if (this.isProxyStrValue) {
          value = Array.isArray(value) ? value.join() : '';
        }
      } else {
        value = value ? this.activeValue : this.inactiveValue;
      }
      this.$emit('input', value);
    },
    getProps(traget, type = 'props') {
      return getIncludeAttrs(type === 'group' ? groupPropsKyes : propsKeys, traget);
    }
  },
  install(vue) {
    vue.component(this.name, this);
  }
};
</script>
