import courseDao from "../dao/courseDao.js";

// 获取课程信息
function getCourseInfo(courseId) {
  return courseDao.getCourse(courseId);
}

export default {
  getCourseInfo
};
