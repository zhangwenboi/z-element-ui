/** @format */

import copy from './copy';
import dialogDrag from './dialogDrag';
import enter from './enter';
import errImg from './errImg';
import preventShake from './preventShake';
import outside from './outside';
import limit from './limit';
import drag from './drag';
import contextmenu from './contextmenu.js';
const directives = {
  copy,
  dialogDrag,
  enter,
  errImg,
  preventShake,
  outside,
  limit,
  drag,
  contextmenu
};
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue, options) {
  // 判断是否安装
  if (install.installed) return;
  // 遍历注册全局组件
  Object.keys(directives).forEach((e) => {
    Vue.directive(e, directives[e](options?.[e]));
  });
};
// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install
};
