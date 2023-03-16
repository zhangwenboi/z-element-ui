
import deepmerge from 'deepmerge';
import basicOptions from './utils/options.js';
// 引入公共组件、指令、过滤器
import componentsModule from './components';
import directivesModule from './directives';
import filtersModule from './filters';

// // 引入axios配置
// import axiosHttp from './http';

// 引入公共函数（数组函数、对象函数、日期函数、cookies函数）、引入验证正则、加密解密方法
// import { funcSet, Valid, setElement, setEncrypt } from './utils';
// import { errorHandle } from './utils/config';
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册1
const install = (Vue, option = {}) => {
  // 判断是否安装
  if (install.installed) return;
  const options = deepmerge(basicOptions, option);
  Vue.prototype.$Config = options;
  // setElement(Vue);
  // 遍历注册全局组件
  Vue.use(components);

  Vue.use(directives, options.directives);
  Vue.use(filters);
  // Vue.config.errorHandler = errorHandle;
  // Vue.prototype.$kicHttp = axiosHttp(options.axios);
  // Vue.prototype.$Func = funcSet;
  // Vue.prototype.$Valid = Valid;
  // setEncrypt(Vue, options);
};

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
const setElement = (Vue, ElementUI) => {
  Vue.use(ElementUI);
  // ElementUI的全局函数注册到Vue到全局
  Vue.prototype.$messge = ElementUI.Message;
  Vue.prototype.$msgbox = ElementUI.MessageBox;
  Vue.prototype.$alert = ElementUI.MessageBox.alert;
  Vue.prototype.$confirm = ElementUI.MessageBox.confirm;
  Vue.prototype.$prompt = ElementUI.MessageBox.prompt;
  Vue.prototype.$notify = ElementUI.Notification;
};

export const components = componentsModule;
export const directives = directivesModule;
export const filters = filtersModule;
export { install, setElement };
export default { install };
