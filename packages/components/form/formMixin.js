/** @format */
import { getIncludeAttrs, findRef, uuid } from '../../utils/utils';
import { form as formAttr, inputType } from '../../utils/attrs';
export default {
  props: {
    value: {
      type: [Object, Array],
      default: () => ({})
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    items: {
      type: Array,
      default: () => []
    },
    viewModel: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  inject: {
    elForm: {
      default: null
    }
  },
  computed: {
    isDynamic: {
      get() {
        return this.value instanceof Array;
      }
    },
    form: {
      get() {
        if (this.isDynamic) {
          return { dynamicData: this.value };
        }
        return this.value;
      }
    },
    dynamicData() {
      const uidData = this.form.dynamicData?.map((item) => {
        if (!item?._uuid_) {
          item._uuid_ = uuid(8, 2);
        }
        return item;
      });
      return uidData;
    }
  },
  methods: {
    formAttrs() {
      return getIncludeAttrs(formAttr, { ...this.$props, ...this.$attrs });
    },
    getRef(prop = 'elForm') {
      return findRef(this, prop);
    },
    validate(callback, erroCallback) {
      this.$refs.elForm.validate((is, errInfo) => {
        if (is) {
          callback && callback(this.value.data);
        } else {
          erroCallback && erroCallback(errInfo);
        }
      });
    },
    resetFields() {
      this.$refs.elForm.resetFields();
    },
    clearValidate(props) {
      this.$refs.elForm.clearValidate(props);
    },
    getIncludeAttrs(attrs, props) {
      return getIncludeAttrs(attrs, props);
    },
    findRef(context, refName) {
      return findRef(context, refName);
    },
    getFormItemAttrs(item, index, row, rowIndex) {
      const formItem = { ...item };
      if (this.viewModel || formItem.viewModel) {
        const value = row[item.prop];
        formItem.render = () => (formItem.viewFormat ? formItem.viewFormat({ value, formItem, index, row, rowIndex }) : String(value));
        formItem.isTag = false;
        return formItem;
      }
      const prop = this.getItemProp(formItem.prop, rowIndex);
      const rules = [].concat(formItem.rules || [], (this.formAttrs.rules || {})[formItem.prop] || []);
      const label = typeof formItem.label == 'string' ? formItem.label : '';
      if (formItem.render.constructor !== Function && formItem.required && rules.length === 0) {
        formItem.required = undefined;
        formItem.rules = [
          {
            required: true,
            message: label + '必填',
            trigger: inputType.includes(formItem.render) ? 'blur' : 'change'
          }
        ];
      }

      formItem.prop = prop;
      return formItem;
    },
    getItemProp(prop, rowIndex) {
      return ['dynamicData', String(rowIndex), String(prop)].join('.');
    }
  }
};
