<!-- @format -->

<template>
  <el-select v-model="form[$attrs.prop]" v-bind="$attrs" v-on="funcs" :placeholder="$attrs.placeholder || '请选择'">
    <el-option v-for="item in list" :key="item.value" v-bind="$attrs" :label="item.label" :value="item.value"> </el-option>
  </el-select>
</template>

<script>
import formMixin from './form-mixin';
export default {
  name: 'zSelect',
  mixins: [formMixin],
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    list: (e) => e.$attrs.list
  },
  mounted() {},
  methods: {}
};
</script>
