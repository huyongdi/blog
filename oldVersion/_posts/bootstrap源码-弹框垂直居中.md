---
title: bootstrap源码-弹框垂直居中
date: 2017-08-31 16:54:54
tags:
categories: web
---

由于项目需要，bootstrap弹框要垂直居中，网上大部分都是修改js的，css改的不全，记录一下，只修改css达到效果

```bash
将0改为-50%，相对自身偏移一半
.modal.in .modal-dialog{-webkit-transform:translate(0,-50%);-ms-transform:translate(0,-50%);-o-transform:translate(0,-50%);transform:translate(0,-50%)}
relative改为absolute
.modal-dialog{position:absolute;width:auto;margin:10px auto;left:0;right:0;top:50%}
定宽居中
@media (min-width:768px){.modal-dialog{width:600px;margin:30px auto}

保证动画相同
.modal.fade .modal-dialog {-webkit-transition: -webkit-transform .3s ease-out;-o-transition: -o-transform .3s ease-out;transition: transform .3s ease-out;-webkit-transform: translate(0, -75%);-ms-transform: translate(0, -75%);-o-transform: translate(0, -75%);transform: translate(0, -75%)}
.modal.in .modal-dialog {-webkit-transform: translate(0, -50%);-ms-transform: translate(0, -50%);-o-transform: translate(0, -50%);transform: translate(0, -50%)}
```