<!-- @format -->

<template>
  <div style="height: 400px">
    <zVirtualTable class="z-table" ref="table" :tableColumn="tableColumn" :tableData="tableData" :height="'100%'" showCheckbox showOperation>
      <template #default="scope">
        <el-button type="text" size="mini" @click="scopeData(scope)">编辑</el-button>
        <el-button type="text" size="mini">删除</el-button>
      </template>
    </zVirtualTable>
  </div>
</template>

<script>
const randomTableData = (size, cloumns) => {
  return new Array(size).fill(0).map((item, index) => {
    const obj = {};
    for (let i = 0; i <= cloumns; i++) {
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
export default {
  name: 'zVirtualTableDemo',
  data() {
    return {
      tableColumn: randomTableColumn(5),
      tableData: randomTableData(30000, 5)
    };
  },
  mounted() {},
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
