<template>
  <div id="app">
    <!-- 路由占位符 -->
    <router-view></router-view>
  </div>
</template>

<script>
import tool from 'common/utils.js';
window.tool = tool;
// 测试接口
import router from './router/index';
import store from './store/index';
import { test } from 'network/test.js';
import { getUserInfo } from 'network/public.js';
test();

// 初始化User
async function initUser () {
  if (tool.getCookie('token') != null) {
    let userInfo;
    try {
      userInfo = await getUserInfo({
        account: tool.getCookie('user'),
        token: tool.getCookie('token')
      });
    } catch (e) {
      router.push('/login');
    }
    store.commit('setUser', {
      sno: userInfo.stuId,
      userId: userInfo.userId,
      username: userInfo.name,
      account: userInfo.username
    });
  }
}

export default {
  name: "app",
  methods: {
    initUser
  },
  async created () {
    document.title = '课代帮';
    this.initUser();
    document.body.style.zoom = window.screen.availWidth / 1536;
  },
  computed: {
    zoom () {
      let w = window.screen.width;
      return w / 1536;
    }
  }
};
</script>

<style>
@import url("assets/css/base.css");
@import url("assets/fonts/iconfont.css");
</style>

<style scoped>
#app {
  background-color: #f9f9f9;
}
</style>
