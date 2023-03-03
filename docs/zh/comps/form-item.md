# form-item

## 描述 

`z-elment-ui` 将`el-form-item` 进行了二次封装,整合了常用的form表单组件,添加相关的配置即可.

<ClientOnly><zFormItemDemo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/zFormItemDemo.vue
:::

::: tip

如果想在 `z-form-item`中使用`el-element`中的组件,按照数据格式来进项相关设置即可,`option`中可进行相关属性绑定,实例中有体现.
如果使用`z-select` `z-radio` `z-checkbox`等,需要为组件提供`data`.
其他属性与使用的组件有关,比如使用`el-button`时设置其大小,option为`{ size:'mini' }`

:::

::: warning
设置默认值时直接对`form`对象赋值,会覆盖`defaultValue`的值.
:::


## 属性介绍

| 字段名称     | 描述                                                         | 格式                                                         |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| ***form***   | `el-form`中的model属性绑定的form,用来实现数据绑定.如果使用`z-grid-form` `z-inline-form` 等二次封装表单,无需在  `items` 中 传递此字段. | object                                                       |
| ***prop***   | 绑定form的字段名，涵盖了`el-form-item`中prop字段的作用,并且通过此字段实现form表单响应式数据流 | String                                                       |
| ***render*** | 组件名称或者渲染函数(jsx)                                    | String, Function                                             |
| label?       | 表单标签名,可以为空,为空则不显示标签,如果在`el-form`上设置过`label-width`此时会有占位,可以单独给该表单项设置一个 `label-width:0` 取消占位 | String                                                       |
| defaultValue | 默认值，如果`data`数据为`promise`推荐使用直接给`form`进行赋值. | --                                                           |
| isTag        | 默认为`true`,当 `isTag:false`时 `render` 将会被作为文本输出  | Boolean                                                      |
| option       | 该组件的配置,如`el-option` 的disabled  placeholder 等等,如果是`z-select` 需要选项的数据,则需要添加data | Object,根据组件不同添加相关的配置.                           |
| on           | 绑定到该组件的事件                                           | Object                                                       |
| slots        | 组件的插槽                                                   | Object                                                       |
| 更多...      | 继承`el-form-item`中的属性,如`show-message` `inline-message` | [el-form-item属性 \| Element](https://element.eleme.cn/#/zh-CN/component/form#form-item-attributes) |

### on与slots

放入`on` 对象中的方法,都将被绑定到当前组件上,例如`el-input` 的`input`事件,可以这样配置:

```js
on:{
	input:(e)=>{
		console.log(e)
	}
}
```



`slots` 的作用是用来补充数据配置状态下 `z-form-item` 无法完成的功能,例如`el-input` 中的 `suffix` 插槽等,例如:

```js
slots:{
	suffix:()=> <i>这是尾部文字<i>,
	prepend:'这是头部文字'
}
```

