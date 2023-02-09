
export default {
  name: 'compon',
  props: {
    render: {
      type: Function
    }
  },
  render() {
    console.log('🚀 ~ context', this.render(this.$attrs));
    return this.render(this.$attrs);
  }
};
