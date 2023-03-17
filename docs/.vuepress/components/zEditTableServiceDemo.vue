<!-- @format -->

<template>
  <zEditTable
    :tableColumn="tableColumn"
    v-model="tableData"
    :items="items"
    @save-table="saveTable"
    @delete-table="deleteTable"
    @page-change="handlePageChange"
    v-bind="paginationOption"
    :frontPagination="false"
    :rules="rules"
    v-loading="loading"
  >
  </zEditTable>
</template>
<script>
const randomTableData = (size, start = 0) => {
  return new Array(size).fill(0).map((item, index) => {
    const obj = { date: `2016-05-02`, name: `王小虎${start * size + index}`, address: ['上海1'], _view_: false };
    return obj;
  });
};
export default {
  name: 'zEditTableDemo',
  data() {
    return {
      paginationOption: {
        total: 200,
        disabled: false
      },
      tableColumn: [
        { prop: 'date', label: '测试1' },
        {
          prop: 'name',
          label: '测试2',

          'label-class-name': 'text-center'
        },
        {
          prop: 'address',
          label: '测试3',
          'class-name': 'text-red',
          format: (data) => {
            return data.scope.row['address'].join(',');
          }
        }
      ],
      tableData: randomTableData(5),
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'change' }]
      },
      items: [
        {
          prop: 'date',
          // jsx写法
          render: (data) => {
            return <el-date-picker style={'width:100%'} v-model={data.scope.row['date']} value-format={'yyyy-MM-dd'}></el-date-picker>;
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
      ],
      loading: false
    };
  },
  methods: {
    /*******
     * @description: 编辑
     * @param {Function} loading  通信方法，接受一个参数,改变z-edit-table的显示状态.
     * @param {Object} row 操作的这条数据
     * @return {void}
     */
    saveTable({ row, loading }) {
      loading(true);
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(row);
        }, 1000);
      }).then((res) => {
        //调用loading通知操作已经完成，在这之前可以调用一些接口进行数据操作
        loading(false);
        //接收到 row 之后可以对其进行操作,例如格式化...
        row.address = row.address.join();
      });
    },
    /*******
     * @description: 删除操作
     * @param {Function} callback
     * @param {Object} data
     * @return {void}
     */
    deleteTable({ row, loading }) {
      this.paginationOption.disabled = true;
      loading(true);
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(row);
        }, 2000);
      }).then((res) => {
        this.tableData = this.tableData.filter((item) => {
          return item !== res;
        });
        this.paginationOption.total--;
        this.paginationOption.disabled = false;
        loading(false);
      });
    },
    handlePageChange(page) {
      this.loading = true;
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(randomTableData(5, page - 1));
        }, 1000);
      }).then((res) => {
        this.tableData = res;
        this.loading = false;
      });
    }
  }
};
</script>
