/** @format */

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  computed: {
    funcs() {
      let funcitonList = {};
      for (const key in this.$attrs) {
        if (Object.hasOwnProperty.call(this.$attrs, key) && typeof this.$attrs[key] === 'function') {
          funcitonList[key] = this.$attrs[key];
        }
      }
      return funcitonList;
    },
    Value: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
};
