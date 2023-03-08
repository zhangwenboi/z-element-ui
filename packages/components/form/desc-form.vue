<!-- @format -->

<template>
  <el-form :model="form" :rules="rules" ref="elForm" v-bind="formAttrs">
    <el-descriptions ref="ElDescriptions" v-bind="$attrs" :value="undefined" :border="border" v-for="(row, rowIndex) in dynamicData" :key="row._key_">
      <slot name="title" slot="title" v-bind="{ row, rowIndex }"></slot>
      <slot name="extra" slot="extra" v-bind="{ row, rowIndex }"></slot>
      <slot name="prepend" v-bind="{ row, rowIndex }"></slot>
      <el-descriptions-item v-for="(item, colIndex) in agItems" v-if="getVif({ item, colIndex, row, rowIndex })" v-bind="getLayoutItemAttrs(item)" label="" :key="item.prop">
        <render-component v-if="item.label" :render="item.label" :class="getRequiredAsteriskClass(item, rowIndex)" slot="label" />
        <agel-form-item
          v-show="getVshow({ item, colIndex, row, rowIndex })"
          label=""
          label-width="0px"
          v-bind="getFormItemAttrs({ item, colIndex, row, rowIndex })"
          :component="getComponentAttrs({ item, colIndex, row, rowIndex })"
        />
      </el-descriptions-item>
      <slot name="append" v-bind="{ row, rowIndex }"></slot>
    </el-descriptions>
  </el-form>
</template>
<script>
import formMixin from './formMixin';

export default {
  name: 'zDescFormDemo',
  mixins: [formMixin],
  computed: {},
  data() {
    return {};
  }
};
</script>
<style scoped></style>
