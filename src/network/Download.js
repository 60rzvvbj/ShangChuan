import {
  request
} from "./request.js";

// 获取作业信息
export function getWorkMessage(data) {
  return request({
    method: 'POST',
    url: '/server/homework/selectHomeworkByHomeworkId',
    headers: {
      token: data.token
    },
    params: {
      homeworkId: data.hwID
    }
  })
}
//获取作业列表
export function getWorkList(data) {
  return request({
    method: 'POST',
    url: '/server/homework/selectDownloadStuHomeworkByHomeworkId',
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
      token: data.token
    },
    params: {
      homeworkId: data.homeworkId
    }
  })
}

//修改作业
export function updateWork(data) {
  return request({
    method: 'POST',
    url: '/server/homework/updateHomework',
    headers: {
      token: data.token
    },
    data: {
      homework: {
        homeworkDeadtime: data.ddl,
        homeworkId: data.workId,
        homeworkName: data.workName,
        homeworkNamed: data.workFormat,
        subjectId: data.courseId
      },
      named: data.named
    }
  })
}
// 下载一个作业
export function downloadOne(data) {
  return request({
    method: 'GET',
    url: '/server/file/downloadOne',
    headers: {
      token: data.token
    },
    params: {
      stuHomeworkId: data.stuHomeworkId
    }
  })
}
// 打包下载
export function downloadZip(req) {
  return request({
    method: 'POST',
    url: '/server/file/downloadZip',
    responseType: 'blob',
    headers: {
      token: req.token,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(
      req.stuHomeworkId
    )
  })
}
