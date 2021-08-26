<template>
  <div class="setting">
    <Header></Header>
    <div class="change_box">
      <div class="change_til">修改密码</div>
      <!-- 返回 -->
      <div
        class="callback"
        @click="backHistory"
      >
        <i class="iconfont icon-return"></i>
      </div>
      <div class="form_box">
        <el-form
          label-width="100px"
          class="set_form"
          :model="setForm"
          :rules="setRules"
          ref="setFormRef"
        >
          <!-- 旧密码 -->
          <el-form-item
            prop="oldPd"
            label="旧密码"
          >
            <el-input
              v-model="setForm.oldPd"
              autocomplete="off"
              show-password
            ></el-input>
          </el-form-item>
          <!-- 新密码 -->
          <el-form-item
            prop="newPd"
            label="新密码"
          >
            <el-input
              v-model="setForm.newPd"
              autocomplete="off"
              show-password
            ></el-input>
          </el-form-item>
          <!-- 确认密码 -->
          <el-form-item
            prop="surePd"
            class="password_check"
            label="确认新密码"
          >
            <el-input
              v-model="setForm.surePd"
              autocomplete="off"
              show-password
            ></el-input>
          </el-form-item>
          <!-- 按钮 -->
          <!-- <div class="btn_box">
            <div class="btn">提交</div>
          </div>-->
          <el-button
            class="btn"
            type="primary"
            plain
            round
            @click="changeClick"
          >提交</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Header from 'components/content/Header';
import ElementUI from 'plugins/ElementUI';
import { changePassWord } from 'network/changePd';
const message = ElementUI.Message;//消息提示

export default {
  name: 'Setting',
  data () {
    //确认密码规则
    var checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.setForm.newPd) {
        callback(new Error('两次输入的新密码不一致!'));
      } else {
        callback();
      }
    };
    //确认旧密码
    // var checkOldPassword = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入旧密码'));
    //   } else if (value !== tool.getCookie("password")) {
    //     callback(new Error('旧密码错误!'));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      // 数据绑定
      setForm: {
        user: '',
        oldPd: '',
        newPd: '',
        surePd: '',
        token: ''
      },
      //验证规则
      setRules: {
        oldPd: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPd: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        surePd: [
          { validator: checkPassword, required: true, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    //返回上一层
    backHistory () {
      this.$router.go(-1);
    },
    // 获取信息
    getMes () {
      this.setForm.token = tool.getCookie("token");
      this.setForm.user = tool.getCookie("user");
    },
    // 修改密码
    changeClick () {
      // 预验证
      this.$refs.setFormRef.validate(async (valid) => {
        //与验证不通过则return
        if (!valid) return;
        const { data: res } = await changePassWord(this.setForm);
        console.log(res);
        // 每次手动关闭所有弹框
        message.closeAll()
        if (!res.flag) {
          return message.error(res.message + '！')
        }
        message.success('修改成功！')
        // 修改cookie
        tool.setCookie({ password: this.setForm.newPd }, 7);
        this.getMes()
      })
    }
  },
  components: {
    Header,
    ...ElementUI
  },
  created () {
    this.getMes();
  }
}
</script>

<style lang="less" scoped>
@import url("~element-ui/lib/theme-chalk/index.css");
// 背景色
.setting {
  width: 100%;
  height: 100%;
  background-color: #f0f4f7;
}
// 修改密码大盒子
.change_box {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 900px;
  height: 400px;
  transform: translate(-50%, -50%);
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  background-color: #fff;
}
// 标题
.change_til {
  position: relative;
  padding-left: 20px;
  margin: 30px 20px;
  font-size: 20px;
  font-weight: 700;
}
.change_til::before {
  position: absolute;
  content: "";
  border: solid;
  left: 0;
  top: 0;
  height: 100%;
}
// 表单盒子
.form_box {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  width: 500px;
}
// 表单
.set_form {
  text-align: center;
  width: 100%;
}
.btn {
  //   position: relative;
  //   display: inline-block;
  width: 120px;
  margin-top: 30px;
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  letter-spacing: 20px;
  text-indent: 10px; //缩进解决文字居中
  //   background-color: cadetblue;
  //   cursor: pointer;
}
//返回
.callback {
  position: absolute;
  top: 30px;
  right: 30px;
  size: 50px;
  color: rgb(182, 179, 179);
  cursor: pointer;
}
.callback i {
  font-size: 30px;
}
.callback:hover {
  color: #000;
}
</style>