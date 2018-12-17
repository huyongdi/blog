---
title: hexo+coding+域名
date: 2016-10-28 15:53:16
tags:
---

由于国内站点访问github太慢，记录一下设置blog到coding

hexo命令以及依赖软件/设置就不写了（上一篇已经提到过）

### 1.修改blog工程文件
根目录下的_config.yml文件：
&nbsp;&nbsp;&nbsp;&nbsp;修改deploy下的resp路径即可

``` bash
deploy:
  type: git
  repository:
      #github: git@github.com:huyongdi/huyongdi.github.io.git
      coding: git@git.coding.net:hyd_dev/hyd_dev.git
  branch: master
```
<!--More-->
### 2.coding网站的设置

登录https://coding.net/  &nbsp;&nbsp;右侧悬浮头像---个人设置---SSH 公钥---添加自己的git公钥
左侧导航---代码---pages服务---添加分支master---添加域名绑定即可。



