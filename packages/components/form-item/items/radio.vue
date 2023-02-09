<!-- @format -->

<template>
  <el-radio-group @input="input" v-bind="$attrs" v-on="funcs">
    <el-radio v-for="item in list" :key="item.value" v-bind="$attrs" :label="item.value">{{ item.label }}</el-radio>
  </el-radio-group>
</template>

<script>
import formMixin from './form-mixin';
export default {
  name: 'zRadio',
  model: {
    prop: 'value',
    event: 'input'
  },

  mixins: [formMixin],
  computed: {
    list: (e) => e.$attrs.list
  },
  mounted() {},
  methods: {
    input(e) {
      this.$emit('input', e);
    }
  }
};
</script>
