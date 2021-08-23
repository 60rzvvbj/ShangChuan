import {
  request
} from "./request.js";

// 获取学生列表
export function getCourseStudents(data) {
  return request({
    method: 'POST',
    url: '/server/subject/selectStuBySubjectId',
    headers: {
      token: data.token
    },
    params: {
      subjectId: data.courseId
    }
  });
}

// 查找用户
export function searchUser(data) {
  return request({
    method: 'GET',
    url: '/server/user/findUserInfoByStuId',
    headers: {
      token: data.token
    },
    params: {
      stuId: data.sno
    }
  });
}

// 添加成员
export function addMember(data) {
  return request({
    method: 'POST',
    url: '/server/subject/addStuToSubject',
    headers: {
      token: data.token
    },
    data: {
      subjectId: data.courseId,
      userId: [data.userId],
    }
  });
}

// 删除成员
export function removeMember(data) {
  return request({
    method: 'POST',
    url: '/server/subject/deleteStuBySubjectIdAndUserId',
    headers: {
      token: data.token
    },
    params: {
      subjectId: data.courseId,
      userId: data.userId,
    }
  });
}
