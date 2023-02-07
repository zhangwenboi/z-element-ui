<!-- @format -->

<template>
  <el-input v-model="form[$attrs.prop]" v-bind="$attrs" v-on="funcs" :placeholder="$attrs['placeholder'] || '请输入内容'"> </el-input>
</template>

<script>
import formMixin from './form-mixin.js';
export default {
  name: 'zInput',
  components: {},
  mixins: [formMixin],
  props: {
    form: { type: Object, default: () => ({}) }
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>
