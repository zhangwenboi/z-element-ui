<!-- @format -->

<template>
  <div>
    <z-desc-form v-model="form" :items="formList" ref="descForm" :column="2">
      <template #title> Description </template>
      <template #append>
        <el-descriptions-item label="操作">
          <el-button type="primary" plain @click="getFormData"> submit </el-button>
        </el-descriptions-item>
      </template>
    </z-desc-form>
  </div>
</template>
<script>
export default {
  name: 'zDescFormDemo',
  data() {
    return {
      form: { check_in: '9:30' },
      formList: [
        {
          prop: 'age',
          label: '年龄',
          required: true,
          render: ({ vmodel }) => {
            return <el-input v-model={vmodel.age} placeholder="请输入年龄" />;
          }
        },
        {
          prop: 'check_in',
          render: 'el-time-select',
          label: '使用el-time-select',
          option: {
            'picker-options': {
              start: '08:30',
              step: '00:15',
              end: '10:30'
            },
            style: { width: '100%' }
          }
        },
        {
          prop: 'number',
          label: '数字'
        },
        {
          prop: 'name',
          label: '姓名'
        }
      ]
    };
  },
  methods: {
    getFormData() {
      console.log(this.form);
    }
  }
};
</script>
<style scoped></style>
