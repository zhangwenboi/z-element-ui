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
      form: {
        name: '123'
      },
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
          option: {
            isTag: true,
            name: 'item-input',
            attrs: {
              placeholder: '请输入姓名'
            }
          },
          defaultValue: '张三'
        },
        {
          prop: 'age',
          label: '年龄',
          option: {
            isTag: true,
            name: 'item-select',
            data: [
              { label: '18', value: '18', disabled: true },
              { label: '19', value: '19' },
              { label: '20', value: '20' }
            ],
            attrs: {
              placeholder: '请输入年龄'
            }
          },
          defaultValue: '18'
        },
        {
          prop: 'age1',
          label: '年龄1',
          option: {
            isTag: true,
            name: 'item-radio',
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
          defaultValue: '18'
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
