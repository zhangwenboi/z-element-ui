<!-- @format -->

<template>
  <el-form :model="form" :rules="rules" ref="elForm" v-bind="formAttrs()">
    <template v-if="isDynamic">
      <template v-for="(row, rowIndex) in dynamicData">
        <slot name="prepend" v-bind="{ row, rowIndex }"></slot>
        <form-item v-for="(item, index) in items" :key="item.prop + row.__uuid__" v-bind="getFormItemAttrs(item, index, row, rowIndex)" />
        <slot name="append" v-bind="{ row, rowIndex }"></slot>
      </template>
    </template>
    <template v-else>
      <slot name="prepend"></slot>
      <form-item v-for="(item, index) in items" :key="item.prop" v-bind="getFormItemAttrs(item, index)" />
      <slot name="append"></slot>
    </template>
  </el-form>
</template>
<script>
import formMixin from './formMixin';
export default {
  name: 'zInlineFormDemo',
  mixins: [formMixin]
};
</script>
<style scoped></style>
