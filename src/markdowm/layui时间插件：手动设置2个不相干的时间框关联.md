---
title: layui时间插件：手动设置2个不相干的时间框关联
date: 2018-05-31 20:54:44
tags: web
categories: web
---
例子里面 each只是批量初始化日期
<!--More-->
```bash
/**
 * 时间插件
 */
var beginfaultDate = new Date()
beginfaultDate.setHours(0)
beginfaultDate.setMinutes(0)
beginfaultDate.setSeconds(0)
var endfaultDate = new Date()
endfaultDate.setHours(23)
endfaultDate.setMinutes(59)
endfaultDate.setSeconds(59)

var gettetimeString = function (date) {
  date = date || new Date()
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' +
      date.getSeconds()
}
var setdateLimit = function (limit, date) {
  limit.year = date.year
  limit.month = date.month - 1
  limit.date = date.date
  limit.hours = date.hours
  limit.minutes = date.minutes
  limit.seconds = date.seconds
}

//初始化
function initTime(beginClass, endClass) {
  let enddate, begindate
  lay(beginClass).each(function () {
    const $that = $(this)
    if ($that.closest('.layui-elem-field').css('display') != 'none') {
      begindate = laydate.render({
        elem: this,
        type: 'datetime',
        theme: '#4499e4',
        btns: ['confirm'],
        value: '',
        max: gettetimeString(endfaultDate),
        done: function (value, date) {
          setdateLimit(enddate.config.min, date)  //开始日期变化的时候，设置结束日期不能小于开始日期
        },
        ready: function () {
          const $date = $("#layui-laydate" + $that.attr("lay-key"))
          $date.css({left: 0, top: '32px'})
          $that.parent().append($date)
        }
      });
    }
  });

  lay(endClass).each(function () {
    const $that = $(this)
    if ($that.closest('.layui-elem-field').css('display') != 'none') {
      enddate = laydate.render({
        elem: this,
        type: 'datetime',
        theme: '#4499e4',
        btns: ['now', 'confirm'],
        value: '',
        max: gettetimeString(endfaultDate),
        done: function (value, date) {
          setdateLimit(begindate.config.max, date) //结束日期变化的时候，设置开始日期不能大于结束日期
        },
        ready: function () {
          const $date = $("#layui-laydate" + $that.attr("lay-key"))
          $date.css({left: 0, top: '32px'})
          $that.parent().append($date)
        }
      });
    }
  });
}
```