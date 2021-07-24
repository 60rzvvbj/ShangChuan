<template>
  <div class="setting">
    <Header></Header>
    <div class="change_box">
      <div class="change_til">修改密码</div>
      <div class="form_box">
        <el-form
          label-width="100px"
          class="set_form"
          :model="setForm"
          :rules="setRules"
          ref="setFormRef"
        >
          <!-- 旧密码 -->
          <el-form-item prop="oldPd" label="旧密码">
            <el-input v-model="setForm.oldPd" autocomplete="off" show-password></el-input>
          </el-form-item>
          <!-- 新密码 -->
          <el-form-item prop="newPd" label="新密码">
            <el-input v-model="setForm.newPd" autocomplete="off" show-password></el-input>
          </el-form-item>
          <!-- 确认密码 -->
          <el-form-item prop="surePd" class="password_check" label="确认新密码">
            <el-input v-model="setForm.surePd" autocomplete="off" show-password></el-input>
          </el-form-item>
          <!-- 按钮 -->
          <!-- <div class="btn_box">
            <div class="btn">提交</div>
          </div>-->
          <el-button class="btn" type="primary" plain round>提交</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Header from 'components/content/Header';
import ElementUI from 'plugins/ElementUI';

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
    return {
      // 数据绑定
      setForm: {
        oldPd: '',
        newPd: '',
        surePd: ''
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
  components: {
    Header,
    ...ElementUI
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
</style>