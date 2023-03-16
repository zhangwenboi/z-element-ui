# 插槽

## 介绍

由于在日常开发中插槽的必要性,`z-element-ui` 提供了很多插槽.

## table中的插槽

在 `z-table` 中使用插槽非常简单,例如 `z-edit-table` 就是使用 `z-table` 实现的.

如果需要对某一列使用插槽,直接在 `z-table` 标签中添加相对应的插槽,例如:

```js
tableColumn:[
	{
		prop:'name',
		label:'姓名'
	},
	{
		prop:'age',
		label:'年龄'
	}
]
```

我想对 `name` 这一列使用 `el-tag` 进行展示,那么我将直接在 `z-table` 中加入插槽:

```html
<z-table :tableColumn="tableColumn" :tableData="tableData">
    <template #name="scope" >
    	<el-tag> {{ scope.row.name }}  </el-tag>
    </template>
</z-table>
```

那如果想对 `name` 的表头也使用插槽呢?只需要再添加一个名称为 `nameheader` 的插槽,两者相互独立互不影响, 表头的命名规则就为 ` 那一列的prop` + `header`.

```html
<z-table :tableColumn="tableColumn" :tableData="tableData">
    <template #name="scope" >
    	<el-tag> {{ scope.row.name }}  </el-tag>
    </template>
    <template #nameheader >
    	<el-tag> 只需要 `name` + `header`  </el-tag>
    </template>
</z-table>
```

::: warning

当你使用插槽的时候, `tableColumn` 中必须有该插槽对应的字段

:::

  ::: danger

​	 `z-table` 提供了几个固定名称插槽,在使用时应该避免与 `tableColumn` 的prop重复



​	`empty`:无数据时插槽

​	``

:::

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

