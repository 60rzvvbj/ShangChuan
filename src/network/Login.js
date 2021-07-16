import {
  request
} from './request.js';
import {
  jsonp
} from './jsonp.js';

/**
 * 获取背景图片url
 */
export function getBackground() {
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
