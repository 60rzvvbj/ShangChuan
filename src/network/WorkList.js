import {
  request
} from './request.js';

export function getWorkList(data) {
  if (data.type == 'student') {
    // 获取某学生的所有作业
    return request({
      method: 'POST',
      url: '/server/homework/selectStuHomework',
      headers: {
        token: data.token
      },
      params: {
        userId: data.id
      }
    });
  } else if (data.type == 'course') {
    return request({
      method: 'POST',
      url: '/server/homework/selectStuHomeworkBySubjectIdAndToken',
      headers: {
        token: data.token
      },
      params: {
        subjectId: data.id
      }
    });
  } else {
    throw new Error('getWorkList参数错误');
  }
}
