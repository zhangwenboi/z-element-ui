<!-- @format -->

<template>
  <div>
    <el-table
      :data="currentData"
      style="width: 100%"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <!-- <template #empty class="flex align-middle">
        <img class="mt-5 w-56" src="./nodata.png" alt="暂无内容" />
        <span class="text-xl">暂无数据</span>
      </template> -->
      <!-- 序号 -->
      <el-table-column v-if="showIndex" type="index" width="45">
      </el-table-column>
      <!-- 选择 -->
      <el-table-column
        v-if="showCheckbox"
        type="selection"
        width="45"
        :fixed="showFixed"
      />
      <!-- 展开 -->
      <el-table-column
        v-if="showExpand"
        type="expand"
        width="45"
        :fixed="showFixed"
      >
        <template #expand="scope">
          <slot v-bind="scope" name="expand" />
        </template>
      </el-table-column>

      <!-- 通用 -->
      <el-table-column
        v-for="(item, index) in tableColumn"
        :key="item + index"
        v-bind="item"
      >
        <template v-if="_showSlot(item.prop + 'header')" #header="scope">
          <slot v-bind="scope" :name="item.prop + 'header'"></slot>
        </template>
        <template v-if="_showSlot(item.prop)" #default="scope">
          <slot v-bind="scope" :name="item.prop"></slot>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column
        v-if="showOperation"
        :fixed="showFixed ? 'right' : false"
        :label="operationLable"
        :width="operationWidth"
      >
        <template #default="scope">
          <slot v-bind="scope" />
        </template>
      </el-table-column>
    </el-table>
    <div v-if="showPagination" class="flex justify-end mt-2 mr-2">
      <el-pagination
        v-bind="pgOption"
        @size-change="_pageSizeChange"
        @current-change="_pageIndexChange"
        :total="$attrs.total || pgOption.total"
        :currentPage="$attrs.currentPage || pgOption.currentPage"
        :pageSizes="$attrs.pageSizes || pgOption.pageSizes"
        :pageSize="$attrs.pageSize || pgOption.pageSize"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ztable',
  components: {},
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
    paginationOption: {
      type: Object,
      default: () => {}
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
    }
  },
  data() {
    return {
      currentData: [],
      pgOption: {
        layout: 'total,sizes, prev, pager, next',
        pageSize: 10,
        total: 0,
        currentPage: 1
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
        this.pgOption = {
          ...this.pgOption,
          ...val
        };
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
        this.currentData = val.slice(
          this.pgOption.pageSize * (this.pgOption.currentPage - 1),
          this.pgOption.pageSize * this.pgOption.currentPage
        );
        this.$set(this.pgOption, 'total', val.length);
      } else {
        this.currentData = val;
      }
    },
    _showSlot(prop) {
      return this.$scopedSlots[prop] || this.$slots[prop];
    },
    _pageIndexChange(page) {
      if (this.showPagination && this.frontPagination) {
        this.currentData = this.tableData.slice(
          (page - 1) * this.pgOption.pageSize,
          page * this.pgOption.pageSize
        );
      }
      this.pgOption.currentPage = page;
      this.$emit('page-change', page);
    },
    _pageSizeChange(pageSize) {
      this.currentData = this.tableData.slice(0, pageSize);
      this.pgOption.pageSize = pageSize;
      this.$emit('page-size-change', pageSize);
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
