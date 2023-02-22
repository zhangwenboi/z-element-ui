<!-- @format -->

<template>
  <el-form :model="form" :rules="rules" ref="form" v-bind="$attrs">
    <z-form-item v-for="(item, index) in formList" :key="item.label" v-bind="item" :form="form" />
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import zFormItem from '../form-item/index.vue';
export default {
  name: 'zForm',
  components: {
    zFormItem
  },
  provide() {
    return {
      elForm: this
    };
  },
  data() {
    return {
      form: {},
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ]
      },
      formList: [
        {
          prop: 'name',
          label: '姓名',
          render: 'el-input',
          option: {
            isTag: true,
            attrs: {
              placeholder: '请输入姓名'
            }
          },
          defaultValue: '89876789'
        },
        {
          prop: 'switch',
          label: '开关',
          render: 'z-switch',
          option: {
            isTag: true
          },
          defaultValue: false
        },
        {
          prop: 'chekbox',
          label: 'sdas',
          render: 'z-checkbox',
          option: {
            isTag: true,
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
          prop: 'age',
          label: '年龄',
          render: 'z-select',
          option: {
            isTag: true,
            data: [
              { label: '18', value: '18', disabled: true },
              { label: '19', value: '19' },
              { label: '20', value: '20' }
            ],
            attrs: {
              placeholder: '请输入年龄'
            }
          },
          defaultValue: '20'
        },
        {
          prop: 'age1',
          label: '年龄1',
          render: 'z-radio',
          option: {
            isTag: true,
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
            attrs: {
              placeholder: '请输入年龄'
            }
          },
          defaultValue: '20'
        }
      ]
    };
  },
  methods: {
    submit() {
      console.log(this.form, this.$attrs);
    }
  }
};
</script>
