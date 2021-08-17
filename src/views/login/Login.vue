<template>
  <div class="login_container">
    <!-- 背景 -->
    <div class="bg_img" :style="{backgroundImage:'url(' + imgUrl + ')'}"></div>
    <!-- 登录盒子 -->
    <div class="login_box">
      <div class="yun_box"></div>
      <div class="title">
        <div class="sign">SIGN</div>
        <div class="in" :style="{top:instate}">IN</div>
        <div class="up" :style="{top:upstate}">UP</div>
      </div>
      <!-- 登录表单区 -->
      <el-form
        label-width="0px"
        class="login_form"
        :model="loginForm"
        :rules="loginRules"
        ref="loginFormRef"
      >
        <!-- 学号 -->
        <el-form-item prop="stuNumber">
          <el-input placeholder="请输入学号" v-model="loginForm.stuNumber" autocomplete="off">
            <i slot="prefix" class="iconfont icon-subscriber-fill"></i>
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="loginForm.password"
            show-password
            autocomplete="off"
          >
            <i slot="prefix" class="iconfont icon-lock"></i>
          </el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item prop="password_check" class="password_check" v-if="state == 'up'">
          <el-input
            placeholder="请确认密码"
            v-model="loginForm.password_check"
            show-password
            autocomplete="off"
          >
            <i slot="prefix" class="iconfont icon-lock"></i>
          </el-input>
        </el-form-item>
        <!-- 按钮 -->
        <div class="btn_box">
          <div class="btn" @click="logIn">登录</div>
          <!-- <div class="btn" @click="signIn">注册</div> -->
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import ElementUI from 'plugins/ElementUI';
import { getBackground, loginTest } from 'network/Login';
const message = ElementUI.Message;//消息提示

export default {
  name: 'Login',
  data () {
    //确认密码规则
    var checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.loginForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      // 背景
      imgUrl: '',
      // 登录表单的数据绑定对象
      loginForm: {
        stuNumber: '',
        password: '',
        password_check: ''
      },
      //表单状态
      state: 'in',
      instate: '0px',
      upstate: '35px',
      // 验证规则
      loginRules: {
        stuNumber: [
          { required: true, message: '请输入学号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' }
        ],
        password_check: [
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    //注册
    signIn () {
      let self = this;
      //修改title
      console.log(self.state);
      if (self.state == 'in') {
        self.state = 'up';
        self.upstate = '0px'
        self.instate = '35px'
        this.clearUser()
      }
    },
    //登录
    logIn () {
      let self = this;
      // 修改title
      if (self.state == 'up') {
        self.state = 'in';
        self.upstate = '35px'
        self.instate = '0px'
        // 获取账号信息
        this.setUser()
      }
      // 预验证
      this.$refs.loginFormRef.validate(async (valid) => {
        //与验证不通过则return
        if (!valid) return;
        const { data: res } = await loginTest(this.loginForm);
        console.log(res.flag);
        // 每次手动关闭所有弹框
        message.closeAll()
        if (!res.flag) {
          return message.error('该账户不存在或密码错误！')
        }
        message.success('登录成功！')
        //设置cookie
        // window.sessionStorage.setItem('token', res.result.authToken)
        const setDate = { token: res.data, user: this.loginForm.stuNumber, password: this.loginForm.password };
        tool.setCookie(setDate, 7);
        // 跳转地址
        this.$router.push('/home')
      })
    },
    //设置账号密码
    setUser () {
      this.loginForm.stuNumber = tool.getCookie("user");
      this.loginForm.password = tool.getCookie("password");
    },
    // 清除账号密码
    clearUser () {
      this.loginForm.stuNumber = '';
      this.loginForm.password = '';
    }
  },
  components: {
    ...ElementUI,
  },
  created () {
    getBackground().then((data) => {
      this.imgUrl = "http://localhost:1523/bingImg?url=" + data;
    });
    this.setUser()
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
// 背景图
.bg_img {
  width: 100%;
  height: 100%;
}
// 登录盒子
.login_box {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 450px;
  background-color: rgba(255, 255, 255, 0.712);
  border-radius: 3px;
  transform: translate(-50%, -50%);
}
//标题
.title {
  position: relative;
  height: 35px;
  margin: 30px 0;
  text-align: center;
  font-size: 28px;
  color: rgb(0, 0, 0);
  overflow: hidden;
  .up,
  .sign,
  .in {
    position: absolute;
    transition: all 0.3s ease;
  }
  .sign {
    left: 38%;
  }
  .in,
  .up {
    left: 55%;
  }
}
// 云图片
.yun_box {
  position: absolute;
  left: 50%;
  top: 0;
  width: 64px;
  height: 64px;
  background-image: url(../../assets/img/yun.png);
  transform: translate(-50%, -90%);
}
// 登录表单
.login_form {
  width: 100%;
  padding: 0 50px;
  box-sizing: border-box;
}
// 按钮
.btns {
  display: flex;
  justify-content: center;
}
.el-input {
  .el-input__inner {
    color: #000;
  }
}
//图标位置
.iconfont {
  margin: 0 4px;
  color: #999;
}
// 按钮
.btn_box {
  display: flex;
  margin: 40px 0;
  justify-content: space-around;
}
.btn {
  position: relative;
  display: inline-block;
  width: 120px;
  line-height: 40px;
  border-radius: 5px;
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  letter-spacing: 20px;
  text-indent: 20px; //缩进解决文字居中
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
}
.btn {
  border: none;
  color: #000;
}
.btn:after {
  position: absolute;
  content: "";
  width: 0;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 5px;
  box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
    7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001;
  transition: all 0.3s ease;
}
.btn:hover:after {
  left: auto;
  right: 0;
  width: 100%;
}
.btn:active {
  top: 2px;
}
</style>