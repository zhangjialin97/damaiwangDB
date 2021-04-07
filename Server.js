// 使用express框架搭建一个本地服务器
// express是nodejs中非常强大的web框架 可以创建应用以及使用http工具
var express = require('express');
var app = express();

//搭建服务
//路由
app.get('/abc', function (req, res) {
    //已经注册完毕的信息 
    var item = [{
            'name': '张三',
            'userName': 'zhangsan',
            'pwd': 888
        },
        {
            'name': '李四',
            'userName': 'lisi',
            'pwd': 666
        },
        {
            'name': '王五',
            'userName': 'wangwu',
            'pwd': 777
        },
    ]
    var arr = {
        'mingzi': req.query.userName,
        'mima': req.query.pwd
    }

    function ss() {
        for (i = 0; i < item.length; i++) {
            if (item[i].name == arr.mingzi) {
                if (item[i].pwd == arr.mima) {
                    res.send("登录成功");
                    return;
                } else {
                    res.send("账号或密码不正确");
                    return;
                }
            }
        }
        res.send("此账号未注册，请注册后使用");
    }
    ss();


})

app.get('/def', function (req, res) {
    res.send('我是def');
})

app.get('/qwe', function (req, res) {
    res.send('我是qwe');
})

app.listen(8080);
console.log("服务已启动");