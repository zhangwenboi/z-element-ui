/** @format */

export default {
  props: {
    props: {
      type: Object,
      default: () => {
        return { label: 'label', value: 'value' };
      }
    },
    data: { type: [Array, Function, Promise, String], default: () => [] }
  },
  data() {
    return {
      proxyOptions: [],
      optionsLoading: false
    };
  },

  watch: {
    data: {
      immediate: true,
      handler: 'getOptions'
    }
  },
  methods: {
    async getOptions() {
      let options = this.data || [];
      this.proxyOptions = [];
      if (Array.isArray(options)) {
        this.proxyOptions = this.transformOptions(options);
      } else if (typeof options == 'string') {
        this.proxyOptions = this.transformOptions(options.split(',').filter((v) => v));
      } else if (typeof options == 'function') {
        this.optionsLoading = true;
        this.proxyOptions = this.transformOptions(await options());
        this.optionsLoading = false;
      } else if (options instanceof Promise) {
        this.optionsLoading = true;
        this.proxyOptions = this.transformOptions(await options);
        this.optionsLoading = false;
      }
    },
    // 转化成标准的 [{label,value}] 结构
    transformOptions(options) {
      if (options && options.length > 0) {
        return options
          .map((option) => {
            if (option.constructor == Object) {
              const props = this.props;
              const value = option[props.value];
              return {
                ...option,
                label: String(option[props.label]),
                value: this.isProxyStrValue && typeof value === 'number' ? String(value) : value,
                data: this.transformOptions(option.data || [])
              };
            } else if (option.constructor == String || option.constructor == Number) {
              return {
                label: String(option),
                value: this.isProxyStrValue && typeof option === 'number' ? String(option) : option
              };
            }
            return false;
          })
          .filter((v) => v !== false);
      }
      return [];
    }
  }
};
