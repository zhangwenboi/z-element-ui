/** @format */

export default {
  model: {
    prop: 'value',
    event: 'changeData'
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
    }
  },
  methods: {
    changeData(e) {
      this.$emit('changeData', e);
    }
  }
};
