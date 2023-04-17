# 虚拟滚动表格

## 虚拟滚动

虚拟滚动表格适合大量的数据情况.测试30w条数据 流畅不卡顿

纯文字渲染最快.

<ClientOnly><zVirtualTableDemo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/zVirtualTableDemo.vue
:::

| 属性           | 描述                                                     | 默认值<格式>                       |
| -------------- | -------------------------------------------------------- | ---------------------------------- |
| tableData      | 表格数据,大数据卡顿的话可以使用`Object.freeze`去除响应式 | []                                 |
| tableColumn    | 表头数据                                                 | `[{ label:string, prop:string  }]` |
| showCheckbox   | 是否展示多选框                                           | false `<boolean>`                  |
| showFixed      | 是否开启固定列                                           | false `<boolean>`                  |
| height         | 表格的总高度,默认将会根据父级高度来设置                  | 100% `<string|number>`             |
| rowHeight      | 表格行的同一高度                                         | 40 `<number>`                      |
| showOperation  | 是否开启操作列                                           | false `<boolean>`                  |
| operationLable | 操作列的表头标题                                         | 操作 `<string>`                    |


