import {
  request
} from './request.js';

/**
 * 修改密码
 */
export function changePassWord(mes) {
  return request({
    method: 'POST',
    url: '/user/changePd',
    headers: {
      AUTHORIZE_TOKEN: mes.token
    },
    params: {
      account: mes.user,
      oldPd: mes.oldPd,
      newPd: mes.newPd
    }
  });
}
