<template>
  <div class="course">
    <Header></Header>
    <div class="content">
      <div class="work">
        <div class="title">
          <div class="text">作业</div>
          <div
            v-if="user.userId == course.menagerId"
            class="create iconfont"
            @click="addWorkShow"
          >新建作业</div>
        </div>
        <work-config
          ref="workConfigBox"
          :title="'新建作业'"
          :defaultValue="addWorkDefaultValue"
          @submit="addWorkSubmit"
        ></work-config>
        <div class="workList">
          <work-list ref="workList" rowNum="4" :type="'course'" :id="course.courseId"></work-list>
        </div>
      </div>
      <div class="member">
        <div class="title">
          <div class="text">成员</div>
          <div
            v-if="user.userId == course.menagerId"
            class="create iconfont"
            @click="addMemberData.status=true"
          >添加成员</div>
          <el-dialog
            custom-class="addMemberBox"
            title="添加成员"
            :visible.sync="addMemberData.status"
            center
          >
            <div>
              <div class="left">用户账号：</div>
              <div class="middle">
                <el-input v-model="addMemberData.sno" placeholder="请输入用户账号" @input="searchAccount"></el-input>
                <div v-if="addMemberData.result">
                  <div class="message" v-if="addMemberData.searchStatus">
                    {{addMemberData.message}}
                    <div class="add iconfont icon-jia" @click="addMember"></div>
                  </div>
                  <div class="message messageError" v-else>{{addMemberData.message}}</div>
                </div>
              </div>
              <div class="right">
                <el-button
                  :disabled="!addMemberData.searchStatus"
                  type="primary"
                  @click="addMember"
                >添加</el-button>
              </div>
            </div>
          </el-dialog>
        </div>
        <div class="memberList">
          <ul>
            <li v-for="item in memberList">
              <div class="username">{{item.username}}</div>
              <div class="account">学号：{{item.sno}}</div>
              <div
                v-if="user.userId == course.menagerId"
                class="remove el-icon-remove-outline"
                @click="removeMemberBoxShow(item)"
              ></div>
            </li>
          </ul>
          <el-dialog
            custom-class="removeMemberBox"
            :visible.sync="removeMemberData.status"
            center
            :show-close="false"
          >
            <div>确定要移除成员{{removeMemberData.nowMember.username}}吗</div>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="removeMember">确 定</el-button>
              <el-button @click="removeMemberData.status= false">取 消</el-button>
            </div>
          </el-dialog>
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
import { getCourseStudents, searchUser, removeMember, addMember, addWork } from 'network/Course.js';

export default {
  name: 'Course',
  data () {
    return {
      course: {},
      addWorkDefaultValue: {
        workName: '',
        ddl: null,
        workFormat: '',
      },
      addMemberData: {
        status: false, // 是否显示添加成员
        sno: '', // 添加成员用户学号
        userId: '', // 用户ID 
        timer: null, // 防抖计时器
        result: false, // 是否显示搜索结果
        searchStatus: false, // 用户是否可添加
        message: '', // 信息
      },
      removeMemberData: {
        status: false,
        nowMember: {},
      },
      memberList: [],
    };
  },
  methods: {
    addWorkShow () {
      this.$refs.workConfigBox.show();
    },
    async addWorkSubmit (work) {
      let addRes = (await addWork({
        token: tool.getCookie('token'),
        workName: work.workName,
        ddl: '' + work.ddl,
        workFormat: work.workFormat,
        courseId: this.course.courseId,
        named: work.named
      })).data;
      if (addRes.flag) {
        this.$refs.workList.addNewWork({
          workId: addRes.data,
          workSubmitId: '',
          managerId: this.user.userId,
          title: this.course.courseName,
          name: work.workName,
          ddl: work.ddl,
          submit: false,
          number: 0,
        });
        ElementUI.Message({
          type: 'success',
          message: tool.randomData([{
            rank: 3,
            data: '布置作业成功'
          }, {
            rank: 1,
            data: '又多了一份作业，又多了一份罪恶'
          }]),
        });
      } else {
        ElementUI.Message({
          type: 'error',
          message: tool.randomData([{
            rank: 3,
            data: '布置作业失败'
          }, {
            rank: 1,
            data: '服务器正忙，看来老天不想让你布置作业呢'
          }]),
        });
      }
    },
    searchAccount () {
      clearTimeout(this.addMemberData.timer);
      // timeout防抖
      this.addMemberData.timer = setTimeout(async () => {

        // 判断输入框是否为空
        if (this.addMemberData.sno == '') {
          this.addMemberData.searchStatus = false;
          this.addMemberData.result = false;
          return;
        }

        // 请求
        let userList = (await searchUser({
          token: tool.getCookie('token'),
          sno: this.addMemberData.sno
        })).data.data;

        // 判断是否查到了
        if (userList.length != 0) {
          this.addMemberData.searchStatus = true;
          this.addMemberData.message = userList[0].name;
          this.addMemberData.userId = userList[0].userId;
        } else {
          this.addMemberData.searchStatus = false;
          this.addMemberData.message = '未查询到该用户';
        }
        this.addMemberData.result = true;
      }, 500);
    },
    async addMember () {
      let addRes = (await addMember({
        token: tool.getCookie('token'),
        courseId: this.course.courseId,
        userId: this.addMemberData.userId,
      })).data;
      if (addRes.flag) {
        this.memberList.push({
          userId: this.addMemberData.userId,
          username: this.addMemberData.message,
          sno: this.addMemberData.sno,
        });
        ElementUI.Message({
          type: 'success',
          message: tool.randomData([{
            rank: 3,
            data: '添加成功'
          }, {
            rank: 1,
            data: '又来了一个小可爱'
          }]),
        });
      } else {
        ElementUI.Message({
          type: 'error',
          message: tool.randomData([{
            rank: 3,
            data: '添加失败'
          }, {
            rank: 1,
            data: '服务器正忙，请下辈子再试'
          }]),
        });
      }
    },
    removeMemberBoxShow (item) {
      this.removeMemberData.nowMember = item;
      this.removeMemberData.status = true;
    },
    async removeMember () {
      let removeRes = (await removeMember({
        token: tool.getCookie('token'),
        userId: this.removeMemberData.nowMember.userId,
        courseId: this.course.courseId,
      })).data;
      this.removeMemberData.status = false;
      let status = true;
      if (!removeRes.flag) {
        status = false;
      }
      if (this.removeMemberData.nowMember.sno == this.user.sno) {
        status = false;
      }
      if (status) {
        let newArr = [];
        for (let item of this.memberList) {
          if (this.removeMemberData.nowMember != item) {
            newArr.push(item);
          }
        }
        this.memberList = newArr;
        ElementUI.Message({
          type: 'success',
          message: tool.randomData([{
            rank: 3,
            data: '移除成功'
          }, {
            rank: 1,
            data: '恭喜恭喜，移除成功了'
          }]),
        });
      } else {
        ElementUI.Message({
          type: 'error',
          message: tool.randomData([{
            rank: 3,
            data: '移除失败'
          }, {
            rank: 1,
            data: '移不动，除不掉'
          }]),
        });
      }
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
    ...mapState(['user']),
  },
  async created () {
    this.course = this.$route.query;
    let stuList = (await getCourseStudents({
      courseId: this.course.courseId,
      token: tool.getCookie('token')
    })).data.data;
    let ml = [];
    for (let i = 0; i < stuList.length; i++) {
      ml.push({
        userId: stuList[i].userId,
        username: stuList[i].name,
        sno: stuList[i].stuId,
      });
    }
    this.memberList = ml;
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

.content .work > .workList {
  width: 100%;
  height: 420px;
  padding: 0px 10px 10px 10px;
  margin-left: -10px;
  overflow-y: scroll;
}

.content .work .workList::-webkit-scrollbar {
  display: none;
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
.el-dialog__wrapper .addMemberBox {
  width: 500px;
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
  padding: 0px 60px 80px;
}

.el-dialog__wrapper .addMemberBox > .el-dialog__body > div {
  --height: 40px;
}

.el-dialog__wrapper .addMemberBox > .el-dialog__body > div {
  display: flex;
  flex-flow: row nowrap;
  height: var(--height);
}

.el-dialog__wrapper .addMemberBox > .el-dialog__body > div > .left {
  font-size: 18px;
  line-height: var(--height);
  color: #000;
}

.el-dialog__wrapper .addMemberBox > .el-dialog__body > div > .middle {
  flex: 1;
  position: relative;
  /* padding: 0px 15px; */
}

.el-dialog__wrapper .addMemberBox > .el-dialog__body > div > .middle > * {
  width: 100%;
}

.el-dialog__wrapper .addMemberBox .el-dialog__body > div .message {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0px 15px;
  border-radius: 5px;
  box-shadow: 0px 1px 2px 1px #999;
  box-sizing: border-box;
  font-size: 12px;
  line-height: var(--height);
  color: #000;
}

.el-dialog__wrapper .addMemberBox .el-dialog__body > div .message:hover {
  background-color: #e4ecfc;
}

.el-dialog__wrapper .addMemberBox .el-dialog__body > div .message .add {
  position: absolute;
  top: 0px;
  right: 15px;
  height: 100%;
  font-size: 14px;
  color: #666;
  cursor: pointer;
}

.el-dialog__wrapper .addMemberBox .el-dialog__body > div .message .add:hover {
  color: #000;
}

.el-dialog__wrapper .addMemberBox > .el-dialog__body > div > .right {
  display: none;
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

<style>
.el-dialog__wrapper .removeMemberBox {
  width: 400px;
  height: 180px;
}

.el-dialog__wrapper .removeMemberBox .el-dialog__header {
  padding: 20px 15px 0px;
}

.el-dialog__wrapper .removeMemberBox .el-dialog__body {
  font-size: 24px;
  text-align: center;
  color: #000;
}

.el-dialog__wrapper .removeMemberBox .el-dialog__footer {
  padding: 0px;
}
</style>