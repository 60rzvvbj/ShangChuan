/**
 * 
 * @param {*} obj 元素
 * @param {*} name 要获取的样式名
 * @author tracy
 */
function getStyle(obj, name) {
  if (window.getComputedStyle) {
    //正常浏览器的方式，有此方法
    return getComputedStyle(obj, null)[name];
  } else {
    //IE8方法
    return obj.currentStyle[name];
  }
  // return window.getComputedStyle?getComputedStyle(obj,null)[name]:obj.currentStyle[name];
}

/**
 * 
 * 函数功能：将数据复制到剪切板
 * 
 * @param {string} text 要复制到剪切板的内容
 * @author 60rzvvbj
 */
function setShearPlateData(text) {
  var input = document.createElement('input');
  document.body.appendChild(input);
  input.setAttribute('value', text);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
}

/**
 * 
 * 函数功能：通过样式名获取元素行内style中样式
 * 
 * @param {Node} dom dom对象
 * @param {string} key 属性名
 * @author 60rzvvbj
 */
function getCSS(dom, key) {
  var t = dom.style.cssText.match(new RegExp("(^|\\s)" + key + ": ([^;]+)(;|$)"));
  return t != null ? t[2] : null;
}

Node.prototype.getCSS = function (key) {
  return getCSS(this, key);
}

/**
 * 
 * 函数功能：设置cookie
 * 
 * @param {JSON} json 参数列表
 * @param {number} time 有效时间
 * @author 60rzvvbj
 */
function setCookie(json, time) {
  var date = new Date(Date.now() + time * 86400000).toUTCString();
  for (var key in json) {
    document.cookie = key + "=" + json[key] + "; expires=" + date;
  }
}

/**
 * 
 * 函数功能：获取cookie
 * 
 * @param {string} attr 字段名
 * @author 60rzvvbj
 */
function getCookie(attr) {
  var t = document.cookie.match(new RegExp("(^|\\s)" + attr + "=([^;]+)(;|$)"));
  return t != null ? t[2] : null;
}

/**
 * 
 * 函数功能：获取cookie
 * 
 * @param {string} attr 字段名
 * @author 60rzvvbj
 */
function removeCookie(attr) {
  var json = {};
  json[attr] = "";
  setCookie(json, -1);
}

Node.prototype.show = function () {
  this.style.display = 'block';
}
Node.prototype.hide = function () {
  this.style.display = 'none';
}

/**
 * 
 * 函数功能：生成一个以左右端点为界的随机小数
 * 
 * @param {number} l 左端点
 * @param {number} r 右端点
 * @returns {number} 返回生成的随机数
 * @author 60rzvvbj
 */
function getDoubleRandom(l, r) {
  return l + Math.random() * (r - l + 1);
}

/**
 * 
 * 函数功能：生成一个以左右端点为界的随机整数
 * 
 * @param {number} l 左端点
 * @param {number} r 右端点
 * @returns {number} 返回生成的随机数
 * @author 60rzvvbj
 */
function getIntRandom(l, r) {
  return parseInt(getDoubleRandom(l, r));
}

/**
 * 
 * 函数功能：获取(l,r)范围内随机颜色
 * 
 * @param {number} l 左端点
 * @param {number} r 右端点
 * @returns 返回一个rgb字符串
 * @author 60rzvvbj
 */
function randomColor(l, r) {
  return 'rgb(' + getIntRandom(l, r) + ',' + getIntRandom(l, r) + ',' + getIntRandom(l, r) + ')';
}

/**
 * 
 * 函数功能：根据概率生成对应的字符串
 * 
 * @param {Array({rank, data})} messages 字符串们
 * @author 60rzvvbj
 */
function randomData(messages) {
  let sum = 0;
  for (let i = 0; i < messages.length; i++) {
    sum += messages[i].rank;
  }
  let randNum = getDoubleRandom(0, sum);
  for (let i = 0; i < messages.length - 1; i++) {
    if (randNum <= messages[i].rank) {
      return messages[i].data;
    } else {
      randNum -= messages[i].rank;
    }
  }
  return messages[messages.length - 1].data;
}

/**
 * 
 * 函数功能：转换时间格式
 * 
 * @param date 时间串
 * @author 60rzvvbj
 */
function getDateString(date) {
  date = parseInt(date);
  let res = '';
  let dateObj = new Date(date);
  res += dateObj.getMonth() + 1;
  res += '/';
  res += dateObj.getDate();
  res += ' ';
  let h = dateObj.getHours();
  res += h < 10 ? '0' + h : h;
  res += ':';
  let m = dateObj.getMinutes();
  res += m < 10 ? '0' + m : m;
  return res;
}

/**
 * 
 * 函数功能：获取随机字符串
 * 
 * @param {string} str 字符串字符范围
 * @param {number} len 要生成的字符串的长度
 * @author 60rzvvbj
 */
function randomString(str, len) {
  let res = '';
  for (let i = 0; i < len; i++) {
    res += str[getIntRandom(0, str.length)];
  }
  return res;
}

export default {
  getCookie,
  setCookie,
  removeCookie,
  getDoubleRandom,
  getIntRandom,
  randomColor,
  randomData,
  getDateString,
  randomString,
};
