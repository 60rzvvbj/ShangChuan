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
// import { test } from 'network/test.js';
// test();

export default {
  name: "app"
};
</script>


<style>
@import url("assets/css/base.css");
@import url("assets/fonts/iconfont.css");
</style>
