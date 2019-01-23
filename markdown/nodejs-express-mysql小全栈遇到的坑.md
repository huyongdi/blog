web-hydtype
项目地址：https://github.com/huyongdi/nodeApp
### 1.MySQL8.0
8.0版本 安装之后不管用代码还是Navicat Premium都连接不上数据库
报错：Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
解决办法：安装的时候修改密码强度：默认的为强密码模式，手动选择下面一个宽松模式
<!--More-->

### 2.原生js发送post请求
```bash
//先open 才能设置头
xhr.open('post', 'submit');
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
```

### 3.node获取传过来的值
参考地址：http://www.expressjs.com.cn/4x/api.html#req.body
运行的时候可能会报错：app.use() requires a middleware function(版本的原因 npm install multer@0.1.8)
```bash
const bodyParser = require('body-parser');
const multer = require('multer');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
```

### 4.操作sql语句
如果拼接出整个sql会出现问题：字符串变的没有冒号，而且还要判断没有值的时候设置为null
可以用占位符？,再多传一个数组作为参数值
```bash
router.post('/', function (req, res, next) {
  const sql = "INSERT INTO `nodedb`.`qs` (`js`, `age`, `name`, `sentence`, `relax`, `tel`) VALUES (?,?,?,?,?,?)";
  const sqlQ = "select * from qs order by id desc limit 1";
  const sqlData = [req.body.js, req.body.age, req.body.name, req.body.name, req.body.sentence, req.body.relax, req.body.tel];
  connection.query(sql, sqlData, function (err, rows, fields) {
    if (err) {
      return res.status(500).send(err)
    } else {
      connection.query(sqlQ, function (err, rows, fields) {
        if (err) {
          return res.status(500).send(err)
        } else {
          res.send(rows)
        }
      });
    }
  });
});
```