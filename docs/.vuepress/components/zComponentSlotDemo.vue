<!-- @format -->

<template>
  <z-grid-form v-model="form" :rules="rules" :items="formList" label-width="140px" ref="zComponentSlotDemo">
    <template #prepend>
      <div class="m-20">
        <span style="font-size: large; font-weight: 600">标题 </span>
        <el-tag>使用prepend插槽</el-tag>
      </div>
    </template>
    <template #append>
      <el-col :span="24" class="text-right">
        <el-tag>使用append插槽</el-tag>
        <el-button type="danger" plain @click="submit()"> 提交 </el-button>
      </el-col>
    </template>
  </z-grid-form>
</template>
<script>
export default {
  name: 'zComponentSlotDemo',
  data() {
    return {
      form: { slots_example: [1, 2, 3], age: '23' },
      transformData: [],
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
          }
        },
        {
          prop: 'slots_example',
          label: '插槽示例',
          render: 'el-transfer',
          option: {},
          slots: {
            'left-footer': () => {
              return (
                <el-button type="primary" size="small" style="margin: 5px">
                  自定义左侧底部插槽
                </el-button>
              );
            },
            'right-footer': (
              <el-button type="primary" size="small" style="margin: 5px">
                自定义右侧底部插槽123
              </el-button>
            )
          },
          on: {
            change: (e) => {
              console.log('change', e);
            },
            'left-check-change': (e) => {
              console.log('left-check-change', e);
            },
            'right-check-change': (e) => {
              console.log('right-check-change', e);
            }
          }
        }
      ]
    };
  },
  mounted() {
    console.log(this.getData());
  },
  methods: {
    submit() {
      this.$refs.zSlotsForm.validate(
        (valid) => {
          console.log('🚀 ~ valid:', this.form);

          this.$message.success('验证成功', valid);
        },
        (err) => {
          this.$message.error('验证失败', err);
        }
      );
    },
    async getData() {
      const { data } = await new Promise((resolve) => {
        setTimeout(() => {
          const data = [];
          for (let i = 1; i <= 15; i++) {
            data.push({
              key: i,
              label: `备选项 ${i}`,
              disabled: i % 4 === 0
            });
          }
          resolve({ data });
        }, 3000);
      });
      this.$set(this.formList[1], 'option', {
        data,
        filterable: true,
        'left-default-checked': [2, 4],
        'right-default-checked': [1, 3],
        'render-content': (h, option) => {
          return (
            <span>
              {option.key} - {option.label}
            </span>
          );
        }
      });
      console.log(this.formList[1]);
      return data;
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
