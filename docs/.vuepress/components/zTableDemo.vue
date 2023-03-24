<!-- @format -->

<template>
  <zTable class="z-table" ref="table" :tableColumn="tableColumn" :tableData="tableData" :height="300"> ></zTable>
</template>

<script>
export default {
  name: 'zTableDemo',
  data() {
    const randomTableData = () => {
      return new Array(20).fill(0).map((item, index) => {
        const obj = {};
        for (let i = 0; i <= 5; i++) {
          obj[`name${i}`] = `第${i}列 ， 第${index}行`;
        }
        return obj;
      });
    };
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
      tableData: randomTableData()
    };
  },
  mounted() {
    console.log(this.$refs.table.$refs.elTable.resizeState);
  }
};
</script>
