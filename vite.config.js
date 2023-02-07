/** @format */

import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue2 from '@vitejs/plugin-vue2';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2({
      include: [/\.vue$/, /\.md$/]
    })
  ],
  // 打包配置
  build: {
    lib: {
      entry: 'packages/index.js', // 设置入口文件
      name: 'z-element-ui', // 起个名字，安装、引入用
      fileName: (format) => `z-element-ui.${format}.js` // 打包后的文件名
    },
    sourcemap: true, // 输出.map文件
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'element-ui'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'element-ui': 'ElementUI'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
