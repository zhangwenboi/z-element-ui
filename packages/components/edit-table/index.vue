<!-- @format -->

<template>
  <el-form ref="editform" :model="form" size="mini">
    <zTable
      ref="tableEditor"
      showOperation
      :paginationOption="paginationOption"
      :tableColumn="form.tableColumn"
      stripe
      highlight-current-row
      :tableData="form.tableData"
      checkbox
      :total="form.tableData.length"
    >
      <template #default="scope">
        <template v-if="scope.row._loading_">
          <el-button type="text" size="mini" icon="el-icon-loading">
          </el-button>
        </template>
        <template v-else>
          <el-button type="text" size="mini" @click="editTable(scope)">{{
            scope.row._view_ ? '保存' : '编辑'
          }}</el-button>
          <el-button type="text" size="mini" @click="deleteTable(scope)"
            >删除</el-button
          >
        </template>
      </template>
      <template
        v-for="(header, index) in requiredFields"
        #[header]="{ column }"
      >
        {{ column.label }}<span class="text-red" :key="index"> * </span>
      </template>
      <template v-for="(item, index) in form.items" #[item.prop]="scope">
        <el-form-item
          v-if="scope.row._view_"
          :key="`tableData.${scope.$index}.${item.prop}`"
          :prop="`tableData.${scope.$index}.${item.prop}`"
          :rules="form.rules[item.prop]"
        >
          <zRenderComponents
            :render="item.render"
            v-bind="{ scope, ...item.option }"
            v-on="item.option.on"
            :is-tag="true"
            :ref="item.prop || 'component'"
            v-model="scope.row[item.prop]"
          ></zRenderComponents>
        </el-form-item>
        <template v-else-if="_showSlot(item.prop)">
          <slot :name="item.prop" :scope="scope"></slot>
        </template>
        <template v-else>
          <span>{{ scope.row[item.prop] }}</span>
        </template>
      </template>
    </zTable>
  </el-form>
</template>

<script>
import zTable from '../table/index.vue';
import zFormItem from '../form-item/index.vue';
import zRenderComponents from '../render-component';
export default {
  name: 'zEditTable',
  components: {
    zFormItem,
    zTable,
    zRenderComponents
  },
  computed: {
    requiredFields: (that) =>
      that.form?.items
        ?.filter((e) => e.require)
        .map((e) => e.prop + 'header') || []
  },
  props: {
    form: {
      type: Object,
      required: true,
      default: () => ({})
    },
    save: {
      type: Function,
      default: () => {}
    },
    delete: {
      type: Function,
      default: () => {}
    },
    paginationOption: {
      type: Object,
      default: () => ({
        layout: 'total, sizes, prev, pager, next, jumper',
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      })
    }
  },
  methods: {
    _showSlot(prop) {
      return this.$scopedSlots[prop] || this.$slots[prop];
    },
    editTable(scope) {
      console.log(this.form);
      if (scope.row?._view_ === undefined) {
        this.$set(scope.row, '_view_', false);
      }
      if (scope.row?._view_) {
        this.validateRow(scope.$index, () => {
          this.operationDone(scope, this.save, (ifpass = true) => {
            if (ifpass) {
              scope.row._view_ = false;
            }
          });
        });
      } else {
        scope.row._view_ = true;
      }
    },
    deleteTable(scope) {
      this.operationDone(scope, this.delete, () => {
        this.form.tableData.splice(scope.$index, 1);
        this.$refs.tableEditor._updateTableData(this.form.tableData);
      });
    },
    validateRow(index, callback) {
      let props = this.form.items
        .filter((e) => e.require)
        .map((e) => `tableData.${index}.${e.prop}`);
      let ok = true;
      this.$refs['editform'].validateField(props, (errMsg) => {
        if (errMsg) {
          ok = false;
        }
      });
      ok && callback && callback();
    },
    // 操作完成后的回调
    // scope:操作列, done:操作的方法, callback:操作完成后的回调函数
    operationDone(scope, done, callback) {
      if (scope.row?._loading_ === undefined) {
        this.$set(scope.row, '_loading_', true);
      }
      scope.row._loading_ = true;
      done((dealScope) => {
        scope.row._loading_ = false;
        dealScope && (scope = dealScope);
        callback();
      }, scope);
    }
  }
};
</script>
<style scoped>
.el-form-item__content {
  display: inline-block;
  margin-left: 0px !important;
}
.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 0 !important;
}

.el-form-item.el-form--label-top .el-form-item__label {
  padding: 0px;
}

.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  max-width: 100%;
}
.text-red {
  color: red;
}
</style>
