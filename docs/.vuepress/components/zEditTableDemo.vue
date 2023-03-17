<!-- @format -->

<template>
  <zEditTable :tableColumn="tableColumn" v-model="tableData" :items="items" @page-change="handlePageChange" :rules="rules" v-loading="loading"> </zEditTable>
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
          'label-class-name': 'text-red',
          'class-name': 'text-green',
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
          render: 'el-input'
        },
        {
          prop: 'name',
          render: 'el-input'
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
