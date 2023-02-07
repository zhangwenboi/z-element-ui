export default {
  props: { form: { type: Object, default: () => {} } },
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
  }
};
