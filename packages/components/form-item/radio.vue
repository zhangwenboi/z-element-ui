<!-- @format -->

<template>
  <el-radio-group v-model="form[$attrs.prop]" v-bind="$attrs" v-on="funcs">
    <el-radio v-for="item in list" :key="item.value" v-bind="$attrs" :label="item.value">{{ item.label }}</el-radio>
  </el-radio-group>
</template>

<script>
import functionMixin from './form-mixin';
export default {
  name: 'zRadio',
  mixins: [functionMixin],
  computed: {
    list: (e) => e.$attrs.list
  },
  mounted() {},
  methods: {}
};
</script>
