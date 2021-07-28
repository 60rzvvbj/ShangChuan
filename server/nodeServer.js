// 导包，初始化
import request from 'request';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import fs from 'fs';
let app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());

// 相关常量
const DAY = 86400000; // 一天的毫秒数
import userService from './service/userService.js';

// 设置允许跨域(已启用)
function setCrossDomain(res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type, AUTHENTICATE');
}

// 获取bing壁纸
app.get('/bingImg', function (req, res) {
  let text = req.query;
  request({
    url: text.url,
    method: 'get',
    encoding: null,
    headers: {
      'Accept-Encoding': 'gzip, deflate'
    }
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.set('Content-Type', 'image/png');
      res.send(body);
    } else {
      res.send({
        status_code: '500',
      });
    }
  });
});

// 测试登录
app.post('/user/login', function (req, res) {
  var text = req.query;
  if (userService.login(text.username, text.password)) {
    res.send({
      result: {
        flag: true,
        code: 200,
        message: '测试',
        data: 'T',
        authToken: "token"
      }
    });
  } else {
    res.send({
      result: {
        flag: true,
        code: 500,
        message: '账号或密码错误',
        data: 'T',
        authToken: "token"
      }
    });
  }
});

// 改密码
app.post('/user/changePd', function (req, res) {
  let text = req.body;
  let headers = req.headers;
  if (headers.authorize_token == 'token') {
    if (text.account != '191543105') {
      res.send({
        flag: false,
        message: '账号异常'
      });
    } else if (text.oldPd == '123456' && text.newPd != '123456') {
      res.send({
        flag: true,
        message: '修改成功'
      });
    } else {
      res.send({
        flag: false,
        message: '新密码不可以和旧密码相同'
      });
    }
  } else {
    res.send({
      flag: false,
      message: '登录状态异常'
    });
  }
});

// 获取某个学生的全部作业
app.get('/getStudentAllwork', function (req, res) {
  let text = req.query;
  let headers = req.headers;
  if (headers.authorize_token == 'token') {
    let account = text.account;
    if (account == '191543105') {
      res.send({
        workList: [{
            courseName: '计算机网络',
            workID: '10001',
            workName: '实验报告三',
            deadline: Date.now() + DAY,
            submitNumber: 23,
            submitted: false
          },
          {
            courseName: '计算机组成原理',
            workID: '10002',
            workName: '实验报告二',
            deadline: Date.now() + 2 * DAY,
            submitNumber: 17,
            submitted: false
          },
          {
            courseName: 'python程序设计',
            workID: '10003',
            workName: '实验报告五',
            deadline: Date.now() - DAY,
            submitNumber: 29,
            submitted: false
          },
          {
            courseName: 'JavaEE框架程序设计',
            workID: '10004',
            workName: '实验报告八',
            deadline: Date.now() + DAY,
            submitNumber: 21,
            submitted: true
          },
          {
            courseName: '计算机网络',
            workID: '10005',
            workName: '实验报告四',
            deadline: Date.now() + 2 * DAY,
            submitNumber: 5,
            submitted: false
          },
          {
            courseName: 'Oracle数据库',
            workID: '10006',
            workName: '实验报告一',
            deadline: Date.now(),
            submitNumber: 30,
            submitted: true
          },
          {
            courseName: '计算机网络',
            workID: '10007',
            workName: '实验报告五',
            deadline: Date.now() + 3 * DAY,
            submitNumber: 1,
            submitted: false
          },
        ]
      });
    } else {
      res.send({
        workList: [],
      });
    }
  } else {
    res.send({
      message: '请登录',
    })
  }
});

app.get('/test', function (req, res) {
  let a = req.headers;
  res.send({
    msg: 'yes',
  });
});

// 监听端口
app.listen(1523);
console.log('服务器已启动 端口号1523');
