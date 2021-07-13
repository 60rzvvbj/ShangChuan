<template>
  <div class="home">
    <div class="header">
      <div class="headerMain">
        <div class="left">交作业了</div>
        <div class="right">杨超旭</div>
      </div>
    </div>
    <div class="work"></div>
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

.header {
  width: 100%;
  height: var(--headerHeight);
  box-shadow: 0px 0px 2px 0px #000;
  background-color: #fff;
}

.header .headerMain {
  width: var(--baseWidth);
  height: 100%;
  margin: auto;
}

.header .left {
  float: left;
  height: 100%;
  font-size: 24px;
  font-weight: 700;
  line-height: var(--headerHeight);
}

.header .right {
  float: right;
  height: 30px;
  padding: 3px 20px;
  border: 1px solid #000;
  border-radius: 50px;
  margin: calc((var(--headerHeight) - 30px) / 2) 0px;
  box-sizing: border-box;
}
</style>
