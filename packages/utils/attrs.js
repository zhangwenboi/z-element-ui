/** @format */

export const table = [
  'data',
  'height',
  'max-height',
  'stripe',
  'border',
  'size',
  'fit',
  'show-header',
  'highlight-current-row',
  'current-row-key',
  'row-class-name',
  'row-style',
  'cell-class-name',
  'cell-style',
  'header-row-class-name',
  'header-row-style',
  'header-cell-class-name',
  'header-cell-style',
  'row-key',
  'empty-text',
  'default-expand-all',
  'expand-row-keys',
  'default-sort',
  'tooltip-effect',
  'show-summary',
  'sum-text',
  'summary-method',
  'span-method',
  'select-on-indeterminate',
  'indent',
  'lazy',
  'load',
  'tree-props'
];

export const tableEvents = [
  'select',
  'select-all',
  'selection-change',
  'cell-mouse-enter',
  'cell-mouse-leave',
  'cell-click',
  'cell-dblclick',
  'row-click',
  'row-contextmenu',
  'row-dblclick',
  'header-click',
  'header-contextmenu',
  'sort-change',
  'filter-change',
  'current-change',
  'header-dragend',
  'expand-change'
];
export const tableColumn = [
  'type',
  'index',
  'column-key',
  'label',
  'prop',
  'width',
  'min-width',
  'fixed',
  'render-header',
  'sortable',
  'sort-method',
  'sort-by',
  'sort-orders',
  'resizable',
  'formatter',
  'show-overflow-tooltip',
  'align',
  'header-align',
  'class-name',
  'label-class-name',
  'selectable',
  'reserve-selection',
  'filters',
  'filter-placement',
  'filter-multiple',
  'filter-method',
  'filtered-value'
];

export const tableMethods = ['clearSelection', 'toggleRowSelection', 'toggleAllSelection', 'toggleRowExpansion', 'setCurrentRow', 'clearSort', 'clearFilter', 'doLayout', 'sort'];
export const pagination = [
  'small',
  'background',
  'page-size',
  'total',
  'page-count',
  'pager-count',
  'current-page',
  'layout',
  'page-sizes',
  'popper-class',
  'prev-text',
  'next-text',
  'disabled',
  'hide-on-single-page'
];
export const tableExtension = [
  'frontPagination',
  'showPagination',
  'tableColumn',
  'tableData',
  'operationWidth',
  'operationLable',
  'showIndex',
  'showOperation',
  'showFixed',
  'showExpand',
  'showCheckbox',
  ...pagination,
  ...table
];
// console.log(table.filter((item) => pagination.includes(item)));
export const row = ['gutter', 'type', 'justify', 'align', 'tag'];
export const col = ['span', 'offset', 'pull', 'push', 'xs', 'sm', 'md', 'lg', 'xl', 'tag'];
export const form = [
  'model',
  'rules',
  'inline',
  'label-position',
  'label-width',
  'label-suffix',
  'hide-required-asterisk',
  'show-message',
  'inline-message',
  'status-icon',
  'validate-on-rule-change',
  'size',
  'disabled',
  'style',
  'class'
];
export const formItem = ['prop', 'label', 'label-width', 'required', 'rules', 'error', 'show-message', 'inline-message', 'size', 'style', 'class'];
export const inputType = ['input', 'autocomplete'];
export default {
  table,
  tableEvents,
  tableColumn,
  tableMethods,
  tableExtension,
  pagination,
  col,
  row,
  inputType
};
