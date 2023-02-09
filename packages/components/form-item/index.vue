<!-- @format -->

/** @format */

<script lang="jsx">
import itemCheckbox from './items/checkbox.vue';
import itemInput from './items/input.vue';
import itemDatePicker from './items/datePicker.vue';
import itemRadio from './items/radio.vue';
import itemSelect from './items/select.vue';
import itemSwitch from './items/switch.vue';
import { h } from 'vue';
// import itemInputNumber from './items/inputNumber.vue';
// import itemText from './items/text';
// import itemUpload from './items/upload';
// TODO: 加入Int组件、 增加dateRanger组件
export default {
  name: 'zFormItem',
  model: {
    prop: 'value',
    event: 'change'
  },
  components: {
    'item-checkbox': itemCheckbox,
    'item-input': itemInput,
    'item-datePicker': itemDatePicker,
    'item-radio': itemRadio,
    'item-select': itemSelect,
    'item-switch': itemSwitch
    // itemInputNumber,
    // itemText
  },
  props: {
    noLabel: { type: Boolean, default: false },
    value: { type: Object, default: () => ({}) }
  },
  render(h) {
    const change = (e) => {
      this.$emit('change', e);
    };
    const props = {
      ...this.$props,
      ...this.$attrs
    };
    const { type, options, on, ...rest } = props;
    console.log('🚀 ~ props', props, rest);

    return this.$slots.default ? (
      <el-form-item {...{ props }} noLabel={this.noLabel}>
        {this.$slots.default}
      </el-form-item>
    ) : (
      <el-form-item {...{ props }} noLabel={this.noLabel}>
        {'item-' + type}
        <components value={this.value} onChange={change} is={'item-' + type} {...{ options, on }} />
      </el-form-item>
    );
  }
};
</script>
