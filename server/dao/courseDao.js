// 下一个科目的ID
let nextCourseId = 6;

// 科目消息
export let courses = [{
  courseId: 1,
  courseName: '计算机网络',
  manager: '191543110',
}, {
  courseId: 2,
  courseName: '计算机组成原理',
  manager: '191543132',
}, {
  courseId: 3,
  courseName: 'python程序设计',
  manager: '191543109',
}, {
  courseId: 4,
  courseName: 'JavaEE框架程序设计',
  manager: '191543118',
}, {
  courseId: 5,
  courseName: 'Oracle数据库',
  manager: '191543108',
}];

// 添加科目
function addCourse(course) {
  courses.push({
    ...course,
    courseId: nextCourseId
  });
  nextCourseId++;
  return true;
}

// 获取科目信息
function getCourse(courseId) {
  for (let course of courses) {
    if (course.courseId == courseId) {
      return {
        ...course
      };
    }
  }
  return null;
}

// 修改作业信息
function updateCourse(course) {
  for (let c of courses) {
    if (c.courseId == course.courseId) {
      c.courseName = course.courseName;
    }
  }
}

// 删除作业
function removeCourse(courseId) {
  for (let course of courses) {
    if (course.courseId == courseId) {
      let newArr = courses.filter(c => c.courseId != courseId);
      courses = newArr;
      return true;
    }
  }
  return false;
}

export default {
  addCourse,
  updateCourse,
  getCourse,
  removeCourse
};
