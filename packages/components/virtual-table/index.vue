<!-- @format -->

<template>
  <zTable
    v-bind="$attrs"
    v-on="$listeners"
    :tableId="tableId"
    :frontPagination="false"
    :showPagination="false"
    :tableData="renderData"
    :tableColumn="column"
    ref="table"
    :height="height"
  >
    <template #selectionheader>
      <el-checkbox
        v-bind="checkboxAll"
        @input="_selectionAllInput"
      ></el-checkbox>
    </template>
    <template #selection="{ row, $index }">
      <checkboxSingle
        v-bind="{ row, $index }"
        @input="_handleSelectionChange(row, $index)"
      >
      </checkboxSingle>
    </template>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </zTable>
</template>
<script>
import zTable from '../table/index.vue';
import { orderBy } from 'element-ui/packages/table/src/util.js';
import { dynamicStyleRule, uuid } from '../../utils/utils';

export default {
  name: 'virtualTable',
  components: {
    zTable,
    checkboxSingle: {
      name: 'checkboxSingle',
      functional: true,
      render(h, { props: { row, $index }, listeners, parent }) {
        const { selectList, _disabledCheckbox, virtualScroll } = parent,
          { startIndex } = virtualScroll,
          index = startIndex + $index;

        const isSelected = selectList.filter((item) => {
          return item[0] <= index && item[1] >= index;
        })?.length;
        // 判断是否选中
        const isDisabled = _disabledCheckbox(row, index);

        // 生成多选框
        return h('el-checkbox', {
          class: 'virtual-scroll-checkbox',
          props: {
            value: !!isSelected,
            disabled: isDisabled
          },
          on: {
            input: listeners['input'],
            nativeOn: { click: (event) => event.stopPropagation() }
          }
        });
      }
    }
  },
  data() {
    return {
      virtualScroll: {
        virtualData: [],
        startIndex: 0,
        endIndex: 0,
        offsetNum: 3,
        resizeState: null,
        selectAll: false
      },
      renderData: [],
      selectList: this.selection,
      ifSelectAll: false,
      scrollObj: {
        lastScrollTop: 0,
        lastScrollLeft: 0
      },
      tableDom: {
        warpper: '',
        warppers: ''
      },
      tableId: 'virtual-table' + uuid(4, 1)
    };
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableColumn: {
      type: Array,
      default: () => []
    },
    rowHeight: {
      type: Number,
      default: 40
    },
    height: {
      type: Number,
      default: 300
    },
    showCheckbox: {
      type: [Boolean, Function, String],
      default: false
    },
    selection: {
      type: Array,
      default: () => []
    },
    virtualHorizontal: {
      type: [Boolean, String],
      default: false
    }
  },
  computed: {
    checkboxAll() {
      const virtual = this.virtualScroll;
      const value = virtual.virtualData?.length > 0 && this.selectList?.length === virtual.virtualData?.length;
      const disabled = virtual.virtualData?.length === 0;
      const indeterminate = this.selectList?.length > 0 && !value;
      return {
        value,
        disabled,
        indeterminate
      };
    },

    column() {
      const newTableColumn = (
        this.showCheckbox
          ? [
            {
              prop: 'selection',
              width: 45,
              algin: 'center'
            }
          ]
          : []
      ).concat(this.tableColumn);
      return newTableColumn;
    }
  },
  mounted() {
    //如果动态开启虚拟滚动，需要重新计算表格高度
    // 获取表格的宽高,格式为 { height : number, width : number }}
    this.virtualScroll.resizeState = this.$refs.table.getRefs().resizeState;

    // 给表格的 tbody 添加一个监听滚动事件
    this._getScrollWarppers().warpper.addEventListener('scroll', this._onVirtualScroll);

    // 给表格生成一个动态样式 <style></style>
    dynamicStyleRule(this.tableId, this._getVirtualStyleRule());
  },
  beforeDestroy() {
    // 销毁时移除动态样式
    dynamicStyleRule(this.tableId);
  },
  watch: {
    // 监听表格数据变化
    tableData: {
      handler(newv, oldv) {
        // 如果数据有变化，将选中的数据清空
        if (oldv !== newv) this.selectList = [];

        // 更新渲染数据
        if (newv && newv.length) this._refreshVirtualData();
      }
    },
    // 监听表格高度变化,然后更新相关样式,以及更新现在高度下的渲染位置
    'virtualScroll.resizeState.height'(v) {
      v && this._updateVertialData();
    }
  },

  methods: {
    // 垂直更新渲染数据
    _updateVertialData() {
      // 计算开始结束渲染位置
      const { offsetNum } = this.virtualScroll;
      const virtualData = Object.freeze(this.tableData);
      // 获取滚动容器
      const { warpper, warppers } = (this.tableDom = this._getScrollWarppers());
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
        el.querySelector('.el-table__body').style.transform = `translateY(${startIndex * rowHeight}px)`;
      });
      this.renderData = Object.freeze(renderData);
      // 更新渲染数据
      this.virtualScroll = Object.freeze({
        ...this.virtualScroll,
        virtualData,
        startIndex,
        endIndex,
        placeholderHeight
      });
    },
    _disabledCheckbox(row, index) {
      if (this.showCheckbox && this.showCheckbox.constructor === Function) return !this.showCheckbox(row, index);
      return false;
    },

    // 刷新虚拟数据,用来保持现在的滚动条位置
    _refreshVirtualData() {
      // 判断column中是否有排序
      // ## 此处需要对数据名称进行改动,并且添加排序方法
      const sortColumn = this.tableColumn.find((v) => v.sortable);

      //获取 el-table 中 store 存储的排序的列
      const sortingColumn = this.$refs.table.getRefs().store._data.states.sortingColumn;
      // 如果有排序,则使用 element-ui 的 table 的排序方法
      if (sortColumn && sortingColumn) {
        this.virtualScroll.virtualData = Object.freeze(orderBy(this.tableData, sortingColumn.property, sortingColumn.order, sortingColumn.sortMethod, sortingColumn.sortBy));
      } else {
        this.virtualScroll.virtualData = Object.freeze(this.tableData);
      }

      this._updateVertialData();
    },
    // 横向更新渲染数据
    _updateHorizontal() { },
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
      const { lastScrollTop, lastScrollLeft } = this.scrollObj;
      if (currentScrollTop !== lastScrollTop) {
        // 垂直滚动
        this.scrollObj.lastScrollTop = currentScrollTop;
        return 'vertical';
      }
      if (currentScrollLeft !== lastScrollLeft) {
        // 水平滚动
        this.scrollObj.lastScrollLeft = currentScrollLeft;
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
      const virtual = this.virtualScroll;
      if (this.ifSelectAll) {
        this.selectList = [];
      } else {
        this.selectList = [[0, virtual.virtualData.length - 1]];
      }
      this.ifSelectAll = !this.ifSelectAll;

      const selectAll = this.$listeners['select-all'];
      const selectionChange = this.$listeners['selection-change'];
      if (!!selectAll) {
        selectAll(this.selectList);
      }
      if (!!selectionChange) {
        selectionChange(this.selectList);
      }
    },
    _handleSelectionChange(row, i) {
      // 如果已经是选中状态,将selectList中的数组分割成两个数组

      const currentIndex = this.getVirtualRowIndex(i);
      if (this.selectList.length > 0) {
        const parentArray = this.selectList.find((item, index) => {
          return item[0] <= currentIndex && item[1] >= currentIndex;
        })
        console.log("🚀 ~ this.selectList:", this.selectList);

        if (parentArray) {
          const index = this.selectList.indexOf(parentArray);

          // 如果是第一个,则将第一个值加一,如果是最后一个,则将最后一个值减一,如果是中间的,则将当前的值减一,将后面的值加一
          if (currentIndex === parentArray[0]) {
            this.selectList.splice(index, 1, [currentIndex + 1, parentArray[1]]);
          } else if (currentIndex === parentArray[1]) {
            this.selectList.splice(index, 1, [parentArray[0], currentIndex - 1]);
          } else {
            this.selectList.splice(index, 1, [parentArray[0], currentIndex - 1], [currentIndex + 1, parentArray[1]]);
          }
          this.ifSelectAll = false;
          return;
        } else {
          // 如果当前选项不在selectList中的所有数组中,则将当前选项的下标组合到selectList中

          if (currentIndex < this.selectList[0][0]) {
            this.selectList[0][0] = currentIndex;

          } else if (currentIndex > this.selectList[this.selectList.length - 1][1]) {
            this.selectList[this.selectList.length - 1][1] = currentIndex;
          } else {
            for (let i = 0; i < this.selectList.length; i++) {
              if (Math.abs(this.selectList[i][0] - currentIndex) === 1) {


              } else if (Math.abs(this.selectList[i][1] - currentIndex) === 1) {


              }
              if (currentIndex > this.selectList[i][0] && currentIndex < this.selectList[i][1]) {
                this.selectList.splice(i, 0, [currentIndex, currentIndex]);
                break;
              }
            }
          }


          this.ifSelectAll = false;
        }
      }
      const selection = this.selectList;
      let index = selection.indexOf(row);
      if (index == -1) {
        selection.push(row);
      } else {
        selection.splice(index, 1);
      }
      const selectionChange = this.$listeners['selection-change'];
      if (!!selectionChange) {
        selectionChange(row);
      }
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
      #${this.tableId} .virtual-scroll-checkbox .el-checkbox__inner,
      #${this.tableId} .virtual-scroll-checkbox .el-checkbox__inner::after {
        transition: none;
      } `;
      return styleRule;
    },
    // 获取虚拟滚动列表的所需dom元素
    _getScrollWarppers() {
      const el = this.$refs.table.getRefs().$el;
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
<style scoped></style>
