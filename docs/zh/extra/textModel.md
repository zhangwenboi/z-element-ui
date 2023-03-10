# 文本模式

## 介绍

该模式通过 `span` 标签实现,

## 使用

通过传递 `textModel` 开启文本模式,如果需要单独设置文本模式,将其加入 `items` 中需要设置的字段即可.

如果需要对显示的数据进行格式话,在 `items` 中传递 `format` 方法进行格式化.

<ClientOnly><zTextModelFormDemo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/zTextModelFormDemo.vue
:::


::: warning

在文字模式下,如果form中不存在对应的值则什么都不会显示.

:::

| name      | description                                                  | type                                                  |
| --------- | ------------------------------------------------------------ | ----------------------------------------------------- |
| textModel | 控制文本模式的开关,可以进行局部控制 (items中传递) 和全局控制 (作为属性传递给form表单) | Boolean                                               |
| format    | 当数据格式特殊时,在`items`中传递此方法.<br />此方法在通常情况下接受两个参数,在动态表单的情况下接受四个参数. | ( value,index,row?,rowIndex )  => ( vnode \| string ) |

