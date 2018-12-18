---
title: vue实现简单的分页功能
date: 2017-03-08 14:56:38
tags:
categories: web
---

在vue的基础上实现简单的分页逻辑，记录一下.

html文件:
```bash
<div id="app" class="text-center" v-show="!!allPage">
     <nav>
       <ul class="pagination">
           <!--上一页逻辑-->
           <li v-if='current == 1' class='disabled'><span class='color-a'>&laquo;上一页</span></li>
           <li v-else @click='current-- && goTo(current--)'><span class='color-a'>&laquo;上一页</span></li>
           <!--中间页码-->
           <li v-for="index in pages" @click="goTo(index)" :class="{'active':current == index}"><span class="color-a">{{index}}</span></li>
           <!--下一页逻辑-->
           <li v-if="allPage == current || allPage == 0" class="disabled"><span class="color-a">下一页&raquo;</span></li>
           <li @click="current++ && goTo(current++)" :class="{'disabled':allPage == current || allPage == 0}"><span class="color-a">下一页&raquo;</span></li>
           <!--跳转逻辑-->
           <li class=""><span class="color-a toPage">第<input v-model="current" @keyup.enter="goTo(current)">页/共{{allPage}}页</span></li>
       </ul>
     </nav>
</div>
```
<!--More-->
js文件： 
计算属性和goTo函数第一行必须，其余的可以根据实际情况调整
```bash
   var vuePage = new Vue({
        el: '#app',
        data: {
            current: 1,
            showItem: 10, /*翻页按钮中间页数显示10个*/
            allPage: Math.ceil(COUNT / 20), /*每页显示20条数据*/
            url: ''
        },
        computed: {
            pages: function () { //计算属性  计算出中间应该是哪些值，比如1-10 3-12
                var pag = [],
                    i = null;
                if (this.current < this.showItem) {
                    i = Math.min(this.showItem, this.allPage);
                    while (i) {
                        pag.unshift(i--); //把一个元素添加到数组的开头
                    }
                } else {
                    var middle = this.current - this.showItem / 2;//从哪里开始
                    i = this.showItem;
                    if (middle > (this.allPage - this.showItem)) {
                        middle = (this.allPage - this.showItem) + 1
                    }
                    while (i--) {
                        pag.push(middle++);
                    }
                }
                return pag
            }
        },
        methods: {
            goTo: function (index) {
                this.current = index;
                //处理得到新的url，然后调用另一个vue模块
                var datafile = common.getStrParam(this.url, 'datafile')
                var questionMark = this.url.indexOf("?");
                var str = this.url.substring(0, questionMark);
                var url = str + "?datafile=" + datafile + '&page=' + index;
                vueTable.get(url);
            },
            resetData: function (obj) { 请求到数据之后调用reset方法，初始化分页
                this.allPage = Math.ceil(obj.count / 20);
                this.url = obj.nextUrl;
            }
        }
    });
```