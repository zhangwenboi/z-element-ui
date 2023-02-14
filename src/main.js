/** @format */

import Vue from 'vue';
import App from './App.vue';

import './assets/main.css';
import ElementUI from 'element-ui';
import components from '../packages/index';
import '../packages/style/index.scss';
components(Vue);
Vue.use(ElementUI);
new Vue({
  render: (h) => h(App)
}).$mount('#app');
