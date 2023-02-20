# form-item

## 描述 

`z-elment-ui` 将`el-form-item` 进行了二次封装,整合了常用的form表单组件,添加相关的配置即可.

`z-edit-table`与`z-form-item`设计模式基本相同,数据配置格式上也没有什么区别

<ClientOnly><zFormItemDemo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/zFormItemDemo.vue
:::

## 数据优先级




## 属性介绍

| 字段名称     | 描述                                                         | 格式                               |
| ------------ | ------------------------------------------------------------ | ---------------------------------- |
| prop         | 绑定form的字段名，涵盖了`el-form-item`中prop字段的作用,并且通过此字段实现form表单响应式数据流 | String                             |
| label?       | 表单标签名,如果为空则不显示标签,并且不会有占位,如果想和其他值一样有表单占位,可以传递一个空字符. | String                             |
| render       | 组件名称或者渲染函数                                         | String, Function                   |
| option       | 该组件的配置,如`el-option`disabled  placeholder 等等,如果是`z-select` 需要选项的数据,则需要添加data | Object,根据组件不同添加相关的配置. |
| defaultValue | 默认值，如果`data`数据为`promise`推荐使用直接给`form`进行赋值. | --                                 |
|              |                                                              |                                    |
|              |                                                              |                                    |

