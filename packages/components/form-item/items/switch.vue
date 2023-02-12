<!-- @format -->

<template>
  <el-switch v-model="Value" @change="changeData" v-bind="$attrs" v-on="funcs"> </el-switch>
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
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>
