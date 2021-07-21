<template>
  <div class="home">
    <Header></Header>
    <div class="work">
      <div class="title">
        <div class="number">
          <span :class="tabClass('work')" @click="changeTab('work')">我的作业</span>
          <span :class="tabClass('course')" @click="changeTab('course')">我的课程</span>
        </div>
        <div class="create iconfont">新建作业</div>
      </div>
      <div class="content">
        <div class="workList" v-if="nowTab == 'work'">
          <work-list></work-list>
        </div>
        <div class="courseList" v-if="nowTab == 'course'">课程列表</div>
      </div>
    </div>
    <h2>主页</h2>
    <router-link to="/login">登录页</router-link>
  </div>
</template>

<script>
import Header from 'components/content/Header';
import WorkList from 'components/content/WorkList';

export default {
  name: 'Home',
  data () {
    return {
      nowTab: 'work',
    };
  },
  methods: {
    changeTab (tab) {
      this.nowTab = tab;
    },
    tabClass (tab) {
      return this.nowTab == tab ? ['now'] : [];
    }
  },
  computed: {

  },
  components: {
    WorkList,
    Header
  },
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

.home .work > .title .create {
  float: right;
  height: 30px;
  padding: 1px 15px;
  border-radius: 5px;
  font-size: 16px;
  line-height: 30px;
  color: #fff;
  background-color: #444;
  cursor: pointer;
  transition: background-color 0.3s;
}

.home .work > .title .create::before {
  padding-right: 3px;
  content: "\e644";
}

.home .work > .title .create:hover {
  background-color: #000;
}

.home .work > .content {
  width: 100%;
  height: 410px;
  padding: 0px 10px 10px 10px;
  overflow-y: scroll;
  transform: translate(-10px, 0px);
  /* background-color: rgb(255, 0, 0, 0.5); */
}

.home .work > .content::-webkit-scrollbar {
  display: none;
}
</style>