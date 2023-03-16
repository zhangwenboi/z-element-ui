#  动态表单

## 介绍

很多情况下,我们需要一个动态表单完成相对应的功能, z-element-ui  提供了这个功能,无论是 `z-grid-form` 还是 `z-desc-form` ,以及`z-form`,都支持这个功能.



## 使用





将需要绑定的 `form` 格式更改为 `Array `,就会自动开启动态表单,此时操作 `form` 数据即可对数据进行增删改查.



<ClientOnly><zDynamicFormDemo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/zDynamicFormDemo.vue
:::

::: tip

动态表单支持任何布局方式,和其他方式使用 ` z-form` 表单, 只有 `form` 字段数据格式不同.

:::



| name | description                                             | type                  |
| ---- | ------------------------------------------------------- | --------------------- |
| form | 将form字段改为 `Array` 类型,表单会自动开启动态编辑模式. | Array                 |
| ...  | 各个布局的属性参数                                      | 详情查看各个表单文档. |


