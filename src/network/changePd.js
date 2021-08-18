import {
  request
} from './request.js';

/**
 * 修改密码
 */
export function changePassWord(mes) {
  return request({
    method: 'POST',
    url: '/server/user/changePassword',
    headers: {
      token: mes.token
    },
    params: {
      oldPassword: mes.oldPd,
      password: mes.newPd
    }
  });
}
