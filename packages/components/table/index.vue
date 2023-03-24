<!-- @format -->

<template>
  <div :id="tableId">
    <el-table :data="currentData" style="width: 100%" v-bind="getProps('table', $attrs)" v-on="$listeners" ref="elTable">
      <slot name="empty" slot="empty"></slot>
      <!-- 序号 -->
      <el-table-column v-if="showIndex" type="index" width="45"> </el-table-column>
      <!-- 选择 -->
      <el-table-column v-if="showCheckbox" type="selection" width="45" :fixed="showFixed"> </el-table-column>
      <!-- 展开 -->
      <el-table-column v-if="showExpand" type="expand" width="45" :fixed="showFixed">
        <template #expand="scope">
          <slot v-bind="scope" name="expand" />
        </template>
      </el-table-column>

      <!-- 通用 -->
      <el-table-column v-for="(item, index) in tableColumn" :key="item + index" v-bind="getProps('tableColumn', item)">
        <template v-if="_showSlot(item.prop + 'header')" #header="{ column, $index }">
          <slot v-bind="{ column, $index }" :name="item.prop + 'header'"></slot>
        </template>
        <template v-if="_showSlot(item.prop)" #default="{ row, column, $index }">
          <slot v-bind="{ row, column, $index }" :name="item.prop"></slot>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column v-if="showOperation" :fixed="showFixed && 'right'" :label="operationLable" :width="operationWidth">
        <template #default="scope">
          <slot v-bind="scope" />
        </template>
      </el-table-column>
    </el-table>
    <div v-if="showPagination" class="flex justify-end mt-2 mr-2">
      <el-pagination
        v-bind="getProps('pagination', $attrs)"
        @size-change="_pageSizeChange"
        @current-change="_pageIndexChange"
        :total="frontPagination ? tableData.length : total"
        :currentPage.sync="pageIndex"
        :pageSize.sync="currentPageSize"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getProps } from '../../utils/utils';
export default {
  name: 'zTable',
  props: {
    showCheckbox: { type: Boolean, default: false }, //是否开启多选框
    showFixed: { type: Boolean, default: false }, //是否固定列
    showExpand: { type: Boolean, default: false }, //是否可以展开
    showOperation: { type: Boolean, default: false }, //是否包含操作列
    showIndex: { type: Boolean, default: false }, //是否包含序号
    operationLable: {
      type: String,
      default: '操作'
    },
    operationWidth: {
      type: String,
      default: '120px'
    },
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    tableData: {
      type: Array,
      default: () => []
    },
    tableColumn: {
      type: Array,
      default: () => [],
      required: true
    }, //字段
    showPagination: {
      type: Boolean,
      default: true
    },
    frontPagination: {
      type: Boolean,
      default: true
    },
    pageSize: {
      type: Number,
      default: 10
    },
    tableId: {
      type: String,
      default: 'zTable'
    }
  },
  data() {
    return {
      currentData: [],
      currentPageSize: this.pageSize,
      pageIndex: this.currentPage
    };
  },
  watch: {
    tableData: {
      handler(val) {
        val && this._updateTableData(val);
      },
      immediate: true
    },
    showPagination: {
      handler() {
        this._updateTableData(this.tableData);
      }
    }
  },
  methods: {
    _updateTableData(val) {
      if (this.showPagination && this.frontPagination) {
        this.currentData = val.slice(this.currentPageSize * (this.pageIndex - 1), this.currentPageSize * this.pageIndex);
      } else {
        this.currentData = val;
      }
    },
    _showSlot(prop) {
      return this.$scopedSlots[prop] || this.$slots[prop];
    },
    _pageIndexChange(page) {
      if (this.showPagination && this.frontPagination) {
        this.currentData = this.tableData.slice((page - 1) * this.currentPageSize, page * this.currentPageSize);
      }
      this.$emit('page-change', page);
      this.$emit('update:currentPage', page);
    },
    _pageSizeChange(pageSize) {
      if (this.showPagination && this.frontPagination) {
        this.currentData = this.tableData.slice((this.pageIndex - 1) * pageSize, this.pageIndex * pageSize);
      }
      this.$emit('size-change', pageSize);
      this.$emit('update:pageSize', pageSize);
    },
    getProps(type, attrs) {
      return getProps(type, attrs);
    },
    getRefs(name = 'elTable') {
      return this.$refs[name];
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
