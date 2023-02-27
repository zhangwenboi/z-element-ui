<template>
  <el-form :model="form" ref="form" v-bind="$attrs" :label-width="'180px'" label-suffix=":->">
    <zFormItem v-for="(item, index) in formList" :key="item.label" v-bind="item" :form="form">
    </zFormItem>
  </el-form>
</template>
<script>
export default {
  name: 'zSelectFormDemo',
  data() {
    return {
      form: { 'age1': '上海' },
      formList: [
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
            data: () => {
              return new Promise((resolve, reject) => {
                const options = [
                  {
                    label: '上海2',
                    value: '上海2'
                  }
                ]
                setTimeout(() => {
                  resolve(options)
                }, 8000)

              })
            },
            placeholder: '请输入年龄'
          },
        },
        {
          prop: 'age2',
          label: '自定义数据',
          render: 'z-select',
          option: {
            data: [
              {
                label: '组名1',
                data: [
                  {
                    label: '上海',
                    value: '上海'
                  },

                  {
                    label: '上海3',
                    value: '上海3'
                  },
                  {
                    label: '北京4',
                    value: '北京4'
                  }
                ]
              },
              {
                label: '组名2',
                data: [
                  {
                    label: '上海2',
                    value: '上海2'
                  },
                  {
                    label: '北京2',
                    value: '北京2'
                  },
                  {
                    label: '北京3',
                    value: '北京3'
                  }
                ]
              }
            ],
            placeholder: '请输入年龄'
          },
        },
        {
          prop: 'age4',
          label: '过滤',
          render: 'z-select',
          slots: {
            empty: '没有数据啊'
          },
          option: {
            data: [
              {
                label: '组名1',
                data: [
                  {
                    label: '上海',
                    value: '上海'
                  },
                  {
                    label: '北京4',
                    value: '北京4'
                  }
                ]
              }, {
                label: '组名2',
                data: [
                  {
                    label: '上海2',
                    value: '上海2'
                  },
                  {
                    label: '北京3',
                    value: '北京3'
                  }
                ]
              }
            ],
            placeholder: '请输入年龄',
            filterable: true
          },
        },
        {
          prop: 'age5',
          label: '插槽',
          render: 'z-select',
          option: {
            data: [
              {
                label: '上海2',
                value: '上海2'
              },
              {
                label: '北京2',
                value: '北京2'
              }
            ]
          },
          slots: {
            option: ({ option, index }) => {
              return <span>{option.label}--{index}</span>
            },
            prefix: () => {
              return <i class={'el-icon-eleme text-red'}></i>
            },
          }

        }
      ]
    };
  }
};
</script>
