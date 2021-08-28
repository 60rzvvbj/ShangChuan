<template>
  <div class="workListBox">
    <ul class="clearfix">
      <li
        v-for="item in workList"
        :class="[item.type]"
        :style="getWorkStyle(item.index)"
        @click="clickWork(item)"
      >
        <div class="other">
          <div class="title">{{item.title}}</div>
          <div class="middle iconfont"></div>
          <div class="footer">
            <div class="date iconfont">{{item.date}}</div>
            <div class="number iconfont">{{item.number}}</div>
          </div>
        </div>
        <div class="content">
          <div class="text">{{item.name}}</div>
        </div>
      </li>
    </ul>
    <el-dialog
      custom-class="uploadBox"
      :title="nowWork.name"
      :visible.sync="uploadBoxStatus"
      center
      :show-close="false"
    >
      <el-upload
        ref="upload"
        class="upload"
        drag
        :headers="getUploadHeader()"
        :action="uploadBaseUrl + '/homework/uploadHomework'"
        :data="{stuHomeworkId: nowWork.workSubmitId}"
        :name="'file'"
        multiple
        :on-success="upLoadSeccess"
        :on-exceed="exceed"
        :auto-upload="false"
        :limit="1"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="upload">确 定</el-button>
        <el-button @click="uploadBoxStatus = false">取 消</el-button>
      </div>
    </el-dialog>
    <div style="display: none">{{id}}</div>
  </div>
</template>

<script>
import { getWorkList, uploadBaseUrl } from 'network/WorkList.js';
import { DAY } from 'common/const.js';
import { mapState, mapGetters } from 'vuex';
import ElementUI from 'plugins/ElementUI.js';

export default {
  name: 'WorkList',
  data () {
    return {
      workListReqId: undefined,
      workList: [],
      nowWork: {},
      uploadBoxStatus: false,
      uploadBaseUrl
    };
  },
  props: ['rowNum', 'type', 'id'],
  methods: {
    async loadWorkList () {
      try {
        if (this.id != this.workListReqId) {
          this.workListReqId = this.id;
        } else {
          return;
        }
        let res = await getWorkList({
          type: this.type,
          id: this.id,
          token: tool.getCookie('token')
        });
        let arr = res.data.data;
        let resArr = [];
        for (let i = 0; i < arr.length; i++) {
          resArr[i] = {
            workId: arr[i].homeworkId,
            workSubmitId: arr[i].stuHomeworkId,
            managerId: arr[i].subjectUserId,
            title: arr[i].subjectName,
            name: arr[i].homeworkName,
            type: this.getWorkType(arr[i].time, arr[i].submit),
            date: this.getDateString(arr[i].time),
            number: arr[i].number,
            index: i
          }
        }
        this.workList = resArr;
      } catch (e) {
        ElementUI.Message({
          type: 'error',
          message: e.message,
        });
      }
    },
    getWorkStyle (index) {
      let res = {};
      if (index >= this.rowNum) {
        res.marginTop = '50px';
      }
      if ((index + 1) % this.rowNum == 0) {
        res.marginRight = '0px';
      }
      return res;
    },
    getWorkType (date, submitted) {
      if (submitted) {
        return 'success';
      } else {
        if (date - Date.now() > DAY) {
          return 'normal';
        } else if (date > Date.now()) {
          return 'urgent';
        } else {
          return 'overdue';
        }
      }
    },
    getDateString (date) {
      date = parseInt(date);
      let res = '';
      let dateObj = new Date(date);
      res += dateObj.getMonth() + 1;
      res += '/';
      res += dateObj.getDate();
      res += ' ';
      res += dateObj.getHours();
      res += ':';
      res += dateObj.getMinutes();
      return res;
    },
    clickWork (work) {
      if (work.managerId == this.user.userId) {
        this.$router.push({
          path: '/download',
          query: {
            workId: work.workId,
          }
        });
      } else {
        this.uploadBoxShow(work);
      }
    },
    addNewWork (newWork) {
      let nw = { ...newWork };
      delete nw.ddl;
      delete nw.submit;
      this.workList.push({
        ...nw,
        type: this.getWorkType(newWork.ddl, newWork.submit),
        date: this.getDateString(newWork.ddl),
        index: this.workList.length,
      });
    },
    getUploadHeader () {
      return {
        token: tool.getCookie('token'),
      }
    },
    exceed (files, fileList) {
      ElementUI.Message({
        message: tool.randomData([{
          rank: 3,
          data: '只可以选择一个文件'
        }, {
          rank: 1,
          data: '已经拥有了一个，怎么还想要另一个，要专一才行'
        }]),
        type: 'error'
      });
    },
    upLoadSeccess (response, file, fileList) {
      this.$refs.upload.clearFiles();
      if (response.flag) {
        if (this.nowWork.type != 'success') {
          this.nowWork.number++;
          this.nowWork.type = this.getWorkType(this.nowWork.ddl, true);
        }
        this.uploadBoxStatus = false;
        ElementUI.Message({
          message: tool.randomData([{
            rank: 3,
            data: '上传成功'
          }, {
            rank: 1,
            data: '离梦想又进了一步呢'
          }]),
          type: 'success'
        });
      } else {
        ElementUI.Message({
          message: tool.randomData([{
            rank: 3,
            data: '上传失败'
          }, {
            rank: 1,
            data: '服务器正忙，看来天要亡你'
          }]),
          type: 'error'
        });
      }
    },
    uploadBoxShow (work) {
      if (work.type == 'overdue') {
        ElementUI.Message({
          message: tool.randomData([{
            rank: 3,
            data: '已经过期的作业不可以提交了嗷'
          }, {
            rank: 1,
            data: '都过期了，还交个屁'
          }]),
          type: 'error'
        });
        return;
      }
      this.nowWork = work;
      this.uploadBoxStatus = true;
    },
    upload () {
      this.$refs.upload.submit();
    },
  },
  components: {
    ...ElementUI,
  },
  computed: {
    ...mapState(['user']),
  },
  mounted () {
    this.loadWorkList();
  },
  updated () {
    this.loadWorkList();
  }
}
</script>

<style scoped>
@import url("~element-ui/lib/theme-chalk/index.css");
ul {
  width: 100%;
}

ul {
  --rowNumber: 5;
}

ul li {
  position: relative;
  float: left;
  width: 200px;
  height: 180px;
  border-radius: 5px;
  margin-right: 70px;
  transition: all 0.3s;
}

/* ul li:nth-child(n + 6) {
  margin-top: 50px;
}

ul li:nth-child(5n) {
  margin-right: 0px;
} */

ul li:hover {
  box-shadow: 0px 3px 5px 0px #999;
}

ul .normal {
  --darkColor: #48adfe;
  --lightColor: #eef6fe;
  --content: "\e663";
  --fontSize: 100px;
}

ul .success {
  --darkColor: #12a972;
  --lightColor: #ddfbf0;
  --content: "\e634";
  --fontSize: 70px;
}

ul .urgent {
  --darkColor: #ff7575;
  --lightColor: #feecf2;
  --content: "\e685";
  --fontSize: 70px;
}

ul .overdue {
  --darkColor: #b4b9c8;
  --lightColor: #f0f1f4;
  --content: "\e642";
  --fontSize: 90px;
}

ul li .other {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  box-shadow: 0px 0px 0px 1px var(--darkColor);
  overflow: hidden;
}

ul li .content {
  display: table;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 20px;
  text-align: center;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.3s;
}

ul li .content .text {
  display: table-cell;
  vertical-align: middle;
  cursor: pointer;
}

ul li:hover .content {
  opacity: 1;
}

ul li .title {
  height: 30px;
  box-shadow: 0px 0px 0px 1px var(--darkColor);
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  color: #fff;
  background-color: var(--darkColor);
}

ul li .middle {
  display: block;
  position: relative;
  width: 100%;
  height: calc(100% - 54px);
  background-color: var(--lightColor);
}

ul li .middle::before {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: var(--fontSize);
  color: var(--darkColor);
  transform: translate(-50%, -50%);
  content: var(--content);
}

ul li .footer {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 24px;
  border-radius: 0px 0px 5px 5px;
  padding: 0px 10px;
  box-sizing: border-box;
  color: var(--darkColor);
  background-color: var(--lightColor);
}

ul li .footer .date {
  float: left;
  font-size: 12px;
}

ul li .footer .date::before {
  font-size: 16px;
  content: "\e697  ";
}

ul li .footer .number {
  float: right;
  width: 40px;
  font-size: 12px;
}

ul li .footer .number::before {
  font-size: 16px;
  content: "\e654  ";
}
</style>

<style>
.workListBox .uploadBox {
  width: 500px;
  height: 360px;
}

.workListBox .uploadBox .upload {
  text-align: center;
}

.workListBox .el-dialog__wrapper .uploadBox {
  position: relative;
}

.workListBox .el-dialog__wrapper .uploadBox .el-dialog__body {
  position: relative;
}

.workListBox .el-dialog__wrapper .uploadBox .el-dialog__body {
  padding: 10px;
}

.workListBox .el-dialog__wrapper .uploadBox .el-dialog__footer {
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100%;
  padding: 0px 10px 20px;
}
</style>