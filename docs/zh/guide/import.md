# 引入
## 完整引入

### element-ui完整引入

如果是完整引入的element，直接进行项目引入即可.
``` js
import Vue from 'vue';
import App from './App.vue';

import ElementUI from 'element-ui';
import zElementUI from 'z-element-ui';
//引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(zElementUI);
Vue.use(ElementUI);
new Vue({
  render: (h) => h(App)
}).$mount('#app');

```

### element-ui按需引入

如果项目中的element是按需引入，如果需要使用 `z-form` `z-edit-table` 则需要将form相关的`el-form`、`el-input`、`el-select`、`el-form-item`...进行按需引入，如果不使用相关的组件则不用进行引入.
例如，项目中没有使用 `z-select` 或 `el-select` 则不需要引入`el-select`
```js
import Vue from 'vue';
import { Input, Select } from 'element-ui';
import App from './App.vue';
import zElementUI from 'z-element-ui';
//引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';
Vue.component(Button.name, Button);
Vue.component(Input.name, Input);

Vue.use(zElementUI);
new Vue({
  el: '#app',
  render: h => h(App)
});

```


## 按需引入 
z-element-ui提供了常用的`filter` `directives` `components` 以及一个用于设置element常用API的函数 `setElement`.


如果你只需要引入其中一个或几个部分，可以使用一下方法进行引入

```js


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

```


