import courseDao from "../dao/courseDao.js";
import studentCourseDao from "../dao/studentCourseDao.js";
import userService from "./userService.js";

// 获取课程信息
function getCourseInfo(courseId) {
  return courseDao.getCourse(courseId);
}

// 获取某个学生的全部课程
function getStudentCourse(account) {
  let courseIdArr = studentCourseDao.getStudentCourse(account);
  if (courseIdArr == null) {
    return null;
  } else {
    let res = [];
    for (let coursrId of courseIdArr) {
      let course = courseDao.getCourse(coursrId);
      course.managerName = userService.getUserInfo(course.manager).username;
      delete course.manager;
      res.push(course);
    }
    return res;
  }
}

export default {
  getCourseInfo,
  getStudentCourse
};
