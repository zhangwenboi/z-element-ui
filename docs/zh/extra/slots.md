# 插槽

## 介绍

由于在日常开发中插槽的必要性,`z-element-ui` 提供了很多插槽.

## table中的插槽

在 `z-table` 中使用插槽非常简单,例如 `z-edit-table` 就是使用 `z-table` 实现的.

下面是一个 `z-table` 中使用插槽的例子:

  

## form中的插槽

在 `form` 表单中,主要插槽有 `append`  prepend两种插槽, append插槽将会放置在form表单项的最前方, prepend插槽则在表单最后.

例如:

<ClientOnly><zSlotFormDemo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/zSlotFormDemo.vue
:::

::: warning



在各个表单布局下,使用插槽的方式也略有不同,例如在 `z-grid-form` 中插槽需要放入`el-col`中 以此来保持正常的布局.



:::



#### 组件中的插槽

在 ` items ` 中的 `slots` 字段中放置的插槽会放入当前 `item` 的组件中,例如



<ClientOnly><zComponentSlotDemo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/zComponentSlotDemo.vue
:::

插槽配置的格式就为:

```js
slots:{
	插槽名:()=>{
     	return   自定义组件 | render函数 | vNode | jsx(需要项目内支持)
    },
    插槽名:自定义组件name | render函数 | vNode | jsx(需要项目内支持)   
}
```

