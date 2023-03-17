# 可编辑表格

## 描述

##### 无后台交互的编辑表格.







<ClientOnly><zEditTableDemo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/zEditTableDemo.vue
:::

##### 与后台相交互的表格

如果需要与后台进行交互,需要在 `z-edit-table`上传入 `@delete-table` 与 `@save-table` 方法.

::: warning

`@delete-table` 与 `@save-table` 接收一个参数, 参数中包含一个  `loading` 方法,调用此方法可以切换实现加载状态的切换.

:::





<ClientOnly><zEditTableServiceDemo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/zEditTableServiceDemo.vue
:::

下方是`z-edit-table`的数据配置介绍,以及数据格式规范:

### paginationOption

 与 `z-table` 使用方式一致 [详情](/zh/comps/table.html#table-attributes)

### form字段的内容



| 字段名称               | 描述                                          | 格式                                                         |
| ---------------------- | --------------------------------------------- | ------------------------------------------------------------ |
| v-model                | 表格数据,对表格的操作会直接改变此字段中的内容 | 根据tableColumn相对应的数据 **(required)**                   |
| tableColumn            | 表格的列配置                                  | ***`Array<{prop:String,label:String,...el-table中表头相关的属性}>`***表格中可以添加列对应的属性,如果你不知道哪些属性有效果,可以添加上去试试.[table-column \| Element](https://element.eleme.cn/#/zh-CN/component/table#table-column-attributes) |
| rules                  | 校验规则,可以为空                             | 与el-form的校验规则格式相同                                  |
| items                  | 编辑状态下各个组件相对应的组件                | prop:String 这条数据对应的字段,与tableColumn中prop相对应<br />render:String\|Function 标记状态下需要展示的组件,如`z-select``el-input`<br />isTag:Boolean 告诉`z-edit-table`render为要渲染的字符串还是组件的名称.当值为false时 render字段的值将会被当作字符串直接渲染 |
| showPagination         | Boolean                                       | true                                                         |
| paginationOption       | Object                                        | {\"layout\": \"total,sizes,prev,pager,next\", \"pageSize\":10, "total\":0, \"currentPage\":1},其他属性请[查看](https://element.eleme.cn/#/zh-CN/component/pagination#attributes) |
| layout                 | String                                        | total,sizes,prev,pager,next                                  |
| total                  | Number                                        | 0                                                            |
| pageSize               | Number                                        | 10                                                           |
| currentPage            | Number                                        | 1                                                            |
| showIndex              | Boolean                                       | false                                                        |
| showOperation          | Boolean                                       | false                                                        |
| showExpand             | Boolean                                       | false                                                        |
| showFixed              | Boolean                                       | false                                                        |
| showCheckbox           | Boolean                                       | false                                                        |
| ***page-change***      | Function                                      | 页码更新的回调方法                                           |
| ***page-size-change*** | Function                                      | page-size改变的回调方法                                      |
| ......                 | ......                                        | 其他属性,请参考[el-table组件 \| Element](https://element.eleme.cn/#/zh-CN/component/table#table-attributes) |


