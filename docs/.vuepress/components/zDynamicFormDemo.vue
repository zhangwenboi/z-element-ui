<!-- @format -->

<template>
  <div>
    <z-grid-form v-model="form" :rules="rules" :items="formList" label-width="140px" ref="zGridForm">
      <template #prepend="{ row, rowIndex }">
        <div class="m-20" v-if="!rowIndex">
          <span style="font-size: large; font-weight: 600">表单{{ rowIndex }}</span>
          <el-button type="success" plain @click="add"> 新增 </el-button>
        </div>
      </template>
      <template #append="scope">
        <el-col :span="12" v-if="!!scope.rowIndex">
          <el-button type="danger" plain @click="deleteRow(scope)"> 删除 </el-button>
        </el-col>
      </template>
    </z-grid-form>
    <el-button type="primary" plain @click="submitForm()"> 提交 </el-button>
  </div>
</template>
<script>
export default {
  name: 'zDynamicFormDemo',
  data() {
    return {
      form: [{ check_in: '9:30' }],
      rules: {
        age: [
          { required: true, message: '请输入姓名', trigger: 'change' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'change' }
        ]
      },
      formList: [
        {
          prop: 'age',
          label: '年龄',
          render: ({ vmodel }) => {
            return <el-input v-model={vmodel.age} placeholder="请输入年龄" />;
          },
          class: 'border'
        },
        {
          prop: 'check_in',
          render: 'el-time-select',
          label: '使用el-time-select',
          class: 'border',
          span: 12,
          option: {
            'picker-options': {
              start: '08:30',
              step: '00:15',
              end: '10:30'
            },
            style: { width: '100%' }
          }
        }
      ]
    };
  },
  methods: {
    add() {
      this.form.push({ check_in: '9:30' });
    },
    deleteRow({ rowIndex }) {
      this.form.splice(rowIndex, 1);
    },
    submitForm() {
      this.$refs.zGridForm.clearValidate();
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
