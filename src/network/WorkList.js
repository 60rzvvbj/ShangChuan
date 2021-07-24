import {
  request
} from './request.js';

export function getWorkList(data) {
  if (data.type == 'student') {
    // 获取某学生的所有作业
    return request({
      method: 'GET',
      url: '/getStudentAllwork',
      headers: {
        AUTHORIZE_TOKEN: data.token
      },
      params: {
        account: data.account
      }
    });
  } else if (data.type == 'course') {
    // 待开发
  } else {
    throw new Error('getWorkList参数错误');
  }
}
