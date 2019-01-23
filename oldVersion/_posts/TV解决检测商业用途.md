---
title: TV解决检测商业用途
date: 2018-06-05 13:33:52
tags:
categories:
---

原理：修改mac地址，让检测以为是新用户

### 1.完全卸载TV
1.普通方式卸载完
2.win+r输入%appdata% 进入appdata文件夹内之后，删除TV文件夹
3.win+r输入regedit 进入注册表：删除HKEY_CURRENT_USER\SOFTWARE\TeamViewer 以及 HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\TeamViewer

### 2.修改网卡的MAC地址
设备管理器--适配器 可以修改，也可以百度mac修改工具 （提供一个工具地址，可能会报安全提示，亲测有效：<a href='http://oja96hlp0.bkt.clouddn.com/MAC.zip'>点击下载</a>）
注意：所有网卡都改的话，改成一个地址 (MAC地址不一致网速可能会变慢,有线网卡和无线网卡可以不一样).未测试只改当前使用网卡的地址(水友说可以)

### 3.修改完mac地址，重启电脑，安装TV就可以了
注意：本机和目标机器都要做这3个步骤