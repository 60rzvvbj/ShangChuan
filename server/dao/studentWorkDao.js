// 学生作业表
export let studentWorks = [{
  account: '191543105',
  works: [{
    workId: '10001',
    submitted: false
  }, {
    workId: '10002',
    submitted: false
  }, {
    workId: '10003',
    submitted: false
  }, {
    workId: '10004',
    submitted: true
  }, {
    workId: '10005',
    submitted: false
  }, {
    workId: '10006',
    submitted: true
  }, {
    workId: '10007',
    submitted: false
  }]
}, {
  account: '191543132',
  works: [{
    workId: '10001',
    submitted: true
  }, {
    workId: '10002',
    submitted: false
  }, {
    workId: '10003',
    submitted: true
  }, {
    workId: '10004',
    submitted: true
  }, {
    workId: '10005',
    submitted: true
  }, {
    workId: '10006',
    submitted: true
  }, {
    workId: '10007',
    submitted: false
  }]
}];

// 添加学生作业
function addStudentWork(studentWork) {
  for (let student of studentWorks) {
    if (student.account == studentWork.account) {
      student.works.push({
        workId: studentWork.workId,
        submitted: studentWork.submitted
      });
      return true;
    }
  }
  studentWorks.push({
    account: studentWork.account,
    works: [{
      workId: studentWork.workId,
      submitted: studentWork.submitted
    }]
  });
  return true;
}

// 获取某个学生的所有作业
function getStudentWork(account) {
  for (let student of studentWorks) {
    if (student.account == account) {
      return student.works;
    }
  }
  return null;
}

export default {
  addStudentWork,
  getStudentWork,
};
