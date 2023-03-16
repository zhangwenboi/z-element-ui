# 行内表单

## 介绍

`z-form` 是由 `z-form-item` 完成的通用表单

## 使用


<ClientOnly><zInlineFormDemo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/zInlineFormDemo.vue
:::

::: tip

当 `items` 中某一项只设置 ` prop ` `label` 时, `z-form` 默认渲染 `el-input` 

:::



## Form attribute

| name    | description                                                  | 注意                                                         |
| ------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| form    | 将要绑定到 `el-form` `model` 上的对象                        | 必传 object                                                  |
| items   | 要渲染的字段列表,[详情见](/zh/comps/form-item.html#属性介绍) | 必传 Array                                                   |
| rules   | 与 `el-form` 中的 ` rules ` 保持一致                         | object                                                       |
| 更多... | ---                                                          | 继承`el-form`的全部属性, [更多属性](https://element.eleme.cn/#/zh-CN/component/form#form-attributes) |

