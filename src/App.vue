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
      tool.removeCookie('token');
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
};
</script>


<style>
@import url("assets/css/base.css");
@import url("assets/fonts/iconfont.css");
</style>
