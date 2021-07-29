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
import workService from './service/workService.js';

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
  let flag = false;
  let message = '';
  if (headers.authorize_token == 'token') {
    if (!userService.login(text.account, text.oldPd)) {
      message = '账号异常';
    } else if (text.oldPd == '123456' && text.newPd != '123456') {
      if (userService.changePd(text.account, text.oldPd, text.newPd)) {
        flag = true;
        message = '修改成功';
      } else {
        message = '修改失败';
      }
    } else {
      message = '新密码不可以和旧密码相同';
    }
  } else {
    message = '登录状态异常';
  }
  res.send({
    flag,
    message
  });
});

// 获取某个学生的全部作业
app.get('/getStudentAllwork', function (req, res) {
  let text = req.query;
  let headers = req.headers;
  if (headers.authorize_token == 'token') {
    let account = text.account;
    res.send({
      workList: workService.getWorkListByAccount(account),
      message: '获取成功',
    });
  } else {
    res.send({
      workList: null,
      message: '登录状态异常',
    });
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
