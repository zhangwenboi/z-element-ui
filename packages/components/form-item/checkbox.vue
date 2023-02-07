<!-- @format -->

<template>
  <el-checkbox-group v-model="form[$attrs.prop]" v-bind="$attrs" v-on="funcs">
    <el-checkbox v-for="(item, index) in groupList" v-bind="$attrs" :label="item.value" :key="'item' + index">{{ item.label }}</el-checkbox>
  </el-checkbox-group>
</template>
<script>
import formMixin from './form-mixin.js';
export default {
  name: 'zCheckbox',
  components: {},
  mixins: [formMixin],

  computed: {
    groupList: (e) => e.$attrs.list
  }
};
</script>
