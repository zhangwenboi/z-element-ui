<!-- @format -->

<template>
  <div>
    <el-table :data="currentData" style="width: 100%" v-bind="$attrs" v-on="$listeners">
      <!-- <template #empty class="flex align-middle">
        <img class="mt-5 w-56" src="./nodata.png" alt="暂无内容" />
        <span class="text-xl">暂无数据</span>
      </template> -->
      <!-- 序号 -->
      <el-table-column v-if="index" type="index" width="45"> </el-table-column>
      <!-- 选择 -->
      <el-table-column v-if="checkbox" type="selection" width="45" :fixed="disFixed" />
      <!-- 展开 -->
      <el-table-column v-if="expand" type="expand" width="45" :fixed="disFixed">
        <template #expand="scope">
          <slot v-bind="scope" name="expand" />
        </template>
      </el-table-column>

      <!-- 通用 -->
      <el-table-column v-for="(item, index) in tableColumn" :key="item + index" v-bind="item" class="truncate">
        <template v-if="_showSlot('header' + item.prop)" #header="scope">
          <slot v-bind="scope" :name="'header' + item.prop"></slot>
        </template>
        <template v-if="_showSlot(item.prop)" #default="scope">
          <slot v-bind="scope" :name="item.prop"></slot>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column v-if="operation" :fixed="disFixed ? 'right' : false" :label="operationLable" :width="operationWidth">
        <template #default="scope">
          <slot v-bind="scope" />
        </template>
      </el-table-column>
    </el-table>
    <div v-if="pgOption.show" class="flex justify-end mt-2 mr-2">
      <el-pagination v-bind="pgOption" @size-change="_pageSizeChange" @current-change="_pageIndexChange"> </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ztable',
  components: {},
  props: {
    checkbox: { type: Boolean, default: false }, //是否开启多选框
    disFixed: { type: Boolean, default: false }, //是否固定列
    expand: { type: Boolean, default: false }, //是否可以展开
    operation: { type: Boolean, default: false }, //是否包含操作列
    index: { type: Boolean, default: false }, //是否包含序号
    operationLable: { type: String, default: '操作' },
    operationWidth: { type: String, default: '120px' },
    paginationOption: {
      type: Object,
      default: () => ({
        layout: 'total, sizes, prev, pager, next, jumper',
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      })
    },
    tableData: {
      type: Array,
      default: () => []
    },
    tableColumn: {
      type: Array,
      default: () => [],
      required: true
    } //字段
  },
  data() {
    return {
      currentData: [],
      pgOption: {
        show: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        pageSize: 10,
        currentPage: 1,
        pageSizes: [5, 10, 30, 40, 50]
      }
    };
  },
  watch: {
    tableData: {
      handler(val) {
        if (!val) return;
        this._updateTableData(val);
      },
      immediate: true,
      deep: true
    },
    paginationOption: {
      handler(val) {
        this.pgOption = { ...this.pgOption, ...val };
      },
      immediate: true
    }
  },
  methods: {
    _updateTableData(val) {
      this.currentData = val.slice(this.pgOption.pageSize * (this.pgOption.currentPage - 1), this.pgOption.pageSize * this.pgOption.currentPage);
      this.pgOption.total = val.length;
    },
    _showSlot(prop) {
      return this.$scopedSlots[prop] || this.$slots[prop];
    },
    _pageIndexChange(page) {
      this.currentData = this.tableData.slice((page - 1) * this.pgOption.pageSize, page * this.pgOption.pageSize);
      this.pgOption.currentPage = page;
      this.$emit('pageIndexChange', page);
    },
    _pageSizeChange(pageSize) {
      this.currentData = this.tableData.slice(0, pageSize);
      this.pgOption.pageSize = pageSize;
      this.$emit('pageSizeChange', pageSize);
    }
  }
};
</script>

<style scoped>
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.flex {
  display: flex;
}
.justify-end {
  justify-content: flex-end;
}
.mt-2 {
  margin-top: 0.5rem /* 8px */;
}
.mr-2 {
  margin-right: 0.5rem /* 8px */;
}
</style>
