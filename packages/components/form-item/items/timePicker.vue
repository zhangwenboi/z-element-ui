<!-- @format -->

<template>
  <div>
    <el-time-select
      v-model="Value"
      v-if="type === 'time-select'"
      v-bind="$attrs"
      v-on="funcs"
      :placeholder="$attrs.placeholder || '选择时间'"
    >
    </el-time-select>
    <el-time-picker
      v-model="Value"
      v-else
      v-bind="$attrs"
      v-on="funcs"
      :placeholder="$attrs.placeholder || '选择时间'"
    >
    </el-time-picker>
  </div>
</template>

<script>
import formMixins from './form-mixin';
export default {
  name: 'timePicker',
  mixins: [formMixins],
  props: {
    type: { type: String, default: 'time-select' },
    value: {
      type: [Array, String, Number]
    }
  }
};
</script>
