web-hydtype
记录几个细节问题

#### 1.在vue实例里面获得input的值
HTML:
```bash
<div class="searchBorder" id="search_gene">
     <input type="text" class="form-control" @keyup.enter="onEnter" ref="searchInput"> <!--ref值-->
     <button class="search-btn myBtn" @click="onEnter"></button>
</div>
```
<!--MORE-->
JS:
```bash
new Vue({
   el: '#search_gene',
   data: {
            searchInput: null
         },
   methods: {
            onEnter: function () {
                var value =this.$refs.searchInput.value; //取得实例对应ref的值
            }
        }
    });
```
#### 2。html模板里面遍历数组时，利用上index
```bash
:id="'abc'+index" //动态绑定ID
```
#### 3.不要修改后台原值，应该尽量使用过滤器filters
HTML:
```bash
<!-- in mustaches -->
{{ message | capitalize }}
<!-- in v-bind -->
<div v-bind:id="rawId | formatId"></div>
```
JS:
```bash
new Vue({
  // ...
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})
```
