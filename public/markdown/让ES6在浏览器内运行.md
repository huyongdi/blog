web-hydtype
用ES6编写程序，浏览器不一定支持，这个时候就需要将ES6转化为ES5

### 浏览器环境
以文件都放在同一目录为例：
#### 1.Traceur转码器
```bash
main.html
<script src="http://google.github.io/traceur-compiler/bin/traceur.js"></script><!-- 加载Traceur编译器 -->
<script src="https://google.github.io/traceur-compiler/bin/BrowserSystem.js"></script><!-- 加载Traceur编译器 -->
<script src="http://google.github.io/traceur-compiler/src/bootstrap.js"></script><!-- 将Traceur编译器用于网页 -->
<script type="module" src="main.js"></script>  <!--module类型的引入才会被编码器识别为ES6文件-->
  
main.js
import { square, diag } from 'profile.js'; //注意文件路径
```
<!--More-->
#### 2.webpack+babel
###### 1.编辑webpack.config.js文件
```bash
var path = require('path');
module.exports = {
  entry: "./main.js", //入口文件 注意文件路径
  output: { //输出文件
    path: __dirname,
    filename: "bundle.js" //webpack 运行完之后将生成一个 bundle.js 文件
  },
  module: {
    loaders: [ //所有加载器(参考:http://webpack.github.io/docs/list-of-loaders.html)
      {
        test: path.join(__dirname, 'es6'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
```
###### 2.安装依赖
```bash
cnpm install babel-loader --save-dev  //安装 babel-loader
npm install babel-preset-es2015 --save-dev  //安装转码规则
```
###### 3.编辑文件
```bash
test.html
<script src="bundle.js"></script>  //只需要引入bundle.js
  
main.js
import { square, diag } from './profile';
```
###### 4.运行webpack
```bash
webpack //可以加一些参数，比如查看进度条、区分颜色、监听 webpack --progress --colors --watch
```
### node.Js环境
未完待续...