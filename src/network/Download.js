import {
  request
} from "./request.js";


//获取作业列表
export function getWorkList(data) {
  return request({
    method: 'POST',
    url: '/server/homework/selectStuHomeworkByHomeworkId',
    headers: {
      token: data.token
    },
    params: {
      homeworkId: data.hwID
    }
  })
}

//删除作业
export function deleteWork(data) {
  return request({
    method: 'POST',
    url: '/server/homework/deleteHomework',
    headers: {
      token: data
    }
  })
}
