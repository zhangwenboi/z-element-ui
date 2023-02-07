<!-- @format -->

<template>
  <div>
    <el-time-select v-if="type === 'time-select'" v-model="form[$attrs.prop]" v-bind="$attrs" v-on="funcs" :placeholder="$attrs.placeholder || '选择时间'"> </el-time-select>
    <el-time-picker v-else v-model="form[$attrs.prop]" v-bind="$attrs" v-on="funcs" :placeholder="$attrs.placeholder || '选择时间'"> </el-time-picker>
  </div>
</template>

<script>
import formMixins from './form-mixin';
export default {
  name: 'timePicker',
  mixins: [formMixins],
  props: { type: { type: String, default: 'time-select' } }
};
</script>
