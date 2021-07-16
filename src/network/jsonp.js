/**
 * 
 * 函数功能：jsonp
 * 
 * @param {object} options 请求的配置对象
 * 
 * 注意事项：
 * 
 * 传入的对象应满足此格式↓
 * ```js
 * {
 *      url: '', // 请求地址(必填)
 *      data: {}, // 参数(对象形式)
 *      success: function() {} , // 成功函数(必填)
 * }
 * ```
 * @author 60rzvvbj
 */
export function jsonp(options) {

  // 创建script标签
  var script = document.createElement('script');

  // 参数字符串
  var params = '';

  // 拼接参数
  for (var attr in options.data) {
    params += '&' + attr + '=' + options.data[attr];
  }

  // 创建随机函数名
  var fnName = 'myJsonp' + Math.random().toString().replace('.', '');

  // 将此函数变为全局函数
  window[fnName] = options.success;

  // 设置script标签的src属性
  script.src = options.url + '?callback=' + fnName + params;

  // 将script标签添加到的页面中
  document.body.appendChild(script);

  // 返回之后将script标签从页面中删除
  script.onload = function () {
    document.body.removeChild(script);
  }
}
