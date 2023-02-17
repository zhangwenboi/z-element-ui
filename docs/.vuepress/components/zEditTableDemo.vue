<!-- @format -->
<template>
  <zEditTable :form="form" :save="saveTable" :delete="deleteTable">
    <!-- <template #name="scope"> 12312312 </template> -->
  </zEditTable>
</template>
<script>
export default {
  name: 'zEditTableDemo',
  data() {
    return {
      form: {
        tableData: new Array(20).fill(0).map((item, index) => {
          return {
            date: `2016-05-02`,
            name: '王小虎',
            address: '上海1',
            _view_: false
          };
        }),
        tableColumn: [
          { prop: 'date', label: '测试1' },
          {
            prop: 'name',
            label: '测试2',
            'label-class-name': 'text-center'
          },
          { prop: 'address', label: '测试3' }
        ],
        rules: {
          name: [{ required: true, message: '请输入名称', trigger: 'change' }]
        },
        items: [
          {
            prop: 'date',
            render: 'z-input',
            isTag: true,
            option: {
              placeholder: '请输入'
            }
          },
          {
            prop: 'name',
            render: 'z-select',
            isTag: true,
            require: true,
            option: {
              placeholder: '请输入',
              clearable: true,
              data: new Promise((resolve) => {
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
                }, 2000);
              })
            }
          },
          {
            prop: 'address',
            render: 'z-select',
            isTag: true,
            option: {
              placeholder: '请输入',
              clearable: true,
              filter: true,
              multiple: true,
              multipleLimit: 1,
              data: [
                {
                  label: 'group1',
                  data: [
                    {
                      label: '上海1',
                      value: '上海1'
                    },
                    {
                      label: '北京1',
                      value: '北京1'
                    }
                  ]
                },
                {
                  label: 'group2',
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
                }
              ]
            }
          }
        ]
      }
    };
  },
  methods: {
    saveTable(callbalk, data) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(data);
        }, 1000);
      }).then((res) => {
        const { row } = res;
        data.row.address = Array.isArray(row.address)
          ? row.address[0]
          : row.address;
        callbalk(data);
      });
    },
    deleteTable(callback, data) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(data);
        }, 1000);
      }).then((res) => {
        callback(data);
      });
    }
  }
};
</script>
