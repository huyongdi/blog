web-hydtype
利用vue-cli初始化vue+webpack项目之后，想着把共用模块提取出来，比如自己写的页码组件，或者是其它公用模块，遇到了通信问题，记录一下。

### 1.click特殊情况下用mousedown替代
input框获得焦点时，显示一个内容。想隐藏时候：
##### ①.点击除了input框之外的地方，隐藏内容。然后内容部分点击阻止冒泡，这也是大部分人最常用的。
##### ②.将内容部分click替换成mousedown，input框失去焦点就隐藏内容。实现原理：mousedown会优于blur执行，所以点击的时候，不会触发blur导致隐藏

### 2.vue子组件和父组件的通信
##### ①.父组件通过props传值向子组件传值
prop 是单向绑定的：父组件更新值时，子组件会随着更新，但是反过来不会，并且报错
```bash
//prop 作为初始值传入后，子组件想把它当作局部数据来用；
//定义一个局部变量，并用 prop 的值初始化它：
props: ['initialCounter'],
data: function () {
return { counter: this.initialCounter }
}
//prop 作为初始值传入，由子组件处理成其它数据输出。
//定义一个计算属性，处理 prop 的值并返回。
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```

##### ②.子组件通过$emit传值给父组件
```bash
//子组件
this.$emit('onEnter',this.childValue) //函数名和父元素的@onEnter一致
//父组件
<search @onEnter="onEnter"></search>
onEnter: function (data) {} //data就是子组件传过来的childValue
```
