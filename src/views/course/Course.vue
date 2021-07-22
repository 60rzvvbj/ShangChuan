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
            <li></li>
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
  background-color: pink;
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
  background-color: skyblue;
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
</style>