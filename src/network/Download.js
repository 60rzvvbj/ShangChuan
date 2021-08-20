import {
  request
} from "./request.js";


//获取作业列表
export function getWorkList(data) {
  return request({
    method: 'POST',
    url: '/getStudentAllCourse',
    headers: {
      token: data.token
    },
    params: {
      homeworkId: data.hwID
    }
  })
}
