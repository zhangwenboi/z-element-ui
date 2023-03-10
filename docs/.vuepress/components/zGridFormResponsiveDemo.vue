<!-- @format -->

<template>
  <div>
    <el-button v-for="item in [2000, 1000, 500]" type="primary" plain :key="item" @click="() => (width = item + 'px')"> 宽度{{ item }}px </el-button>
    <div :style="{ overflow: 'auto', margin: '12px' }">
      <z-grid-form :style="{ width }" :form="form" :rules="rules" :items="formList" label-width="140px" responsive></z-grid-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'zGridFormResponsiveDemo',
  data() {
    return {
      form: { age1: '20' },
      width: '100%',
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

          class: 'border',
          option: {
            style: { width: '100%' }
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
          prop: 'chekbox',
          label: '使用z-checkbox',
          render: 'z-checkbox',
          class: 'border',
          option: {
            multiple: true,
            data: [
              { label: '18', value: '18', disabled: true },
              { label: '19', value: '19' }
            ]
          },
          defaultValue: ['20']
        },

        {
          prop: 'age',
          label: '年龄',
          render: ({ vmodel }) => {
            console.log(vmodel);
            return <el-input v-model={vmodel.age} placeholder="请输入年龄" />;
          },
          class: 'border'
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
        },
        {
          prop: 'switch',
          label: '开关',
          isTag: false,
          class: 'border',
          render: '将isTag设置为false将会被直接渲染',
          defaultValue: false
        },
        {
          prop: 'custom-select',
          label: '引入自定义组件',
          class: 'border',
          render: 'zCustomtDemo'
        }
      ]
    };
  }
};
</script>
<style scoped></style>
