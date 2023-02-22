<template>
  <div>
    这是一个自定义组件{{ input }}
    <el-input v-model="input"> </el-input>
  </div>
</template>

<script>
export default {
  name: 'zCustomtDemo',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
  },
  computed: {
    input: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }

}
</script>

<style>
</style>