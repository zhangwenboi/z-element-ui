/** @format */

import Vue from 'vue';
import App from './App.vue';

import ElementUI from 'element-ui';
import { filters, directives, components, setElement } from 'z-element-ui';
//引入样式
import 'element-ui/lib/theme-chalk/index.css';
// 引入全局组件
Vue.use(components);
// 引入全局filters
Vue.use(filters);
// 引入常用全局指令
Vue.use(directives);
//设置element-ui常用API：this.$message\this.$confirm\this.$alert\this.$notify
setElement(Vue, ElementUI);
new Vue({
  render: (h) => h(App)
}).$mount('#app');
