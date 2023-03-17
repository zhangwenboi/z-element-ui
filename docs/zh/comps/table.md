# 表格

## 描述

使用`z-table`可以缩减 90%的 html 标签编写，如果有特殊的展示需求，`z-table`支持插槽模式进行使用。并且不影响原`el-table`的使用

## 使用

### 普通表格

`z-table` 引入了 `el-pagination`，无需关注如何分页,`z-table`会自动帮你完成分页， 是否分页由 `showPagination` 字段控制,默认开启

`el-pagination` 的配置项可以像传递 `tableData` 一样直接传入.

<ClientOnly><zTableDemo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/zTableDemo.vue
:::

### 服务器分页表格

`z-table` 支持服务器分页,传入 `:frontPagination='false'` . 并且使用 `pageIndexChange` 回调函数，下面是一个例子

<ClientOnly><zTablePageDemo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/zTablePageDemo.vue
:::



### 插槽 slot 操作列

操作列插槽为 `z-table` 默认插槽,接收三个参数 ` #default = { row , $index , column } `.

<ClientOnly><zTableSlotDemo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/zTableSlotDemo.vue
:::


## Table Attributes

| 属性                   |                类型                |                            默认值                            | 说明                                                         |
| :--------------------- | :--------------------------------: | :----------------------------------------------------------: | ------------------------------------------------------------ |
| **tableData**          | Array<{prop:string, label:string}> |                             [ ]                              | 表格数据                                                     |
| **tableColumn**        |               Array                |                             [ ]                              | 表格项                                                       |
| showPagination         |              Boolean               |                             true                             | 是否开启分页                                                 |
| paginationOption       |               Object               | {\"layout\": \"total,sizes,prev,pager,next\", \"pageSize\":10, "total\":0, \"currentPage\":1} | 分页配置集合，支持所有的 pagination 配置项[el-pagination组件 \| Element](https://element.eleme.cn/#/zh-CN/component/pagination) |
| layout                 |               String               |                 total,sizes,prev,pager,next                  | 组件布局，子组件名用逗号分隔                                 |
| total                  |               Number               |                              0                               | 总条目数                                                     |
| pageSize               |               Number               |                              10                              | 每页显示条目个支持 .sync 修饰符 数                           |
| currentPage            |               Number               |                              1                               | 当前页,支持 .sync 修饰符数                                   |
| showIndex              |              Boolean               |                            false                             | 是否展示序号                                                 |
| showOperation          |              Boolean               |                            false                             | 是否展示操作列                                               |
| showExpand             |              Boolean               |                            false                             | 是否展示展开列                                               |
| showFixed              |              Boolean               |                            false                             | 是否固定列                                                   |
| showCheckbox           |              Boolean               |                            false                             | 是否开启多选框                                               |
| ***page-change***      |              Function              |                             ...                              | 页码改变时的钩子函数                                         |
| ***page-size-change*** |              Function              |                             ...                              | 页面展示数量变化时的钩子函数                                 |
| ......                 |               ......               |                            ......                            | ....其他属性,请参考[el-table组件 \| Element](https://element.eleme.cn/#/zh-CN/component/table#table-attributes) |

## Slot 列表

| 插槽名                                                           | 使用方式             | 注意                                                                                                       |
| ---------------------------------------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------- |
| #default => 操作列插槽                                           | 查看插槽 slot 操作列 | 使用时必须将showOperation设置为true                                                                        |
| #[prop] => prop是需要的插槽                                      | 查看插槽 slot 操作列 | 直接在`z-table`中编写就行,如果需要多级表头建议直接使用`el-table`                                           |
| #[propheader] => propheader 是需要插槽的表头格式为 prop+'header' | 查看插槽 slot 操作列 | 如果在使用表头点击事件等等,使用插槽是最好的方式了,如果仅仅需要排序过滤等功能,建议在`tableColumn`中进行配置 |

