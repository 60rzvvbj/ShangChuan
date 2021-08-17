import {
  request
} from './request.js';
import {
  jsonp
} from './jsonp.js';

/**
 * 测试获取背景图片url
 */
export function getBackgroundTest() {
  return new Promise(function (resolve, reject) {
    jsonp({
      url: 'http://bing.ioliu.cn/v1/rand',
      data: {
        type: 'json'
      },
      success: function (res) {
        resolve(res.data.url);
      },
      error: function (err) {
        reject(err);
      }
    });
  });
}
/**
 * 获取背景图片url
 */
export function getBackground() {
  return request({
    method: 'GET',
    url: '/server/file/bingImg'
  });
}
/**
 * 登录测试
 */
export function loginTest(mes) {
  return request({
    method: 'POST',
    url: '/server/oauth/login',
    params: {
      username: mes.stuNumber,
      password: mes.password
    }
  });
}
