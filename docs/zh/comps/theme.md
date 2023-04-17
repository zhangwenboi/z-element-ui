# 自定义主题

::: warning
默认请求网络资源,如果是在没有网络的环境必须提供本地文件地址.
:::


<ClientOnly><zThemeDemo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/zThemeDemo.vue
:::



| 属性          | 描述                                                         | 默认值                                                       |
| ------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| v-model/value | 颜色配置,可以对所有颜色进行配置,如果传递一个字符串,默认设置为`primary`颜色.如果需要对其他颜色进行更改,需要将颜色值全部覆盖 | \#409EFF 必须为16进制颜色<br />全部颜色默认值<br />{\"primary\":\"#409EFF\",<br />\"success\":\"#67C23A\",<br />\"info\":\"#909399\",<br />\"warning\":\"#E6A23C\",<br />\"danger\":\"#F56C6C\"} |
| url           | css资源地址                                                  | https://unpkg.com/element-ui@2.15.13/lib/theme-chalk/index.css |
| caches        | 是否对css资源进行缓存,将会缓存到 `localStorage` 中           | true                                                         |

