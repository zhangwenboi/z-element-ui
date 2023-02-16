<!-- @format -->
<template>
  <div>
    <zEditTable :form="form" :save="saveTable"></zEditTable>
  </div>
</template>
<script>
import { set } from 'vue';
export default {
  name: 'zEditTableDemo',
  data() {
    return {
      form: {
        tableData: new Array(20).fill(0).map((item, index) => {
          return {
            date: `2016-05-02`,
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            _view_: false
          };
        }),
        tableColumn: [
          { prop: 'date', label: '测试1' },
          { prop: 'name', label: '测试2' },
          { prop: 'address', label: '测试3' }
        ],
        rules: {
          name: [{ required: true, message: '请输入名称', trigger: 'change' }]
        },
        items: [
          {
            prop: 'date',
            type: 'input',
            option: {
              placeholder: '请输入'
            }
          },
          {
            prop: 'name',
            type: 'select',
            require: true,
            option: {
              placeholder: '请输入',
              clearable: true,
              list: new Promise((resolve) => {
                setTimeout(() => {
                  resolve([
                    {
                      label: '上海',
                      value: '上海'
                    },
                    {
                      label: '北京',
                      value: '北京'
                    }
                  ]);
                }, 20000);
              })
            }
          },
          {
            prop: 'address',
            type: 'select',
            option: {
              placeholder: '请输入',
              clearable: true,
              filter: true,
              multiple: true,
              multipleLimit: 1,
              list: [
                {
                  label: 'da',
                  list: [
                    {
                      label: '上海',
                      value: '上海'
                    },
                    {
                      label: '北京',
                      value: '北京'
                    }
                  ]
                },
                {
                  label: '北京',
                  list: [
                    {
                      label: '上海',
                      value: '上海'
                    },
                    {
                      label: '北京',
                      value: '北京'
                    }
                  ]
                }
              ]
            }
          }
        ]
      }
    };
  },
  methods: {
    saveTable(callbalk) {
      setTimeout(() => {
        callbalk();
      }, 1000);
    }
  }
};
</script>
