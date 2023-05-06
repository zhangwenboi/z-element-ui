# 自定义指令

`z-element-ui` 提供了常用的自定义指令,全局引入状态下,直接可以使用

下面是常用的自定义指令:

`v-copy`: 给当前元素加入点击复制功能,需要传递参数

`v-limit`: 给当前输入元素增加输入限制, 使用修饰符进行控制,支持 `int` `number` 

`v-outside`: 点击绑定元素之外的地方,触发回调.支持 `stop` `prevent` 修饰符

`v-onlyInt`: 无更改的限制当前输入框的输入类型为数字

`v-onlyNumber`: 当输入超过最大值时自动更改,并且可以限制小数

<ClientOnly><zDirectives/></ClientOnly>

