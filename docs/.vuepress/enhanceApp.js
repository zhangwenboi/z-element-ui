/** @format */

import './styles/index.css';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui/lib/index';
import zElementUI from '../../packages/index';
export default ({ Vue }) => {
  Vue.use(ElementUI, { size: 'mini' });
  Vue.use(zElementUI);
};
