<!-- @format -->

<template>
  <zVirtualTable
    class="z-table"
    ref="table"
    :tableColumn="tableColumn"
    :tableData="tableData"
    :height="300"
    :showCheckbox="showCheckbox"
    showOperation
    showFixed
  >
    <template #default="scope">
      <el-button type="text" size="mini" @click="scopeData(scope)"
        >编辑</el-button
      >
      <el-button type="text" size="mini">删除</el-button>
    </template>
  </zVirtualTable>
</template>

<script>
export default {
  name: 'zVirtualTableDemo',
  data() {
    const randomTableData = (size) => {
      return new Array(size).fill(0).map((item, index) => {
        const obj = {};
        for (let i = 0; i <= 50; i++) {
          obj[`name${i}`] = `${i}列 ${index}行`;
        }
        return obj;
      });
    };
    const randomTableColumn = (size) => {
      return new Array(size).fill(0).map((item, index) => {
        return {
          prop: `name${index}`,
          label: `${index}列`
        };
      });
    };
    return {
      tableColumn: randomTableColumn(10),
      tableData: randomTableData(30000)
    };
  },
  mounted() { },
  methods: {
    scopeData(scope) {
      console.log(scope);
    },
    showCheckbox(row, index) {
      return index > 10;
    }
  }
};
</script>
