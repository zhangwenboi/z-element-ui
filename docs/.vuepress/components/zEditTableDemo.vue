
<template>
  <zEditTable
    :form="form"
    :save="saveTable"
    :delete="deleteTable"
    v-bind="paginationOption"
    :frontPagination="true"
  >
    <!-- <template #name="scope"> 12312312 </template> -->
  </zEditTable>
</template>
<script>
export default {
  name: 'zEditTableDemo',
  data() {
    return {
      paginationOption: {
        pageSize: 10,
        total: 20,
        layout: "total, sizes, prev, pager, next, jumper",
        disabled: false
      },
      form: {
        tableData: new Array(20).fill(0).map((item, index) => {
          return {
            date: `2016-05-02${index}`,
            name: `王小虎${index}`,
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
          { prop: 'address', label: '测试3', 'class-name': 'text-red' }
        ],
        rules: {
          name: [{ required: true, message: '请输入名称', trigger: 'change' }]
        },
        items: [
          {
            prop: 'date',
            render: (data) => {
              return <el-date-picker style={'width:100%'} v-model={data.scope.row['date']} value-format={'yyyy-MM-dd'}></el-date-picker>
            },
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
                }, 4000);
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
    /******* 
  * @description: 编辑
  * @param {Function} callback  通信方法，接受一个参数,通知z-edit-table操作完成.
  * @param {Object} data 操作的这条数据
  * @return {void}
  */
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
        //调用callback通知操作已经完成，在这之前可以调用一些接口进行数据操作
        callbalk(data);
      });
    },
    /******* 
     * @description: 删除操作
     * @param {Function} callback
     * @param {Object} data
     * @return {void}
     */
    deleteTable(callback, data) {
      this.paginationOption.disabled = true;
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(data);
        }, 1000);
      }).then((res) => {
        this.paginationOption.disabled = false;
        callback(data);
      });
    }
  }
};
</script>
