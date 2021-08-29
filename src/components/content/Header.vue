<template>
  <div class="header">
    <div class="headerMain">
      <div class="left" @click="goHome">交作业了</div>
      <el-popover placement="top" width="160" trigger="hover">
        <div class="info">
          <span>姓名： {{user.username}}</span>
          <span>学号： {{user.sno}}</span>
          <div class="line"></div>
          <div class="logout" @click="logout">切换账号</div>
          <div class="changePd" @click="changePd">修改密码</div>
        </div>
        <div class="right" slot="reference">{{user.username}}</div>
      </el-popover>
      <el-tooltip effect="dark" content="使用说明" placement="bottom">
        <div class="help el-icon-question" @click="goHelp"></div>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import ElementUI from 'plugins/ElementUI.js';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Header',
  data () {
    return {
    };
  },
  methods: {
    goHome () {
      this.$router.push('/home');
    },
    goHelp () {
      window.open('https://blog.csdn.net/ycx60rzvvbj/article/details/119975165');
    },
    logout () {
      this.$router.push('/login');
    },
    changePd () {
      this.$router.push('/changePd');
    }
  },
  components: {
    ...ElementUI,
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>

<style scoped>
@import url("~element-ui/lib/theme-chalk/index.css");
.header {
  --baseWidth: 1280px;
  --headerHeight: 60px;
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
  cursor: pointer;
}

.header .help {
  float: right;
  width: 30px;
  height: 30px;
  margin: calc((var(--headerHeight) - 30px) / 2) 0px;
  margin-right: 10px;
  font-size: 30px;
  color: #666;
  cursor: pointer;
}

.header .help:hover {
  color: #333;
}

.header .right {
  position: relative;
  float: right;
  height: 30px;
  padding: 3px 20px;
  border: 1px solid #000;
  border-radius: 50px;
  margin: calc((var(--headerHeight) - 30px) / 2) 0px;
  box-sizing: border-box;
  cursor: pointer;
}

.info {
  position: relative;
  width: 100%;
  height: 60px;
  border-radius: 5px;
  box-sizing: border-box;
}

.info span {
  display: block;
  font-size: 14px;
}

.info .line {
  position: absolute;
  bottom: 15px;
  width: 100%;
  height: 0.5px;
  background-color: #eee;
}

.info .logout {
  position: absolute;
  bottom: -7px;
  left: 0px;
  font-size: 12px;
  color: #666;
  cursor: pointer;
  transition: color 0.3s;
}

.info .changePd:hover {
  color: #000;
}

.info .changePd {
  position: absolute;
  bottom: -7px;
  right: 0px;
  font-size: 12px;
  color: #666;
  cursor: pointer;
  transition: color 0.3s;
}

.info .logout:hover {
  color: #000;
}
</style>