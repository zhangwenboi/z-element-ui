<!-- @format -->

<template>
  <z-grid-form v-model="form" :rules="rules" :items="formList" label-width="140px" ref="zSlotsForm">
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
  name: 'zSlotsFormDemo',
  data() {
    return {
      form: { age: '23' },
      transformData: [],
      rules: {
        age: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ]
      },
      formList: [
        {
          prop: 'age',
          label: '年龄',
          render: ({ vmodel }) => {
            console.log('🚀 ~ vmodel:', vmodel['age']);
            return <el-input v-model={vmodel['age']} placeholder="请输入年龄" />;
          }
        },

        {
          prop: 'gender',
          label: '性别',
          render: ({ vmodel }) => {
            return (
              <el-radio-group v-model={vmodel['gender']}>
                <el-radio label={'男'}> 男 </el-radio>
                <el-radio label={'女'}> 女 </el-radio>
              </el-radio-group>
            );
          },
          defaultValue: '男'
        }
      ]
    };
  },
  mounted() {
    console.log(this.getData());
  },
  methods: {
    submit() {
      console.log(this.$refs.zSlotsForm);
      this.$refs.zSlotsForm.validate(
        (valid) => {
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
