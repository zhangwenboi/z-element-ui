/** @format */

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      Value: this.value
    };
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
      console.log('🚀 ~ e', e);

      this.$emit('change', e);
    }
  }
};
