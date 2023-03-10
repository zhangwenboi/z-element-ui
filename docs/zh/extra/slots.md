# 插槽

## 介绍

由于在日常开发中插槽的必要性,`z-element-ui` 提供了很多插槽.

## table中的插槽

## form中的插槽

在 `form` 表单中,主要插槽有 `append`  prepend两种插槽, append插槽将会放置在form表单项的最前方, prepend插槽则在表单最后.

例如:

<ClientOnly><zSlotFormDemo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/zSlotFormDemo.vue
:::

在各个表单布局下,使用插槽的方式也略有不同,例如在 `z-grid-form` 中插槽需要放入`el-col`中 以此来保持布局正常.



