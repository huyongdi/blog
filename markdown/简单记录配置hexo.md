web-hydtype
记录一下搭建一个简单的hexo博客的路程

### 1.准备条件
依赖配置：
&nbsp;&nbsp;&nbsp;git ：http://rogerdudler.github.io/git-guide/index.zh.html
&nbsp;&nbsp;&nbsp;nodeJs ：https://nodejs.org/en/

<!--More-->

### 2.安装hexo
注: 由于国内访问外网的问题，导致npm命令异常缓慢，可以利用镜像解决缓慢的问题，也就是cnpm
&nbsp; &nbsp; &nbsp;这里提供一个自己用到的镜像，一直用着还不错。参考网址：https://npm.taobao.org/

准备完成之后安装hexo
``` bash
$ cnpm install -g hexo-cli
```
进入自己想要安装到的目录，进行建站（建站包括：创建目录+建立依赖文件）
``` bash
$ hexo init <folder>
$ cd <folder>
$ cnpm install
```

### 3.替换主题
这里我用到的主题是yilia
如果需要更换，可以参考知乎大神的答案：https://www.zhihu.com/question/24422335

前提：依旧处于步骤2所在的目录
``` bash
$ git clone https://github.com/litten/hexo-theme-yilia.git themes/yilia
```
这时候你的themes目录下面多了一个yilia文件夹


之后修改根目录下的_config.yml文件：
``` bash
theme: yilia（冒号后面有一个空格）
```

### 4.本地测试
``` bash
$ cnpm install hexo-server --save
$ hexo clean
$ hexo s --debug
```
没有报错的情况下会出现：INFO  Hexo is running at http://localhost:4000/. Press Ctrl+C to stop.
不要按 Ctrl+C 点击上行的端口 就能看到自己的主题。
报错请参考官网:https://hexo.io/zh-cn/docs/index.html （个人感觉将错误信息贴到网上能更快定位问题）

### 5.连接到github
这里就省略github建站的工程了，网上教程很多。
如果要更进一步绑定自己的域名 github的根目录下新建CNAME文件，内容直接为域名即可。
修改根目录下_config.yml的配置
``` bash
deploy: #部署部分的设置
   type: git
   repo: https://github.com/huyongdi/huyongdi.github.io.git
   branch: master
```
将hexo提交到服务器
g--generate
d--deploy
``` bash
$ hexo clean
$ hexo g
$ hexo d
```
如果出现错误
``` bash
ERROR Deployer not found: git
```
执行命令
``` bash
cnpm install hexo-deployer-git --save
```

More info:
&nbsp;&nbsp;由于目前还没有找到hexo关于网址标签栏左侧图标的配置项(也不知道存不存在)，由于美观,每次提交完之后，自己会在github根目录的index.html添加：

``` bash
  <link rel="shortcut icon" href="http://ofqtnubd0.bkt.clouddn.com/fire.png" type="image/x-icon">
```
