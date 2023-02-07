<!-- @format -->

<template>
  <el-switch v-model="form[$attrs.prop]" v-bind="$attrs" v-on="funcs"> </el-switch>
</template>

<script>
import formMixin from './form-mixin';
export default {
  name: 'zSwitch',
  mixins: [formMixin],
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>
