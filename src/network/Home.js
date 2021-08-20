import {
  request
} from "./request.js";

export function getStudentAllCourse(data) {
  return request({
    method: 'POST',
    url: '/server/subject/selectStuSubject',
    headers: {
      AUTHORIZE_TOKEN: data.token
    },
  });
}
