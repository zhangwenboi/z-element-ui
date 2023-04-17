<!-- @format -->

<template>
  <div>
    <el-row class="m-5">
      <el-button plain>朴素按钮</el-button>
      <el-button type="primary" plain>主要按钮</el-button>
      <el-button type="success" plain>成功按钮</el-button>
      <el-button type="info" plain>信息按钮</el-button>
      <el-button type="warning" plain>警告按钮</el-button>
      <el-button type="danger" plain>危险按钮</el-button>
    </el-row>

    <el-row class="m-5">
      <el-button round>圆角按钮</el-button>
      <el-button type="primary" round>主要按钮</el-button>
      <el-button type="success" round>成功按钮</el-button>
      <el-button type="info" round>信息按钮</el-button>
      <el-button type="warning" round>警告按钮</el-button>
      <el-button type="danger" round>危险按钮</el-button>
    </el-row>

    <el-row class="m-5">
      <el-button icon="el-icon-search" circle></el-button>
      <el-button type="primary" icon="el-icon-edit" circle></el-button>
      <el-button type="success" icon="el-icon-check" circle></el-button>
      <el-button type="info" icon="el-icon-message" circle></el-button>
      <el-button type="warning" icon="el-icon-star-off" circle></el-button>
      <el-button type="danger" icon="el-icon-delete" circle></el-button>
    </el-row>
    <div class="flex items-center m-5">
      <z-theme url="https://unpkg.com/element-ui@2.15.13/lib/theme-chalk/index.css" v-model="colorConfig"></z-theme>
      当前颜色:{{ colorConfig.primary }}
      <el-button type="primary" class="ml-10" @click="changeColor">改变成功按钮颜色</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'zThemeDemo',
  data() {
    return {
      colorConfig: {
        primary: '#004082',
        success: '#00661A',
        info: '#BB4800',
        warning: '#E6A23C',
        danger: '#F56C6C'
      }
    };
  },
  methods: {
    changeColor() {
      this.colorConfig = {
        ...this.colorConfig,
        success: '#F56000'
      };
    }
  }
};
</script>
<style scoped></style>
