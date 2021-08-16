<template>
  <div class="course">
    <Header></Header>
    <div class="content">
      <div class="work">
        <div class="title">
          <div class="text">作业</div>
          <div class="create iconfont" @click="addWorkShow">新建作业</div>
        </div>
        <work-config
          ref="workConfigBox"
          :defaultValue="addWorkDefaultValue"
          @submit="addWorkSubmit"
        ></work-config>
        <work-list rowNum="4"></work-list>
      </div>
      <div class="member">
        <div class="title">
          <div class="text">成员</div>
          <div class="create iconfont" @click="addMemberStatus=true">添加成员</div>
          <el-dialog
            custom-class="addMemberBox"
            title="添加成员"
            :visible.sync="addMemberStatus"
            center
          >
            <div>
              <div class="left">用户账号：</div>
              <div class="middle">
                <el-input v-model="addMemberAccount" placeholder="请输入用户账号" @input="searchAccount"></el-input>
                <!-- <div class="message" v-if="searchAccountStatus">姓名：{{searchAccountMessage}}</div>
                <div class="message messageError" v-else>{{searchAccountMessage}}</div>-->
              </div>
              <div class="right">
                <el-button :disabled="!searchAccountStatus" type="primary" @click="addMember">添加</el-button>
              </div>
            </div>
            <div>
              <div class="left">搜索结果：</div>
              <div class="middle">
                <el-input :value="searchAccountMessage"></el-input>
              </div>
            </div>
          </el-dialog>
        </div>
        <div class="memberList">
          <ul>
            <li v-for="item in [1,1,1,1,1,1,1, 2, 3, 4, 5]">
              <div class="username">杨超旭</div>
              <div class="account">学号：191543132</div>
              <div class="remove el-icon-remove-outline"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from 'components/content/Header.vue';
import WorkList from 'components/content/WorkList.vue';
import { mapState, mapGetters } from 'vuex';
import ElementUI from 'plugins/ElementUI.js';
import WorkConfig from 'components/content/WorkConfig.vue';
export default {
  name: 'Course',
  data () {
    return {
      addWorkDefaultValue: {
        workName: 'nnn',
        ddl: new Date(),
        workFormat: 'xxx',
      },
      addMemberStatus: false,
      addMemberAccount: '',
      searchAccountTimer: null,
      searchAccountStatus: false,
      searchAccountMessage: '',
      date: null,
    };
  },
  methods: {
    addWorkShow () {
      this.$refs.workConfigBox.show();
    },
    addWorkSubmit (work) {
      console.log(work);
    },
    searchAccount () {
      clearTimeout(this.searchAccountTimer);
      this.searchAccountTimer = setTimeout(() => {
        console.log('请求');
        if (this.addMemberAccount == '') {
          this.searchAccountStatus = false;
          this.searchAccountMessage = '';
          return;
        }
        if (this.addMemberAccount == '191543132') {
          this.searchAccountStatus = true;
          this.searchAccountMessage = '杨超旭';
        } else {
          this.searchAccountStatus = false;
          this.searchAccountMessage = '未查询到该用户';
        }
      }, 500);
    },
    addMember () {
      console.log(`添加${this.addMemberAccount}`);
    }
  },
  components:
  {
    WorkConfig,
    Header,
    WorkList,
    ...ElementUI,
  },
  computed: {
    ...mapState(['course']),
  },
  mounted () {
    console.log(this.course);
  }
}
</script>

<style scoped>
@import url("~element-ui/lib/theme-chalk/index.css");
.course {
  --baseWidth: 1280px;
}

.course {
  height: 100%;
  background-color: #f9f9f9;
}

.content {
  width: var(--baseWidth);
  height: 500px;
  padding-top: 20px;
  margin: auto;
  box-sizing: border-box;
}

.content .work {
  float: left;
  width: 1010px;
  height: 100%;
}

.member {
  float: right;
  width: 240px;
  height: 100%;
}

.content > div > .title {
  height: 60px;
}

.content > div > .title .text {
  float: left;
  font-size: 24px;
}

.content > div > .title .create {
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

.content > div > .title .create::before {
  padding-right: 3px;
  content: "\e644";
}

.content > div > .title .create:hover {
  background-color: #000;
}
</style>

<style>
/* ------------- */
.el-dialog__wrapper .addMemberBox {
  width: 600px;
  border-radius: 10px;
  /* background-color: #f00; */
}

.el-dialog__wrapper .addMemberBox .el-dialog__header {
  padding: 30px 0px;
}

.el-dialog__wrapper .addMemberBox .el-dialog__title {
  font-size: 24px;
  font-weight: 700;
  color: #000;
}

.el-dialog__wrapper .addMemberBox > .el-dialog__body {
  padding: 0px 60px 60px;
}

.el-dialog__wrapper .addMemberBox > .el-dialog__body > div {
  --height: 40px;
}

.el-dialog__wrapper .addMemberBox > .el-dialog__body > div {
  display: flex;
  flex-flow: row nowrap;
  height: var(--height);
  margin-bottom: 30px;
}

.el-dialog__wrapper .addWorkBox > .el-dialog__body > div:last-child {
  margin-bottom: 0px;
}

.el-dialog__wrapper .addMemberBox > .el-dialog__body > div > .left {
  font-size: 18px;
  line-height: var(--height);
  color: #000;
}

.el-dialog__wrapper .addMemberBox > .el-dialog__body > div > .middle {
  flex: 1;
  /* padding: 0px 15px; */
}

.el-dialog__wrapper .addMemberBox > .el-dialog__body > div > .middle > * {
  width: 100%;
}

.el-dialog__wrapper .addMemberBox .el-dialog__body > div .message {
  margin-top: 5px;
  font-size: 12px;
  color: #000;
}

.el-dialog__wrapper .addMemberBox > .el-dialog__body > div > .right {
  margin-left: 15px;
}

.el-dialog__wrapper .addMemberBox .el-dialog__body > div .messageError {
  color: #f56c6c;
}

.el-dialog__wrapper .addMemberBox > .el-diaog__footer {
  display: none;
}
</style>

<style scoped>
.member .memberList {
  width: 100%;
  height: calc(100% - 60px);
  /* padding: 5px; */
  box-sizing: border-box;
  overflow-y: scroll;
}

.member .memberList::-webkit-scrollbar {
  display: none;
}
.member .memberList ul {
  width: 100%;
}

.member .memberList ul li {
  position: relative;
  height: 48px;
  padding: 5px 0px 5px 20px;
  margin-top: 14px;
  box-sizing: border-box;
  border-left: 4px solid #5896fb;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s;
}

.member .memberList ul li:first-child {
  margin-top: 0px;
}

.member .memberList ul li:hover {
  background-color: #e4ecfc;
}

.member .memberList ul li .username {
  font-size: 16px;
}

.member .memberList ul li .account {
  font-size: 10px;
  color: #333;
}

.member .memberList ul li .remove {
  display: none;
  position: absolute;
  top: 50%;
  right: 10px;
  font-size: 20px;
  color: #999;
  cursor: pointer;
  transform: translate(0%, -50%);
  transition: color 0.3s;
}

.member .memberList ul li:hover .remove {
  display: block;
}

.member .memberList ul li .remove:hover {
  color: #111;
}
</style>