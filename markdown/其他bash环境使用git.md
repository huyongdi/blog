other-hydtype
git自带的bash，不能合并窗口，xshell windows下面tab不能补全，改注册表也不行
为了工作的方便，用上了mobaxterm，记录一下bash下配置git

补充更新：可以在设置里面勾选用windows的PATH就好了。

下面的还是记录一下：
思路就是在C:\Users\hyd\Documents\MobaXterm\home下面加一个.bashrc文件。
文件内容是：export PATH=/drives/e/Git/cmd:$PATH

如果要用到ssh，新建或者将以前的.ssh目录复制到home目录下即可

下面是已经配好的情况，步骤相同
```bash
[2017-09-04 14:35.38]  /drives/e/workspace/GrandBox-Analyze-HTML
[hyd.DESKTOP-V1KHOAD] ➤ cd ~

[2017-09-04 14:35.54]  ~
[hyd.DESKTOP-V1KHOAD] ➤ echo $PATH
/bin:/drives/e/Git/cmd:/bin:/drives/c/Users/GRANDO~1/DOCUME~1/MobaXterm/slash/bin:/drives/c/WINDOWS:/drives/c/WINDOWS/system32

[2017-09-04 14:36.10]  ~
[hyd.DESKTOP-V1KHOAD] ➤ which git
/drives/e/Git/cmd/git

[2017-09-04 14:37.36]  ~
[hyd.DESKTOP-V1KHOAD] ➤ pwd
/home/mobaxterm

[2017-09-04 14:37.44]  ~
[hyd.DESKTOP-V1KHOAD] ➤ vi .bashrc

```

