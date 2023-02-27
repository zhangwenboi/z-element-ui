# Select

# 描述

## dom方式使用
`z-select`可以在`z-edit-table``z-form-item`中使用,也可以单独使用.

<ClientOnly><zSelectDemo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/zSelectDemo.vue
:::

## 使用config配置方式

::: warning
此种方式需要依赖 `el-form` `z-form-item` 如果你只是需要一个选择框的表单,推荐使用 `dom方式` 创建.
:::


<ClientOnly><zSelectFormDemo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/zSelectFormDemo.vue
:::



### Select Attributes

| 参数        | 说明                                                | 类型                                                         |
| ----------- | --------------------------------------------------- | ------------------------------------------------------------ |
| data        | 可选项列表                                          | Array, Function, Promise, String [详情](/zh/comps/select.html#dom方式使用) |
| props       | data中字段,默认为{ label: 'label', value: 'value' } | Object                                                       |
| loadingText | 加载过程中的提示文字                                | String                                                       |
| noDataText  | 没有数据时的提示文字                                | String                                                       |
| noMatchText | 没有相关匹配结果时的提示文字                        | String                                                       |
| loding      | 是否处于加载状态                                    | Boolean                                                      |
| ...         | ...                                                 | [查看更多 \| Element](https://element.eleme.cn/#/zh-CN/component/select#select-attributes) |

### 插槽

| 插槽名称 | 说明                                      | 使用                                                         |
| -------- | ----------------------------------------- | ------------------------------------------------------------ |
| option   | option选项插槽,需要自定义时可以使用此插槽 | config模式:将其加入slots中即可,<br />dom模式:将其包裹在`z-select`中即可 |
| empty    | 无数据时的插槽                            | config模式:可以直接传递String类型<br />dom模式:将其包裹在`z-select`中即可 |
| prefix   | 前缀插槽                                  | config模式:将其放在slots对象中<br />dom模式:将其包裹在`z-select`中即可 |

