<!-- @format -->

<template>
  <el-form-item v-bind="formItemAttrs" :prop="prop" class="z-form-item" ref="elFormItem" :label="label">
    <template v-if="!isString">
      <slot slot="label" name="label">
        <render-component :render="labelSuffix" />
      </slot>
    </template>
    <slot>
      <render-component v-if="render" :render="render" v-bind="{ field, vmodel: field.o, ...option }" v-on="on" :is-tag="isTag" :ref="prop || 'component'" v-model="Value" :placeholder="placeholder">
        <template v-for="(slotItem, staticName) in slot.staticSlots" #[staticName]>
          <render-component :key="staticName" :render="slotItem" />
        </template>
        <template v-for="(slotItem, scopedName) in slot.scopedSlots" #[scopedName]="slotProps">
          <render-component :key="scopedName" :render="slotItem" v-bind="slotProps" />
        </template>
      </render-component>
    </slot>
  </el-form-item>
</template>

<script>
const inputType = ['input', 'textarea', 'number', 'password', 'transfer'];
const selectType = ['select', 'cascader', 'time-select', 'time-picker', 'date-picker'];
import renderComponent from '../render-component.jsx';
import { formItem } from '../../utils/attrs';
import { getIncludeAttrs } from '../../utils/utils';
import { getPropByPath } from 'element-ui/src/utils/util';
import zTable from '../table/index.vue';
import zCheckbox from './items/checkbox.vue';
import zRadio from './items/radio.vue';
import zSelect from './items/select.vue';
import zDatepicker from './items/datePicker.vue';
import zTimePicker from './items/timePicker.vue';
import zSwitch from './items/switch.vue';
export default {
  name: `zFormItem`,
  inheritAttrs: false,
  components: {
    renderComponent,
    zTable,
    zCheckbox,
    zRadio,
    zSelect,
    zDatepicker,
    zTimePicker,
    zSwitch
  },
  inject: ['elForm'],
  props: {
    prop: {
      type: String,
      required: true
    },
    render: [String, Function],
    label: [String, Number, Object, Array, Function],
    option: {
      type: Object,
      default: () => ({})
    },
    defaultValue: {},
    isTag: {
      type: Boolean,
      default: true
    },
    on: {
      type: Object,
      default: () => ({})
    },
    slots: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    field() {
      return getPropByPath(this.elForm.model, this.prop, true) || {};
    },
    Value: {
      get() {
        return this.field.v;
      },
      set(val) {
        this.field.o[this.field.k] = val;
      }
    },
    placeholder: {
      get() {
        if (this.option.placeholder) return this.option.placeholder;
        if (this.render.constructor === String) {
          const label = this.label || '';
          return inputType.some((e) => this.render.includes(e)) ? '请输入' + label : selectType.some((e) => this.render.includes(e)) ? '请选择' + label : '';
        }
        return this.option.placeholder || '';
      }
    },
    labelSuffix() {
      if (this.label.constructor === String) return this.label + (this.elForm?.labelSuffix || '');
      return this.label;
    },
    isString() {
      return this.label.constructor === String;
    },
    slot() {
      let slots = this.slots || {};
      let scopedSlots = {};
      let staticSlots = {};
      if (slots.constructor == Object) {
        for (const name in slots) {
          const slot = slots[name];
          if (slot.constructor == Function && slot.length > 0) {
            scopedSlots[name] = slot;
          } else {
            staticSlots[name] = slot;
          }
        }
      } else {
        staticSlots = { default: slots };
      }
      return { scopedSlots, staticSlots };
    },
    formItemAttrs() {
      return getIncludeAttrs(formItem, this.$attrs);
    }
  },
  watch: {
    'elForm.model': {
      immediate: true,
      handler(newv, oldv) {
        if (newv !== oldv) {
          this.setFieldDefaultValue();
        }
      }
    }
  },
  methods: {
    setFieldDefaultValue() {
      if (this.prop && this.prop.indexOf('__uuid__') === -1 && !this.field.o.hasOwnProperty(this.field.k)) {
        this.$set(this.field.o, this.field.k, this.defaultValue);
      }
    }
  }
};
</script>

<style>
.z-form-item {
  margin-bottom: 18px;
}

.z-form-item.el-form--label-top .el-form-item__label {
  padding: 0px;
}

.el-form--label-top .z-form-item .el-form-item__label,
.el-form--label-top .z-form-item .el-form-item__label {
  display: inline-block;
  padding: 0px 12px 0px 0px;
}

/*  对某些组件排版进行优化 */
.z-form-item.el-form-item--mini .el-slider__runway {
  margin: 12px 0px;
}
</style>
