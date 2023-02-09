/** @format */

import zTable from './components/table/table.vue';
import zCheckbox from './components/form-item/items/checkbox.vue';
import zRadio from './components/form-item/items/radio.vue';
import zInput from './components/form-item/items/input.vue';
import zSelect from './components/form-item/items/select.vue';
import zDatepicker from './components/form-item/items/datePicker.vue';
import zTimePicker from './components/form-item/items/timePicker.vue';
import zSwitch from './components/form-item/items/switch.vue';
export const components = {
  zTable,
  zCheckbox,
  zRadio,
  zInput,
  zSelect,
  zDatepicker,
  zTimePicker,
  zSwitch
};
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return;
  // 遍历注册全局组件
  Object.keys(components).forEach((e) => Vue.component(e, components[e]));
};

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install
};
