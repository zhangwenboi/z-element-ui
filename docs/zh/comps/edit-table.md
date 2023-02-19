# 可编辑表格

## 描述

`z-edit-table` 使用`z-table` `el-form`封装而成，它默认支持了`el-form`下的常用组件，如:`el-input ` `el-select` `el-datePicker`

`el-timePicker` `el-switch` `el-radio`  `el-checkbox` . 如果有更多需要可以在配置项**items**中将`render`更改为渲染函数的方式，下方实例中有相关展示.

<ClientOnly><zEditTableDemo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/zEditTableDemo.vue
:::
从上方实例我们可以发现，如果**items**中的组件需要给予属性值，需要将其放入 `option` 中，其中 `option` 中的`data`为该项所需的数据,例如`el-select`等选项.

下方是`z-edit-table`的数据配置介绍,以及数据格式规范:

### paginationOption

`z-table`中引入了 `el-pagination`分页管理器,如果在编辑表格的同时需要进行相关配置,直接将`el-pagination`的配置加到`z-edit-table`上即可,与直接使用z-table的使用相同.

### form



| 字段名称    | 描述                                          | 格式                                                                                                                                                                                                                                                                 |
| ----------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tableData   | 表格数据,对表格的操作会直接改变此字段中的内容 | 根据tableColumn相对应的数据 **(required)**                                                                                                                                                                                                                           |
| tableColumn | 表格的列配置                                  | ***`Array<{prop:String,label:String,...el-table中表头相关的属性}>`***表格中可以添加列对应的属性,如果你不知道哪些属性有效果,可以添加上去试试.[el-table**(required)**](https://element.eleme.cn/#/zh-CN/component/table)                                               |
| rules       | 校验规则,可以为空                             | 与el-form的校验规则格式相同                                                                                                                                                                                                                                          |
| items       | 编辑状态下各个组件相对应的组件                | prop:String 这条数据对应的字段,与tableColumn中prop相对应<br />render:String\|Function 标记状态下需要展示的组件,如`z-select``el-input`<br />isTag:Boolean 告诉`z-edit-table`render为要渲染的字符串还是组件的名称.当值为false时 render字段的值将会被当作字符串直接渲染 |

