<template>
  <div class="course">
    <Header></Header>
    <div class="content">
      <div class="work">
        <div class="title">
          <div class="text">作业</div>
          <div class="create iconfont">新建作业</div>
        </div>
        <work-list rowNum="4"></work-list>
      </div>
      <div class="member">
        <div class="title">
          <div class="text">成员</div>
          <div class="create iconfont">添加成员</div>
        </div>
        <div class="memberList">
          <ul>
            <li v-for="item in [1,1,1,1,1,1,1, 2, 3, 4, 5]">
              <div class="username">杨超旭</div>
              <div class="account">学号：191543132</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from 'components/content/Header.vue';
import WorkList from 'components/content/WorkList.vue';
export default {
  name: 'Course',
  data () {
    return {

    };
  },
  components: {
    Header,
    WorkList,
  },
}
</script>

<style scoped>
.course {
  --baseWidth: 1280px;
}

.content {
  width: var(--baseWidth);
  height: 500px;
  padding-top: 20px;
  margin: auto;
  box-sizing: border-box;
}

.content .work {
  float: left;
  width: 1010px;
  height: 100%;
}

.member {
  float: right;
  width: 240px;
  height: 100%;
}

.content > div > .title {
  height: 60px;
}

.content > div > .title .text {
  float: left;
  font-size: 24px;
}

.content > div > .title .create {
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

.content > div > .title .create::before {
  padding-right: 3px;
  content: "\e644";
}

.content > div > .title .create:hover {
  background-color: #000;
}

.member .memberList {
  width: 100%;
  height: calc(100% - 60px);
  padding: 5px;
  box-sizing: border-box;
  overflow-y: scroll;
}

.member .memberList::-webkit-scrollbar {
  display: none;
}
.member .memberList ul {
  width: 100%;
}

.member .memberList ul li {
  height: 39px;
  border-radius: 5px;
  padding: 2px;
  margin-top: 14px;
  box-shadow: 0px 1px 2px 0px #666;
  box-sizing: border-box;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s;
}

.member .memberList ul li:first-child {
  margin-top: 0px;
}

.member .memberList ul li:hover {
  box-shadow: 0px 1px 2px 1px #666;
}

.member .memberList ul li .username {
  font-size: 16px;
}

.member .memberList ul li .account {
  font-size: 10px;
  color: #333;
}
</style>