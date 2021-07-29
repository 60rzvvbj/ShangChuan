import workDao from "../dao/workDao.js";
import studentWorkDao from "../dao/studentWorkDao.js";
import courseService from "./courseService.js";

// 通过学号获取作业列表
function getWorkListByAccount(account) {
  let res = [];
  let workList = studentWorkDao.getStudentWork(account);
  for (let work of workList) {
    let workData = workDao.getWork(work.workId);
    res.push({
      workId: workData.workId,
      workName: workData.workName,
      deadline: workData.deadline,
      submitNumber: workData.submitNumber,
      courseName: courseService.getCourseInfo(workData.courseId).courseName,
      submitted: work.submitted
    });
  }
  return res;
}

export default {
  getWorkListByAccount
};
