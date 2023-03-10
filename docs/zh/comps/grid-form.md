# 栅格表单

## 描述 

`z-grid-form`   使用 `el-form `  `el-row el-col`   `z-form-item` 实现.

支持所有的`el-form`属性以及方法.  

<ClientOnly><zGridFormDemo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/zGridFormDemo.vue
:::


## 响应式表单


`使用responsive:true开启表单响应式`

<ClientOnly><zGridFormResponsiveDemo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/zGridFormResponsiveDemo.vue
:::





## z-grid-form Attributes

| name             | description                                                  | 注意                                                                                                 |
| ---------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| form             | 将要绑定到 `el-form` `model` 上的对象                        | 必传 object                                                                                          |
| items            | 要渲染的字段列表,[详情见](/zh/comps/form-item.html#属性介绍) | 必传 Array                                                                                           |
| rules            | 与 `el-form` 中的 ` rules ` 保持一致                         | object                                                                                               |
| responsive       | 是否开始响应式,默认为 ` false `                              | boolean                                                                                              |
| tag              | 同 `el-tag`  tag                                             | string                                                                                               |
| type             | 同 `el-tag`  type                                            | string                                                                                               |
| justify          | 同 `el-tag`  justify                                         | string                                                                                               |
| align            | 同 `el-tag`  align                                           | string                                                                                               |
| responsiveMethod | 详情见下方                                                   | ``````                                                                                               |
| 更多...          | ---                                                          | 继承`el-form`的全部属性, [更多属性](https://element.eleme.cn/#/zh-CN/component/form#form-attributes) |

## responsivemethod 

如果你开启了响应式,并且想自己定义`span`的分配逻辑,那么你可以传入一个方法.默认为

::: warning

此方法接受一个`width`当前form表单的宽度

并且必须返回一个对象,例如: { span: 4 } 
:::

```
(width) => {
        let span = 24;
        if (width >= 500 && width < 900) span = 12;
        if (width >= 900 && width < 1200) span = 8;
        if (width >= 1200 && width < 1600) span = 6;
        if (width >= 1600) span = 4;
        return { span };
 }
```

