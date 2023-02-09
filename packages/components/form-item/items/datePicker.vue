<!-- @format -->

<template>
  <el-date-picker :type="$attrs.type" v-bind="$attrs" v-on="funcs" :pickerOptions="pickerOptions" :placeholder="$attrs.placeholder || '选择日期'"> </el-date-picker>
</template>

<script>
import formMixin from './form-mixin';
export default {
  name: 'zDatePicker',
  mixins: [formMixin],
  components: {},
  computed: {
    pickerOptions() {
      let pickerOptions = this.$attrs.pickerOptions;
      if (this.$attrs.disabledBefore) {
        return {
          ...pickerOptions,
          disabledDate: (time) => time.getTime() < Date.now() - 24 * 60 * 60 * 1000
        };
      } else if (this.$attrs.disabledAfter) {
        return {
          ...pickerOptions,
          disabledDate: (time) => time.getTime() > Date.now() - 24 * 60 * 60 * 1000
        };
      }
      return pickerOptions;
    }
  },

  methods: {}
};
</script>
