/** @format */
import { components } from '../components/index';
export const config = {
  tagPrefix: 'item-',
  tags: components
};
//错误捕获
export const errorHandle = (error, vm, info) => {
  console.error('error---', err);
  console.info('vm---', vm);
  console.info('info---', info);
};
// el-form 配置
export const formConfig = {};
