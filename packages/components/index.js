/** @format */

import Table from './table/index.vue';
import Checkbox from './form-item/items/checkbox.vue';
import Radio from './form-item/items/radio.vue';
import Select from './form-item/items/select.vue';
import Datepicker from './form-item/items/datePicker.vue';
import TimePicker from './form-item/items/timePicker.vue';
import Switch from './form-item/items/switch.vue';
import EditTable from './edit-table/index.vue';
import Theme from './theme/index.vue';
import FormItem from './form-item/index.vue';
import GridForm from './form/grid-form.vue';
import DescForm from './form/desc-form.vue';
import InlineForm from './form/inline-form.vue';
import VirtualTable from './virtual-table/index.vue';
import { config } from '../utils/config';
export const comList = {
  Table,
  Checkbox,
  Radio,
  Select,
  Datepicker,
  TimePicker,
  Switch,
  EditTable,
  Theme,
  FormItem,
  GridForm,
  DescForm,
  InlineForm,
  VirtualTable
};
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return;
  // 遍历注册全局组件
  Object.keys(comList).forEach((e) => Vue.component(config.tagPrefix + e, comList[e]));
};

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  ...comList
};
