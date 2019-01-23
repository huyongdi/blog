web-hydtype
首先批评一下自己，都学了快一个月的vue.js，连响应式双向绑定都没完全理解。
直到昨天晚上加班　　＝．＝

一直用的是，通过mounted函数，将实例内的函数暴露给实例外调用，实现数据更新

有２个问题需要注意：(ViewModel)

１.　视图，也就是html里面，可以先判断数据是否存在，防止报错
```bash
<span v-if="subPanel.diseaseData">{{subPanel.diseaseData.parent}}</span>
```

这一点补充记录一下，是错的，具体情况比较复杂，简单的说不应该在一个实例里面套用另一个实例（3.16）
２.  管理数据，也就是JS里面，实现响应式，不仅data里面外接视图的变量需要声明，如果想实现改变变量里面某个属性，导致视图更新，
     需要提前具体的声明这个属性。 （错误总结，暂且不删）
```bash
   $.each(subPanelLIst, function (i, value) { //确保申明变量，才能实现双向绑定
          value.diseaseData = []
   });
```