/** @format */

import { getIncludeAttrs, findRef, uuid } from '../../utils/utils';
import { form as formAttr, inputType } from '../../utils/attrs';
import formItem from '../form-item/index.vue';
import renderComponent from '../render-component';

export default {
  components: {
    formItem,
    renderComponent
  },
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
    textModel: {
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
        if (!item?.__uuid__) {
          item.__uuid__ = uuid();
        }
        return item;
      });
      return uidData;
    }
  },
  methods: {
    getVif(item, ...args) {
      const { row } = args;
      return typeof item.display == 'function' ? item.display(row || this.form) : item.display || true;
    },
    getVshow(item, ...args) {
      const { row } = args;
      return typeof item.show == 'function' ? item.show(row || this.form) : item.display || true;
    },
    formAttrs() {
      return getIncludeAttrs(formAttr, { ...this.$props, ...this.$attrs });
    },
    getRef(prop = 'elForm') {
      return findRef(this, prop);
    },
    validate(callback, erroCallback) {
      this.$refs.elForm.validate((is, errInfo) => {
        if (is) {
          callback && callback(this.value);
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
    getFormItemAttrs(item, index, ...args) {
      const formItem = { ...item };
      if (this.textModel || formItem.textModel) {
        const value = args.length ? args[0][item.prop] : this.form[item.prop];
        formItem.render = () => (formItem.format && formItem.format instanceof Function ? formItem.format({ value, index, ...args }) : !!value ? String(value) : '');
        formItem.isTag = false;
        return formItem;
      }
      const rules = [].concat(formItem.rules || [], (this.rules || {})[formItem.prop] || []);
      const label = typeof formItem.label == 'string' ? formItem.label : '';
      if (formItem.required && rules.length === 0) {
        delete formItem.required;
        formItem.rules = [
          {
            required: true,
            message: label + '必填',
            trigger: formItem.render instanceof Function ? 'change' : inputType.some((e) => formItem.render?.includes(e)) ? 'blur' : 'change'
          }
        ];
      } else {
        formItem.rules = rules;
      }
      formItem.prop = args.length ? this.getItemProp(formItem.prop, args[1]) : formItem.prop;
      return formItem;
    },
    getItemProp(prop, rowIndex) {
      return ['dynamicData', String(rowIndex), String(prop)].join('.');
    }
  }
};
