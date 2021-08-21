import {
  request
} from "./request.js";

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

export function searchUser(data) {

}
