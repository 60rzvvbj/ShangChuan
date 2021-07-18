<template>
  <div class="home">
    <div class="header">
      <div class="headerMain">
        <div class="left">交作业了</div>
        <div class="right">杨超旭</div>
      </div>
    </div>
    <div class="work">
      <div class="title">
        <div class="number">
          <span>我的作业</span>
          <span>5/10</span>
        </div>
        <div class="create">新建作业</div>
      </div>
      <div class="content">
        <ul class="clearfix">
          <li class="normal">
            <div class="title">计算机网络</div>
            <div class="middle"></div>
            <div class="content">
              <div class="text">实验报告三</div>
            </div>
            <div class="footer">
              <div class="date">2021/7/17 22:00</div>
              <div class="number">23</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <h2>主页</h2>
    <router-link to="/login">登录页</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {

    };
  },
  methods: {

  }
}
</script>

<style scoped>
.home {
  --headerHeight: 60px;
  --baseWidth: 1280px;
}

.home {
  background-color: #f9f9f9;
  height: 100vh;
}

.home * {
  cursor: default;
}

.home .header {
  width: 100%;
  height: var(--headerHeight);
  box-shadow: 0px 0px 2px 0px #000;
  background-color: #fff;
}

.home .header .headerMain {
  width: var(--baseWidth);
  height: 100%;
  margin: auto;
}

.home .header .left {
  float: left;
  height: 100%;
  font-size: 24px;
  font-weight: 700;
  line-height: var(--headerHeight);
}

.home .header .right {
  float: right;
  height: 30px;
  padding: 3px 20px;
  border: 1px solid #000;
  border-radius: 50px;
  margin: calc((var(--headerHeight) - 30px) / 2) 0px;
  box-sizing: border-box;
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

.home .work > .content ul {
  width: 100%;
}

.home .work > .content ul li {
  position: relative;
  float: left;
  width: 200px;
  height: 180px;
  border-radius: 5px;
  margin-right: 70px;
  overflow: hidden;
  background-color: skyblue;
  transition: all 0.3s;
}

.home .work > .content ul li:nth-child(n + 6) {
  margin-top: 50px;
}

.home .work > .content ul li:nth-child(5n) {
  margin-right: 0px;
}

.home .work > .content ul li:hover {
  box-shadow: 0px 3px 5px 0px #999;
}

.work > .content ul li {
  --normalDColor: #9284fe;
  --normalLColor: #eef2ff;
  --urgentDColor: #ff7575;
  --urgentLColor: #feecf2;
  --overdueDColor: #b4b9c8;
  --overdueLColor: #f0f1f4;
  --successDColor: #12a972;
  --successLColor: #ddfbf0;
}

.work > .content ul li .title {
  height: 24px;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #fff;
}

.work > .content ul li .middle {
  display: block;
}

.work > .content ul li .content {
  display: table;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  font-size: 20px;
  text-align: center;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.3s;
}

.work > .content ul li .content .text {
  display: table-cell;
  vertical-align: middle;
  cursor: pointer;
}

.work > .content ul li:hover .content {
  opacity: 1;
}
</style>