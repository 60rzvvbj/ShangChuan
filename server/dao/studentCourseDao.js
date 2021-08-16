// 学生课程表
export let studentCourses = [{
  account: '191543105',
  courseId: [1, 2, 3, 4, 5]
}, {
  account: '191543132',
  courseId: [1, 2, 3, 4, 5]
}];

// 获取某个学生的所有课程
function getStudentCourse(account) {
  for (let student of studentCourses) {
    if (student.account == account) {
      return student.courseId;
    }
  }
  return null;
}

// 获取某个课程的所有学生
function getCourseStudent() {

}

export default {
  getStudentCourse,
  getCourseStudent
};
