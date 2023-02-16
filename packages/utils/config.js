/** @format */
export const config = {
  tagPrefix: 'z'
};
//错误捕获
export const errorHandle = (error, vm, info) => {
  console.error('error---', error);
  console.info('vm---', vm);
  console.info('info---', info);
};
// el-form 配置
export const formConfig = {};
