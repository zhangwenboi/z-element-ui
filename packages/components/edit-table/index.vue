<!-- @format -->

<template>
  <el-form ref="editForm" :model="form" size="mini">
    <zTable ref="tableEditor" showOperation :tableColumn="tableColumn" stripe highlight-current-row :tableData="tableData" v-bind="getProps('tableExtension', $attrs)">
      <!-- 给表格添加如同z-table一样的配置项 -->
      <template #default="scope">
        <template v-if="scope.row._loading_">
          <el-button type="text" size="mini" icon="el-icon-loading"> </el-button>
        </template>
        <template v-else>
          <el-button type="text" size="mini" @click="editTable(scope)">{{ scope.row._view_ ? '保存' : '编辑' }}</el-button>
          <el-button type="text" size="mini" @click="deleteTable(scope)">删除</el-button>
        </template>
      </template>
      <template v-for="(header, index) in requiredFields" #[header]="{ column }"> {{ column.label }}<span class="text-red" :key="index"> * </span> </template>
      <template v-for="item in items" #[item.prop]="scope">
        <el-form-item v-if="scope.row._view_" :key="`tableData.${scope.$index}.${item.prop}`" :prop="`tableData.${scope.$index}.${item.prop}`" :rules="rules?.[item.prop]">
          <zRenderComponents
            :render="item.render"
            :is-tag="true"
            v-bind="{ scope, ...item.option }"
            v-on="item.option?.on"
            :ref="item.prop || 'component'"
            v-model="scope.row[item.prop]"
          ></zRenderComponents>
        </el-form-item>
        <template v-else-if="_showSlot(item.prop)">
          <div :key="`tableData.${scope.$index}.${item.prop}`">
            <slot :name="item.prop" :scope="scope"></slot>
          </div>
        </template>
        <template v-else>
          <span :key="item.prop">{{ scope.row[item.prop] }}</span>
        </template>
      </template>
    </zTable>
  </el-form>
</template>

<script>
import zTable from '../table/index.vue';
import zRenderComponents from '../render-component';
import { getProps } from '../../utils/utils';

export default {
  name: 'zEditTable',
  components: {
    zTable,
    zRenderComponents
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  computed: {
    requiredFields: (that) => that.items?.filter((e) => e.require).map((e) => e.prop + 'header') || [],
    tableData: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('change', val);
      }
    },
    form() {
      return {
        tableData: this.tableData
      };
    }
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    save: {
      type: Function,
      default: () => {}
    },
    delete: {
      type: Function,
      default: () => {}
    },
    tableColumn: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    rules: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    _showSlot(prop) {
      return this.$scopedSlots[prop] || this.$slots[prop];
    },
    editTable(scope) {
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
    getProps(type, attrs) {
      return getProps(type, attrs);
    },
    deleteTable(scope) {
      const index = this.tableData.indexOf(scope.row) !== -1 ? this.tableData.indexOf(scope.row) : this.$attrs.frontPagination ? this.$attrs.currentPage * this.$attrs.pageSize : scope.$index;
      this.operationDone(scope, this.delete, () => {
        this.tableData.splice(index, 1);
      });
    },
    validateRow(index, callback) {
      let props = this.items.filter((e) => e.require).map((e) => `tableData.${index}.${e.prop}`);
      let ok = true;
      this.$refs['editForm'].validateField(props, (errMsg) => {
        if (errMsg) {
          ok = false;
        }
      });
      ok && callback && callback();
    },
    /*******
     * @description:
     * @param {*} scope 操作列
     * @param {*} done 操作的方法
     * @param {*} callback 操作完成后的回调函数
     * @return {*}
     */
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
