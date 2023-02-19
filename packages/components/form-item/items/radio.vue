<!-- @format -->

<template>
  <span v-if="optionsLoading">
    <i class="el-icon-loading" style="width: inherit; height: inherit"></i>
  </span>
  <el-radio-group
    v-else-if="proxyOptions.length > 0"
    ref="ref"
    v-model="Value"
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
  </el-radio-group>
  <component
    v-else
    ref="ref"
    :is="is"
    v-model="Value"
    v-bind="getProps($attrs)"
    v-on="$listeners"
  >
    <template v-slot:default>
      <slot name="default" />
    </template>
  </component>
</template>

<script>
import optionsMinxin from "./optionsMinxin";
import formMixin from "./form-mixin";
import { getIncludeAttrs } from "../../../utils/utils";

const propsKeys = [
  "label",
  "disabled",
  "border",
  "size",
  "name",
  "style",
  "class",
];
const groupPropsKyes = ["size", "disabled", "text-color", "fill"];

export default {
  name: "zRadio",
  inheritAttrs: false,
  mixins: [optionsMinxin, formMixin],
  props: {
    value: {
      type: [String, Number, Boolean],
      default: "",
    },
    button: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    is() {
      return this.button ? "el-radio-button" : "el-radio";
    },
  },
  methods: {
    getProps(traget, type = "props") {
      return getIncludeAttrs(
        type === "group" ? groupPropsKyes : propsKeys,
        traget
      );
    },
  },
  install(vue) {
    vue.component(this.name, this);
  },
};
</script>
