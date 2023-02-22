<!-- @format -->

<template>
  <el-switch v-model="Value" v-bind="$attrs" v-on="funcs"> </el-switch>
</template>

<script>
import formMixin from './form-mixin';
export default {
  name: 'zSwitch',
  mixins: [formMixin],
  components: {},
  props: {
    value: {
      type: [Boolean, String, Number],
      default: true
    }
  },

};
</script>
