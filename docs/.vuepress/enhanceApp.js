/** @format */

import './styles/index.css';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui/lib/index';
export default ({ Vue }) => {
  Vue.use(ElementUI, { size: 'mini' });
  Vue.mixin({
    mounted() {
      import('../../packages/index').then(function (m) {
        Vue.use(m);
      });
    }
  });
};
