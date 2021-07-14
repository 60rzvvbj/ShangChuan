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

<style>
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
  /* background-color: skyblue; */
}

.home .work .title {
  width: 100%;
  height: 30px;
  padding: 30px 0px;
}

.home .work .title .number {
  float: left;
  font-size: 20px;
}

.home .work .title .number span {
  margin-right: 10px;
}

.home .work .title .create {
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

.home .work .title .create:hover {
  background-color: #000;
}
</style>
