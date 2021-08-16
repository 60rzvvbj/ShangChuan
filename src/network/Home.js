import {
  request
} from "./request.js";

export function getStudentAllCourse(data) {
  return request({
    method: 'GET',
    url: '/getStudentAllCourse',
    headers: {
      AUTHORIZE_TOKEN: data.token
    },
    params: {
      account: data.account
    }
  });
}
