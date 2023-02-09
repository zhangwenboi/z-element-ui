/** @format */

import Vue from 'vue';
import {h} from 'vue';
import App from './App.vue';

import './assets/main.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import components from '../dist/z-element-ui.es.js';
Vue.use(components);
Vue.use(ElementUI);
new Vue({
  render: (h) => h(App)
}).$mount('#app');
