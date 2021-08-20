import {
  request
} from './request.js';

// 获取用户信息
export async function getUserInfo(data) {
  let res = await request({
    method: 'GET',
    url: '/server/user/findUserInfoByUsername',
    headers: {
      token: data.token
    },
    params: {
      username: data.account
    }
  });
  return res.data.data;
}
