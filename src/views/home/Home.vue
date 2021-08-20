<template>
  <div class="home">
    <Header></Header>
    <div class="work">
      <div class="title">
        <div class="number">
          <span :class="tabClass('work')" @click="changeTab('work')">我的作业</span>
          <span :class="tabClass('course')" @click="changeTab('course')">我的课程</span>
        </div>
      </div>
      <div class="content">
        <div class="workList" v-if="nowTab == 'work'">
          <work-list rowNum="5"></work-list>
        </div>
        <div class="courseList" v-if="nowTab == 'course'">
          <ul class="clearfix">
            <li
              v-for="item in courseList"
              @click="goCourse(item)"
              :style="{borderColor: item.color, backgroundColor: item.color}"
            >
              <div class="courseName">
                <div class="text">{{item.courseName}}</div>
              </div>
              <div class="manager" :style="{backgroundColor: item.color}">课代表：{{item.managerName}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from 'components/content/Header';
import WorkList from 'components/content/WorkList';
import { getStudentAllCourse } from 'network/Home.js';

export default {
  name: 'Home',
  data () {
    return {
      nowTab: 'work',
      courseList: [],
    };
  },
  methods: {
    changeTab (tab) {
      this.nowTab = tab;
    },
    tabClass (tab) {
      return this.nowTab == tab ? ['now'] : [];
    },
    goCourse (course) {
      let c = { ...course };
      delete c.color;
      this.$store.commit('setCourse', c);
      this.$router.push('/course');
    }
  },
  computed: {

  },
  components: {
    WorkList,
    Header,
  },
  async created () {
    let courseListData = (await getStudentAllCourse({
      token: tool.getCookie('token'),
    })).data.data;
    for (let i = 0; i < courseListData.length; i++) {
      this.courseList.push({
        courseName: courseListData[i].subjectName,
        courseId: courseListData[i].subjectId,
        managerName: courseListData[i].subjectTeacher,
        color: tool.randomColor(80, 200)
      });
    }
  }
}
</script>

<style scoped>
.home {
  --baseWidth: 1280px;
}

.home {
  background-color: #f9f9f9;
  height: 100vh;
}

.home * {
  cursor: default;
}

.home .work {
  height: 500px;
  width: var(--baseWidth);
  margin: auto;
}

.home .work > .title {
  width: 100%;
  height: 30px;
  padding: 30px 0px;
}

.home .work > .title .number {
  float: left;
  font-size: 20px;
}

.home .work > .title .number span {
  margin-right: 10px;
  color: #999;
  cursor: pointer;
  transition: all 0.3s;
}

.home .work > .title .number span:hover {
  color: #000;
}

.home .work > .title .number .now {
  color: #444;
}

.home .work > .content {
  width: 100%;
  height: 410px;
  padding: 0px 10px 10px 10px;
  margin-left: -10px;
  overflow-y: scroll;
  /* 加了transform之后Element中的dialog会出问题 */
  /* transform: translate(-10px, 0px); */
}

.home .work > .content::-webkit-scrollbar {
  display: none;
}

.home .work > .content .courseList ul {
  width: 100%;
}

.home .work > .content .courseList ul li {
  position: relative;
  float: left;
  width: 200px;
  height: 180px;
  border: 2px solid;
  border-radius: 5px;
  margin-right: 70px;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
  background-color: #fff;
  transition: all 0.3s;
}

.home .work > .content .courseList ul li:nth-child(n + 6) {
  margin-top: 50px;
}

.home .work > .content .courseList ul li:nth-child(5n) {
  margin-right: 0px;
}

.home .work > .content .courseList ul li:hover {
  box-shadow: 0px 3px 5px 0px #999;
}

.home .work > .content .courseList ul li div {
  --managerHeight: 50px;
}

.home .work > .content .courseList ul li .courseName {
  display: table;
  padding: 20px;
  width: 100%;
  height: calc(180px - var(--managerHeight));
  box-sizing: border-box;
  font-size: 20px;
  background-color: #fff;
}

.home .work > .content .courseList ul li .courseName .text {
  display: table-cell;
  vertical-align: middle;
  cursor: pointer;
}

.home .work > .content .courseList ul li .manager {
  width: 100%;
  height: var(--managerHeight);
  font-size: 16px;
  line-height: var(--managerHeight);
  color: #fff;
}
</style>