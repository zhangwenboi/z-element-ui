<!-- @format -->

<template>
  <zTable
    class="z-table"
    :tableColumn="tableColumn"
    :tableData="tableData"
    :paginationOption="paginationOption"
    :frontPagination="false"
    @page-change="handlePageChange"
    @page-size-change="handlePageSizeChange"
    v-loading="loading"
    :total="total"
  ></zTable>
</template>

<script>
const randomTableData = (size) => {
  return new Array(size).fill(0).map((item, index) => {
    const obj = {};
    for (let i = 0; i <= 5; i++) {
      obj[`name${i}`] = `第${i}列 ， 第${index}行`;
    }
    return obj;
  });
};
export default {
  name: 'zTablePageDemo',
  data() {
    return {
      tableColumn: [
        {
          prop: 'name0',
          label: '第0列'
        },
        {
          prop: 'name1',
          label: '第1列'
        },
        {
          prop: 'name2',
          label: '第2列'
        },
        {
          prop: 'name3',
          label: '第3列'
        },
        {
          prop: 'name4',
          label: '第4列'
        }
      ],
      tableData: [],
      paginationOption: {
        layout: 'total,sizes, prev, pager, next, jumper',
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10
      },
      total: 0,
      loading: true
    };
  },
  created() {
    this.getData();
  },
  methods: {
    handlePageChange(page) {
      this.loading = true;
      const tableDataSize = this.paginationOption.pageSize;
      setTimeout(() => {
        this.tableData = randomTableData(tableDataSize);
        this.loading = false;
        console.log('🚀 ~ this.tableData', this.tableData);
      }, 1000);
    },
    handlePageSizeChange(pageSize) {
      this.loading = true;
      setTimeout(() => {
        this.tableData = randomTableData(pageSize);
        this.loading = false;
      }, 1000);
    },
    getData() {
      this.loading = true;
      setTimeout(() => {
        this.total = 100;
        this.tableData = randomTableData(10);
        this.loading = false;
      }, 1000);
    }
  }
};
</script>
