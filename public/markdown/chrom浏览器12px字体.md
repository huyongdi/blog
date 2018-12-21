web-hydtype
### 1.chrome限制12px以下的 依旧12px
``` bash
-webkit-text-size-adjust:none; //以前版本chrome适用，现在只有手机端可以用了
```
最新版本chrome要用新的办法了：
```bash
font-size: 12px;
transform: scale(0.8); /*2D缩放*/
display: inline-block;
```

### 2.题外话1--git报错修改
```bash
fatal: unable to access 'https://git.oschina.net/GrandOmics/GrandBox-Analyze-HTML.git/': error setting certificate verify locations:
  CAfile: C:/SSD/office/git/mingw64/libexec/ssl/certs/ca-bundle.crt
  CApath: none

git config --system http.sslverify false //此句即可
```

### 3.题外话2--hexo找不到git
```bash
ERROR Deployer not found: Git

npm install --save hexo-deployer-git //此句即可
```