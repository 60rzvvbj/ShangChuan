// 用户信息
let users = [{
  account: '191543105',
  password: '123456',
  username: '赖芷欣'
}, {
  account: '191543132',
  password: '123',
  username: '杨超旭'
}, {
  account: '191543110',
  password: '123',
  username: '蔡导'
}, {
  account: '191543109',
  password: '123',
  username: '郑淑萍'
}, {
  account: '191543118',
  password: '123',
  username: '赖冠华'
}, {
  account: '191543108',
  password: '123',
  username: '杨倩'
}];

// 通过账号获取用户信息
function getUser(account) {
  for (user of users) {
    if (user.account == account) {
      return {
        ...user
      };
    }
  }
  return null;
}

// 修改用户信息
function updateUser(user) {
  for (u of users) {
    if (user.account == u.account) {
      u.password = user.password;
      u.username = user.username;
      return true;
    }
  }
  return false;
}

export default {
  getUser,
  updateUser
};
