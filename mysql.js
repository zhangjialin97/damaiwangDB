// 使用nodejs + express连接mysql数据库

var express = require('express');
var app = express();

// 引入mysql功能模块
var mysql = require('mysql');

// 创建一个数据库连接
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'damaiwang'
});

// 开启连接
connection.connect();

// 这里就是主要要修改的地方，其实也就一行
// 把 address 改成你自己定的地址，就是连接访问的那个地址
// 登录接口
app.get('/api/login', function (err, res) {
    res.setHeader("access-control-allow-origin", "*");
    const sql = 'SELECT * FROM userinfo'; // 写你需要的sql代码，
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        // result内放的就是返回的数据，res是api传数据
        // 返回的数据需要转换成JSON格式
        res.json(result);
        // console.log(res.json(result));
    });
})

// 注册接口
app.get('/api/register', function (req, res) {
    res.setHeader("access-control-allow-origin", "*");
    console.log('----' + req.query.name);
    console.log('----' + req.query.pass);
    var name = req.query.name
    var pwd = req.query.pass
    var user = [name, pwd];
    const sql = 'insert into userinfo(userid,password) values(?,?)'; // 写你需要的sql代码
    connection.query(sql, user, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        res.json(result);
    });
})
var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("地址为 http://%s:%s", host, port);
})
