<!-- @format -->

<script setup lang="jsx">
import zEditTable from '../packages/components/edit-table/edit-table.vue';
import zcmmmm from '../packages/components/zcmmmm.vue';
const pickerOptions = {
  shortcuts: [
    {
      text: '最近一周',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit('pick', [start, end]);
      }
    },
    {
      text: '最近一个月',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit('pick', [start, end]);
      }
    },
    {
      text: '最近三个月',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit('pick', [start, end]);
      }
    }
  ]
};
const paginationOption = {
  layout: 'total, sizes, prev, pager, next, jumper',
  pageSizes: [10, 20, 30, 40, 50],
  pageSize: 10,
  total: 200
};

const form = {
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
        placeholder: '请输入',
        type: 'daterange',
        'range-separator': '|',
        'start-placeholder': '开始日期',
        'end-placeholder': '结束日期'
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
          }, 2000);
        })
      }
    },
    {
      prop: 'address',
      type: 'select',
      slots: {
        prefix: () => {
          let style = 'color:#409EFF;line-height:28px;font-size:20px';
          return (
            <i class="el-icon-platform-eleme" style={style}>
              123123
            </i>
          );
        }
      },
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
};

const save = (pass) => {
  setTimeout(() => {
    pass(true);
  }, 1000);
};
const deleteTable = (pass) => {
  setTimeout(() => {
    pass();
  }, 500);
};
const idom2 = (e) => {
  return <div>123123{e}</div>;
};
</script>

<template>
  <div id="app">
    <main>
      <zEditTable :form="form" :paginationOption="paginationOption" :save="save" :delete="deleteTable"></zEditTable>
      <zcmmmm> </zcmmmm>
    </main>
  </div>
</template>

<style scoped></style>
