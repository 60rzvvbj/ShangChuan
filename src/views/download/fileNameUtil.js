// 变量名和格式名映射关系
let named = [{
  attribute: 'name',
  name: '姓名',
}, {
  attribute: 'stuId',
  name: '学号',
}];

/**
 * 
 * 函数功能：获取文件名
 * 
 * @param {Object} user 用户对象{stuId, name}
 * @param {String} nameFormat 文件名格式
 * @returns 文件名
 */
function getFileName(user, nameFormat) {
  let res = nameFormat;
  let createVariable = ''; // 创建变量的语句

  // 拼接创建变量的语句
  for (let namedItem of named) {
    createVariable += 'let ' + namedItem.name + ' = \'' + user[namedItem.attribute] + '\';\n';
  }

  try {
    // 生成结果
    eval(createVariable + 'res = `' + res + '`;');
  } catch (e) {
    throw new Error('文件名格式不规范');
  }

  // 上述方法存在用户使用的变量名不是规定的变量名时会出现 变量名 is not defind 异常的bug(待修改)
  // 不过运气不是太差的话以上代码时没有问题的

  return res;
}

// 导出
export default {
  getFileName,
}
