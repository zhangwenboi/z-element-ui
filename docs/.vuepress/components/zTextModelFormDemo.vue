<!-- @format -->

<template>
  <div>
    <el-button type="success" plain @click="checkType" style="margin-bottom: 20px"> 切换模式 </el-button>
    <z-grid-form v-model="form" :rules="rules" :items="formList" label-width="140px" ref="zTextModelForm" :textModel="textModel"> </z-grid-form>
  </div>
</template>
<script>
export default {
  name: 'zTextModelFormDemo',
  data() {
    return {
      form: { check_in: '9:30' },
      textModel: false,
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ]
      },
      formList: [
        {
          prop: 'age',
          label: '年龄',
          render: ({ vmodel }) => {
            console.log(vmodel, this.form);
            return <el-input v-model={vmodel.age} placeholder="请输入年龄" />;
          },
          format: ({ value }) => {
            return (
              <div style={{ fontWeight: 600 }}>
                年龄是 <span class={'text-red'}>{value}</span> ,而且我使用了jsx
              </div>
            );
          },
          class: 'border'
        },
        {
          prop: 'check_in',
          render: 'el-time-select',
          label: '使用el-time-select',
          class: 'border',
          span: 12,
          format: ({ value }) => {
            return `现在的时间是${value}`;
          },
          option: {
            'picker-options': {
              start: '08:30',
              step: '00:15',
              end: '10:30'
            },
            class: 'text-red',
            style: { width: '100%' },
            placeholder: '选择打卡时间1'
          }
        }
      ]
    };
  },
  methods: {
    checkType() {
      this.textModel = !this.textModel;
    }
  }
};
</script>
<style scoped>
.example {
  margin-bottom: 10px;
  float: right;
}
</style>
