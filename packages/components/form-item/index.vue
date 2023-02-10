<!-- @format -->

<template>
  <el-form-item v-bind="$attrs" :prop="prop" class="z-form-item" ref="elFormItem">
    <slot slot="label" name="label">
      <render-component v-if="label" :render="label" />
    </slot>
    <slot>
      <render-component v-if="option.name" :render="option.name" v-bind="option" v-on="option.on" :is-tag="option.isTag" :ref="prop || 'component'" v-model="form[prop]">
        <template v-for="(slot, staticName) in slots.staticSlots" #[staticName]>
          <render-component :key="staticName" :render="slot" />
        </template>
        <template v-for="(slot, scopedName) in slots.scopedSlots" #[scopedName]="slotProps">
          <render-component :key="scopedName" :render="slot" v-bind="slotProps" />
        </template>
      </render-component>
    </slot>
  </el-form-item>
</template>

<script>
import renderComponent from '../render-component.jsx';
import { getPropByPath } from 'element-ui/src/utils/util';
import itemTable from '../table/table.vue';
import itemCheckbox from './items/checkbox.vue';
import itemRadio from './items/radio.vue';
import itemInput from './items/input.vue';
import itemSelect from './items/select.vue';
import itemDatepicker from './items/datePicker.vue';
import itemTimePicker from './items/timePicker.vue';
import itemSwitch from './items/switch.vue';
import itemEditTable from '../edit-table/edit-table.vue';
export default {
  name: `z-form-item`,
  inheritAttrs: false,
  components: {
    renderComponent,
    itemTable,
    itemCheckbox,
    itemRadio,
    itemInput,
    itemSelect,
    itemDatepicker,
    itemTimePicker,
    itemSwitch,
    itemEditTable
  },
  inject: ['elForm'],
  props: {
    prop: String,
    label: [String, Number, Object, Array, Function],
    option: {
      type: Object,
      required: true
    },
    defaultValue: {},
    form: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    field() {
      return getPropByPath(this.elForm.model, this.prop, true) || {};
    },
    slots() {
      let slots = this.option.slots || {};
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
      if (this.prop && this.prop.indexOf('_uid_') === -1 && !this.field.o.hasOwnProperty(this.field.k)) {
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
