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
| ***prop***   | 绑定form的字段名，涵盖了`el-form-item`中prop字段的作用,并且通过此字段实现form表单响应式数据流 | String                                                       |
| label?       | 表单标签名,如果为空则不显示标签,并且不会有占位,如果想和其他值一样有表单占位,可以传递一个空字符. | String                                                       |
| ***render*** | 组件名称或者渲染函数(jsx)                                    | String, Function                                             |
| defaultValue | 默认值，如果`data`数据为`promise`推荐使用直接给`form`进行赋值. | --                                                           |
| ***form***   | `el-form`中的model属性绑定的form,用来实现数据绑定.           | object                                                       |
| isTag        | 由于`render`字段为string类型的情况下会有 `text` 模式与组件渲染模式.所以加入`isTag`字段来让`z-form-item`分辨.默认为`true` | Boolean                                                      |
| option       | 该组件的配置,如`el-option`disabled  placeholder 等等,如果是`z-select` 需要选项的数据,则需要添加data | Object,根据组件不同添加相关的配置.                           |
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

