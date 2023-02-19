<!-- @format -->

<template>
  <zTable
    class="z-table"
    :tableColumn="tableColumn"
    :tableData="tableData"
    :height="300"
    showIndex
    showFixed
    showOperation
  >
    <template #name3="scope">
      <div
        style="color: white; background-color: red; text-align: center"
        :style="scope.$index > 4 && 'background-color:blue;'"
      >
        {{ scope.$index }}
      </div>
    </template>
    <template #default="scope">
      <el-button type="text" size="mini" @click="editTable(scope)">{{
        scope.row._view_ ? "保存" : "编辑"
      }}</el-button>
      <el-button type="text" size="mini" @click="deleteTable(scope)"
        >删除</el-button
      >
    </template>
  </zTable>
</template>

<script>
export default {
  name: 'zTableSlotDemo',
  data() {
    const randomTableData = () => {
      return new Array(20).fill(0).map((item, index) => {
        const obj = {};
        for (let i = 0; i <= 7; i++) {
          obj[`name${i}`] = `第${i}列 ， 第${index}行`;
        }
        return obj;
      });
    };
    return {
      tableColumn: [
        {
          prop: 'name0',
          label: '第0列',
          'render-header': (h, params) => {
            return h('div', { style: 'color: red;background-color: green' }, '第0列');
          }
        },
        {
          prop: 'name1',
          label: '第1列',
          sortable: true
        },
        {
          prop: 'name2',
          label: '第2列',
          filters: [{ text: '第2列', value: '第2列' }],
          'filter-method': () => {
            console.log('🚀 ~ filter-method', 'filter-method');
          }
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
  methods: {
    editTable(scope) {
      console.log('🚀 ~ scope', scope);
    },
    deleteTable(scope) {
      console.log('🚀 ~ scope', scope);
      this.tableData.splice(scope.$index, 1);
    },
    getScope(scope) {
      console.log('🚀 ~ scope', scope);
    }
  }
};
</script>
