import userDao from "../dao/userDao.js";

// 登录
function login(account, password) {
  let user = userDao.getUser(account);
  return user != null && user.password == password;
}

// 修改密码
function changePd(account, oldPd, newPd) {
  if (login(account, oldPd)) {
    userDao.updateUser({
      password: newPd
    });
    return true;
  } else {
    return false;
  }
}

// 获取用户信息
function getUserInfo(account) {
  let user = userDao.getUser(account);
  if (user) {
    return {
      account,
      username: user.username
    };
  } else {
    return null;
  }
}

export default {
  login,
  changePd,
  getUserInfo
};
