import {
  DAY
} from '../common/const.js';

let nextWorkId = 10008;

// 作业信息
let works = [{
  workId: '10001',
  workName: '实验报告三',
  deadline: Date.now() + DAY,
  submitNumber: 23,
  courseId: 1,
}, {
  workId: '10002',
  workName: '实验报告二',
  deadline: Date.now() + 2 * DAY,
  submitNumber: 17,
  courseId: 2,
}, {
  workId: '10003',
  workName: '实验报告五',
  deadline: Date.now() - DAY,
  submitNumber: 29,
  courseId: 3,
}, {
  workId: '10004',
  workName: '实验报告八',
  deadline: Date.now() + DAY,
  submitNumber: 21,
  courseId: 4,
}, {
  workId: '10005',
  workName: '实验报告四',
  deadline: Date.now() + 2 * DAY,
  submitNumber: 5,
  courseId: 1,
}, {
  workId: '10006',
  workName: '实验报告五',
  deadline: Date.now(),
  submitNumber: 30,
  courseId: 5,
}, {
  workId: '10007',
  workName: '实验报告五',
  deadline: Date.now() + 3 * DAY,
  submitNumber: 1,
  courseId: 1,
}];

// 添加作业
function addWork(work) {
  works.push({
    ...work,
    submitNumber: 0,
    workId: `${nextWorkId}`
  });
  nextWorkId++;
  return true;
}

// 获取作业信息
function getWork(workId) {
  for (work of works) {
    if (work.workId == workId) {
      return {
        ...work
      };
    }
  }
  return null;
}

// 修改作业信息
function updateWork(work) {
  for (w of works) {
    if (w.workId == work.workId) {
      w.workName = work.workName;
      w.deadline = work.deadline;
      w.submitNumber = work.submitNumber;
    }
  }
}

// 删除作业
function removeWork(workId) {
  for (work of works) {
    if (work.workId == workId) {
      let newArr = works.filter(w => w.workId != workId);
      works = newArr;
      return true;
    }
  }
  return false;
}
