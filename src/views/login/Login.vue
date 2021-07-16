<template>
  <div class="login_container">
    <div class="login_box">
      <div class="yun_box"></div>
      <div class="title">
        <div class="login">LOG IN</div>
      </div>
      <!-- 登录表单区 -->
      <el-form label-width="0px" class="login_form" :model="loginForm" :rules="loginRules">
        <!-- 学号 -->
        <el-form-item prop="stuNumber">
          <el-input
            placeholder="请输入学号"
            v-model="loginForm.stuNumber"
            prefix-icon="iconfont icon-subscriber-fill"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="loginForm.password"
            show-password
            prefix-icon="iconfont icon-lock"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import ElementUI from 'plugins/ElementUI';
import { getBackground } from 'network/Login';

export default {
  name: 'Login',
  data () {
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        stuNumber: '',
        password: ''
      },
      // 验证规则
      loginRules: {
        stuNumber: [
          { required: true, message: '请输入学号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {

  },
  components: {
    ...ElementUI,
  },
  created () {
    getBackground().then(function (data) {
      console.log(data);
    });
  }
}

</script>


<style lang="less" scoped>
// scoped当前组件生效
@import url("~element-ui/lib/theme-chalk/index.css");
.login_container {
  height: 100%;
  background-color: rgb(46, 58, 51);
}
.login_box {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  transform: translate(-50%, -50%);
}
.title {
  margin: 30px 0;
  text-align: center;
  font-size: 28px;
  color: rgb(46, 58, 51);
}
.yun_box {
  position: absolute;
  left: 50%;
  top: 0;
  width: 64px;
  height: 64px;
  background-image: url(../../assets/img/yun.png);
  transform: translate(-50%, -90%);
}
.login_form {
  width: 100%;
  padding: 0 50px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: center;
}
</style>