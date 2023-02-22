<template>
  <el-form :model="form" :rules="rules" ref="form" v-bind="$attrs" :label-width="'180px'" label-suffix=":->">
    <zFormItem v-for="(item, index) in formList" :key="item.label" v-bind="item" :form="form">
      <template v-if="item.prop === 'name'" #label>
        <span>label插槽</span>
      </template>
    </zFormItem>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import zCustomtDemo from './zCustomtDemo.vue';
export default {
  name: 'zFormItemDemo',
  components: {
    zCustomtDemo
  },
  data() {
    return {
      form: { 'age1': '20' },
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
          option: {
            class: 'border',
            style: {
              width: '200px'
            },
          },
          slots: {
            suffix: () => <i>尾部</i>,
            prepend: () => 'Http:/'
          },
          on: {
            input: (e) => {
              console.log('input', e)
            },
            change: (e) => {
              console.log('change', e)
            }
          },
          defaultValue: '1'
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
            placeholder: '选择打卡时间1'
          },
        },
        {
          prop: 'check_num',
          render: 'el-input-number',
          label: '使用el-input-number',
          option: {
            'min': 1,
            'max': 10,
            'step': 1,
            'step-strictly': true,
            'precision': 0,
            'controls-position': 'right',
            'placeholder': '请输入打卡次数'
          }
        },
        {
          prop: 'switch',
          label: '开关',
          isTag: false,
          render: '将isTag设置为false,则不会被包裹在el-form-item中，将会被直接渲染',
          defaultValue: false
        },
        {
          prop: 'chekbox',
          label: '使用z-checkbox',
          render: 'z-checkbox',
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
        },
        {
          prop: 'age',
          label: '年龄',
          render: 'z-select',
          option: {
            data: [
              19, 20, 21
            ],
            placeholder: '请输入年龄'
          },
          defaultValue: 20
        },
        {
          prop: 'age1',
          label: 'string数据',
          render: 'z-select',
          option: {
            data: '1, 2, 3',
            placeholder: '请输入年龄'
          },
          defaultValue: '1'
        },
        {
          prop: 'type',
          label: '类型',
          render: 'z-select',
          option: {
            props: { label: 'a', value: 'b' },
            data: [
              { a: 'MAN', b: '18', disabled: true },
              { a: 'MISS', b: '19' },
              { a: 'emmm', b: '20' }
            ],
            placeholder: '请输入年龄'
          },
          defaultValue: '20'
        },
        {
          prop: 'age1',
          label: '年龄1',
          render: 'z-radio',
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
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$message.success('提交成功');
          console.log("🚀 ~ this.form", this.form);
        } else {
          this.$message.error('提交失败');
          return false;
        }
      });
      console.log(this.form, this.$attrs);
    }
  }
};
</script>
