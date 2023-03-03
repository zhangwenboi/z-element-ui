<!-- @format -->

<template>
  <z-grid-form :form="form" :rules="rules" :items="formList" label-width="140px"></z-grid-form>
</template>
<script>
export default {
  name: 'zGridFormDemo',
  data() {
    return {
      form: { age1: '20' },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ]
      },
      formList: [
        {
          prop: 'name',
          render: 'el-input',
          'label-width': '0',
          span: 24,
          option: {
            class: 'border'
          },
          slots: {
            suffix: () => <i>尾部</i>,
            prepend: () => 'Http:/'
          },
          on: {
            input: (e) => {
              console.log('input', e);
            },
            change: (e) => {
              console.log('change', e);
            }
          },
          defaultValue: '1'
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
            style: { width: '100%' },
            placeholder: '选择打卡时间1'
          }
        },
        {
          prop: 'switch',
          label: '开关',
          span: 12,
          class: 'border',
          isTag: false,
          render: '将isTag设置为false将会被直接渲染',
          defaultValue: false
        },
        {
          prop: 'chekbox',
          label: '使用z-checkbox',
          render: 'z-checkbox',
          span: 8,
          class: 'border',
          option: {
            multiple: true,
            data: [
              { label: '18', value: '18', disabled: true },
              { label: '19', value: '19' },
              { label: '20', value: '20' }
            ]
          },
          defaultValue: ['20']
        },
        {
          prop: 'custom-select',
          label: '引入自定义组件',
          render: 'zCustomtDemo',
          class: 'border',
          span: 8
        },
        {
          prop: 'age',
          label: '年龄',
          render: 'z-select',
          span: 8,
          class: 'border',
          option: {
            data: [19, 20, 21],
            placeholder: '请输入年龄'
          },
          defaultValue: 20
        },
        {
          prop: 'age1',
          label: 'string数据',
          render: 'z-select',
          class: 'border',
          option: {
            data: '1, 2, 3',
            placeholder: '请输入年龄'
          },
          defaultValue: '1'
        },
        {
          prop: 'age12',
          label: '年龄1',
          render: 'z-radio',
          class: 'border',
          option: {
            data: () => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve([
                    { label: '18', value: '18', disabled: true },
                    { label: '19', value: '19' },
                    { label: '20', value: '20' }
                  ]);
                }, 1000);
              });
            },
            placeholder: '请输入年龄'
          },
          defaultValue: '20'
        }
      ]
    };
  }
};
</script>
<style scoped></style>
