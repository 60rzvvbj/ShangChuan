// 导包，初始化
let request = require('request');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let fs = require('fs');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());
let url = __dirname + '\\webapp';

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

// 监听端口
app.listen(1523);
console.log('服务器已启动 端口号1523');
