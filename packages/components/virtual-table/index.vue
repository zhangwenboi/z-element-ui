<!-- @format -->

<template>
  <el-table :id="tableId" :data="renderData" style="width: 100%" v-bind="getProps('table', $attrs)" v-on="$listeners" ref="elTable" :height="height">
    <slot name="empty" slot="empty"></slot>
    <!-- 选择 -->
    <el-table-column v-if="showCheckbox" width="45">
      <template #header>
        <el-checkbox v-bind="checkboxAll" @input="_selectionAllInput"></el-checkbox>
      </template>
      <template #default="{ row, $index }">
        <checkboxSingle v-bind="{ row, $index, ifSelectAll }" @input="_handleSelectionChange(row, $index)"> </checkboxSingle>
      </template>
    </el-table-column>
    <!-- 序号 -->
    <el-table-column v-if="showIndex" type="index" width="45"> </el-table-column>
    <!-- 展开 -->
    <el-table-column v-if="showExpand" type="expand" width="45" :fixed="showFixed">
      <template #expand="scope">
        <slot v-bind="scope" name="expand" />
      </template>
    </el-table-column>

    <!-- 通用 -->
    <el-table-column v-for="(item, index) in renderColumns" :key="item.prop + index" v-bind="getProps('tableColumn', item)">
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
</template>

<script>
import { dynamicStyleRule, uuid, getProps } from '../../utils/utils';

export default {
  name: 'zTable',
  components: {
    checkboxSingle: {
      name: 'checkboxSingle',
      functional: true,
      render(h, { props: { row, $index, ifSelectAll }, listeners }) {
        // 生成多选框
        return h('el-checkbox', {
          class: 'virtual-scroll-checkbox',
          props: {
            value: !!row?.$v_checked || ifSelectAll,
            disabled: !!row.$v_disabled
          },
          on: {
            input: listeners['input'],
            nativeOn: { click: (event) => event.stopPropagation() }
          }
        });
      }
    }
  },
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

    tableData: {
      type: Array,
      default: () => [],
      required: true
    },
    tableColumn: {
      type: Array,
      default: () => [],
      required: true
    },
    rowHeight: {
      type: Number,
      default: 40
    },
    cellWidth: {
      type: Number,
      default: 100
    },
    height: {
      type: [Number, String],
      default: '100%'
    },
    virtualHorizontal: {
      type: [Boolean, String],
      default: false
    }
  },
  data() {
    return {
      virtualScroll: {
        virtualData: [],
        startIndex: 0,
        endIndex: 13,
        translateX: 0,
        offsetNum: 3,
        resizeState: null
      },
      tableId: 'virtual-table' + uuid(4, 1),
      tableDom: {
        warpper: '',
        warppers: ''
      },
      scrollObj: {
        scrollLeft: 0,
        scrollTop: 0
      },
      ifSelectAll: false,
      selectNum: 0,
      renderData: [],
      renderColumns: [],
      checkboxAll: {
        value: false,
        indeterminate: false,
        disabled: false
      }
    };
  },
  computed: {},
  watch: {
    tableData: {
      handler(val) {
        if (val && val.length) {
          const { startIndex, endIndex } = this.virtualScroll;
          this.renderData = val.slice(startIndex, endIndex);
          this.$worker
            .run(
              (val) => {
                const len = val.length;
                for (let i = 0; i < len; i++) {
                  if (val[i].$v_checked) {
                    this.checkboxAll.indeterminate = true;
                    continue;
                  } else {
                    val[i].$v_checked = false;
                  }
                }
                return val;
              },
              [this.tableData]
            )
            .then((res) => {
              this._refreshVirtualData(res);
            });
        } else {
          this.renderData = [];
          this.checkboxAll.value = false;
        }
      },
      immediate: true
    },
    selectNum(val) {
      if (val === this.tableData.length) {
        this.checkboxAll.indeterminate = false;
        this.checkboxAll.value = true;
        this.ifSelectAll = true;
      } else if (val !== 0) {
        this.checkboxAll.indeterminate = true;
        this.ifSelectAll = false;
      } else {
        this.checkboxAll.indeterminate = this.checkboxAll.value = false;
        this.ifSelectAll = false;
      }
    }
  },
  created() {
    this.renderColumns = this.tableColumn;
  },
  mounted() {
    //如果动态开启虚拟滚动，需要重新计算表格高度
    // 获取表格的宽高,格式为 { height : number, width : number }}
    this.virtualScroll.resizeState = this.getRefs().resizeState;

    // 给表格的 tbody 添加一个监听滚动事件
    this.tableDom = this._getScrollWarppers();
    this.tableDom.warpper.addEventListener('scroll', this._onVirtualScroll);

    // 给表格生成一个动态样式 <style></style>
    dynamicStyleRule(this.tableId, this._getVirtualStyleRule());
  },
  beforeDestroy() {
    // 销毁时移除动态样式
    dynamicStyleRule(this.tableId);
  },
  methods: {
    _showSlot(prop) {
      return this.$scopedSlots[prop] || this.$slots[prop];
    },
    getProps(type, attrs) {
      return getProps(type, attrs);
    },
    getRefs(name = 'elTable') {
      return this.$refs[name];
    },
    // 防抖
    _debounce(fn, delay) {
      let timer = null;
      return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(this, arguments);
        }, delay);
      };
    },
    // 垂直更新渲染数据
    _updateVertialData() {
      const { offsetNum, virtualData, translateX } = this.virtualScroll;

      if (!virtualData && !virtualData.length) return;
      // 计算开始结束渲染位置

      // 获取滚动容器
      const { warpper, warppers } = this.tableDom;

      // 获取每一行的高度
      const rowHeight = this.rowHeight;
      // 获取滚动条的位置
      const scrollTop = warppers[0]['scrollTop'] || 0;
      // 计算开始结束渲染位置
      const offsetHeight = offsetNum * rowHeight;
      // 获取表格的高度
      const viewportHeight = warpper['clientHeight'];
      // 计算开始结束索引(下标)
      let startIndex = Math.floor((scrollTop - offsetHeight) / rowHeight);
      let endIndex = Math.ceil((scrollTop + offsetHeight + viewportHeight) / rowHeight);
      // 限制索引范围
      if (startIndex < 0) startIndex = 0;
      if (endIndex > virtualData?.length) endIndex = virtualData?.length;
      // 切割出需要渲染的数据
      const renderData = virtualData.slice(startIndex, endIndex);

      const placeholderHeight = virtualData?.length * rowHeight - renderData?.length * rowHeight;
      // 设置实际的高度

      warppers.forEach((el) => {
        let placeholder = el.querySelector('.virtual-scroll-placeholder');

        if (placeholder) {
          placeholder.style.height = placeholderHeight + 'px';
        } else {
          placeholder = document.createElement('div');
          placeholder.setAttribute('class', 'virtual-scroll-placeholder');
          placeholder.style.height = placeholderHeight + 'px';
          el.appendChild(placeholder);
        }
        const transformY = startIndex * rowHeight;
        this._updateTransform(el, translateX, transformY);
      });

      this.renderData = renderData;

      // 更新渲染数据
      this.virtualScroll = {
        ...this.virtualScroll,
        startIndex,
        endIndex,
        placeholderHeight
      };
    },
    _disabledCheckbox(row, index) {
      if (this.showCheckbox && this.showCheckbox.constructor === Function) return !this.showCheckbox(row, index);
      return false;
    },

    // 刷新虚拟数据,用来保持现在的滚动条位置
    _refreshVirtualData(data) {
      // 判断column中是否有排序
      // ## 此处需要对数据名称进行改动,并且添加排序方法
      const sortColumn = this.tableColumn.find((v) => v.sortable);

      //获取 el-table 中 store 存储的排序的列
      const sortingColumn = this.getRefs().store._data.states.sortingColumn;
      // 如果有排序,则使用 element-ui 的 table 的排序方法
      if (sortColumn && sortingColumn) {
        this.virtualScroll.virtualData = orderBy(data, sortingColumn.property, sortingColumn.order, sortingColumn.sortMethod, sortingColumn.sortBy);
      } else {
        this.virtualScroll.virtualData = data;
      }
      if (this.virtualHorizontal) {
        this._updateHorizontal();
      } else {
        this.renderColumns = this.tableColumn;
      }
      this._updateVertialData();
    },
    // 横向更新渲染数据
    _updateHorizontal() {
      const { offsetNum } = this.virtualScroll;
      // 计算开始结束渲染位置
      // 获取滚动容器
      const { warpper, warppers } = this.tableDom;

      // 获取每一行的宽度
      const cellWidth = this.cellWidth;
      // 获取滚动条的位置
      const scrollLeft = warppers[0]['scrollLeft'] || 0;
      // 计算开始结束渲染位置
      const offsetWidth = offsetNum * cellWidth;
      // 获取表格的高度
      const viewportWidth = warpper['clientWidth'];

      // 计算开始结束索引(下标)
      let horizonStartIndex = Math.floor((scrollLeft - offsetWidth) / cellWidth);

      let horizonEndIndex = Math.ceil((scrollLeft + offsetWidth + viewportWidth) / cellWidth);

      // 限制索引范围
      if (horizonStartIndex < 0) horizonStartIndex = 0;
      if (horizonEndIndex > this.tableColumn?.length) horizonEndIndex = this.tableColumn?.length;
      // 获取要展示的字段数据
      const renderColumns = Object.freeze(this.tableColumn.slice(horizonStartIndex, horizonEndIndex));

      let translateX = horizonStartIndex * cellWidth;
      // 计算出滚动条的位置
      if (scrollLeft >= offsetWidth) {
        translateX = scrollLeft - offsetWidth;
      }
      const placeholderWidth = this.tableColumn?.length * cellWidth - renderColumns?.length * cellWidth;
      // 设置实际的高度

      warppers.forEach((el) => {
        let placeholder = el.querySelector('.virtual-scroll-placeholder');

        if (placeholder) {
          placeholder.style.width = placeholderWidth + 'px';
        } else {
          placeholder = document.createElement('div');
          placeholder.setAttribute('class', 'virtual-scroll-placeholder');
          placeholder.style.width = placeholderWidth + 'px';
          el.appendChild(placeholder);
        }
        this._updateTransform(el, translateX);

        // 设置表格的translateX
      });

      this.renderColumns = renderColumns;

      // 更新渲染数据
      this.virtualScroll = {
        ...this.virtualScroll,
        placeholderWidth,
        translateX
      };
    },
    _updateTransform(el, translateX = this.virtualScroll.translateX, translateY = this.virtualScroll.startIndex * this.rowHeight) {
      el.querySelector('.el-table__body').style.transform = `translate(${translateX}px,${translateY}px)`;
    },
    _updateRenderData() {
      if (this.virtualHorizontal) {
        const type = this._scrollDirection();

        if (type === 'vertical') {
          this._updateVertialData();
        } else {
          this._updateHorizontal();
        }
      } else {
        this._updateVertialData();
      }
    },
    // 监听页面是否重绘,如果重绘,则更新渲染规则与样式
    _onVirtualScroll() {
      window.requestAnimationFrame(this._updateRenderData);
    },
    _scrollDirection() {
      // 获取滚动容器
      const { warppers } = this.tableDom;
      // 获取滚动条的位置
      const currentScrollTop = warppers[0]['scrollTop'] || 0;
      const currentScrollLeft = warppers[0]['scrollLeft'] || 0;
      const { scrollTop, scrollLeft } = this.scrollObj;
      if (currentScrollTop !== scrollTop) {
        // 垂直滚动
        this.scrollObj.scrollTop = currentScrollTop;
        return 'vertical';
      }
      if (currentScrollLeft !== scrollLeft) {
        // 水平滚动
        this.scrollObj.scrollLeft = currentScrollLeft;
        return 'horizontal';
      }
    },
    // 滚动到指定行
    _virtualScrollToRow(rowOrIndex) {
      // 获取滚动容器
      const { warppers } = this.tableDom;
      // 获取要滚动行的下标,如果是数字,则直接使用,如果是一条数据,则获取数据的下标
      let index = typeof rowOrIndex === 'number' ? rowOrIndex : this.virtualScroll.virtualData.findIndex((row) => row === rowOrIndex);
      index = index < 1 ? 0 : index - 1;

      // 将滚动条滚动到指定位置,通过下标 * 每一行的高度
      warppers.forEach((el) => {
        el.scrollTop = index * this.rowHeight;
      });
    },
    // 获取行索引(下标)
    getVirtualRowIndex(index) {
      return this.virtualScroll.startIndex + index;
    },
    _selectionAllInput(v) {
      if (this.ifSelectAll) {
        this.selectNum = 0;
        this.renderData.forEach((v) => {
          v['$v_checked'] = false;
        });
      } else {
        this.selectNum = this.tableData.length;
        this.renderData.forEach((v) => {
          v['$v_checked'] = true;
        });
      }

      this.$worker
        .run(
          (val, ifSelectAll) => {
            return val.map((v) => {
              v['$v_checked'] = !ifSelectAll;
              return v;
            });
          },
          [this.tableData, this.ifSelectAll]
        )
        .then((res) => {
          this.virtualScroll.virtualData = res;
        });

      const selectAll = this.$listeners['select-all'];
      const selectionChange = this.$listeners['selection-change'];
      if (!!selectAll) {
        selectAll(this.selectNum);
      }
      if (!!selectionChange) {
        selectionChange(this.selectNum);
      }
    },
    _handleSelectionChange(row, i) {
      const index = this.getVirtualRowIndex(i);
      if (row['$v_checked'] === undefined) {
        row['$v_checked'] = true;
        this.virtualScroll.virtualData[index]['$v_checked'] = true;
      } else {
        row['$v_checked'] = !row['$v_checked'];
        this.virtualScroll.virtualData[index]['$v_checked'] = row['$v_checked'];
      }
      this.selectNum = row['$v_checked'] ? Number(this.selectNum) + 1 : Number(this.selectNum) - 1;
    },
    // 数组元素是否相同
    _ifSameItem(arr) {
      if (arr[0] === arr[1]) {
        return arr[0];
      }
      return arr;
    },
    // 生成虚拟滚动样式
    _getVirtualStyleRule() {
      const tdBorderHeight = 1;
      const rowHeight = this.rowHeight - tdBorderHeight;
      const styleRule = `
      #${this.tableId} .el-table__cell {
        padding: 0px !important;
      }
      #${this.tableId} .el-table__cell .cell {
        height: ${rowHeight}px !important;
        line-height: ${rowHeight}px;
      }
      #${this.tableId} .el-table__header-wrapper {
        overflow: hidden;
      }
      #${this.tableId} .el-table__header-wrapper  .cell{
      }
      #${this.tableId} .virtual-scroll-checkbox .el-checkbox__inner,
      #${this.tableId} .virtual-scroll-checkbox .el-checkbox__inner::after {
        transition: none;
      } `;
      return styleRule;
    },
    // 获取虚拟滚动列表的所需dom元素
    _getScrollWarppers() {
      const el = this.getRefs().$el;
      const warpper = el.querySelector('.el-table__body-wrapper');
      const fixedWrapper = el.querySelector('.el-table__fixed .el-table__fixed-body-wrapper');
      const rightFixedWrapper = el.querySelector('.el-table__fixed-right .el-table__fixed-body-wrapper');
      const warppers = [warpper, fixedWrapper, rightFixedWrapper].filter((v) => v);
      return {
        warpper,
        warppers
      };
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
