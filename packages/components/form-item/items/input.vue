<!-- @format -->

<template>
  <el-input v-model="Value" @input="input" v-bind="$attrs" v-on="funcs" :placeholder="$attrs['placeholder'] || '请输入内容'"> </el-input>
</template>

<script>
import formMixin from './form-mixin.js';
export default {
  name: 'zInput',
  components: {},
  model: {
    value: 'Value',
    event: 'input'
  },
  data() {
    return { Value: this.value };
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },
  mixins: [formMixin],
  computed: {},

  methods: {
    input(e) {
      this.$emit('input', e);
    }
  }
};
</script>
