<template>
  <el-dialog
    custom-class="addWorkBox"
    :title="title"
    :visible.sync="status"
    center
    :show-close="false"
  >
    <div>
      <div class="left">作业名称：</div>
      <div class="right">
        <el-input v-model="workName" placeholder="请输入作业名称"></el-input>
      </div>
    </div>
    <div>
      <div class="left">截止时间：</div>
      <div class="right">
        <el-date-picker v-model="ddl" type="datetime" placeholder="请选择截止时间" format="MM-dd HH:mm"></el-date-picker>
      </div>
    </div>
    <div>
      <div class="left">文件格式：</div>
      <div class="right">
        <el-autocomplete
          v-model="workFormat"
          placeholder="请输入文件格式"
          :trigger-on-focus="false"
          :fetch-suggestions="inputProposal"
          @select="selectEvent"
        ></el-autocomplete>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">确 定</el-button>
      <el-button @click="close">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ElementUI from 'plugins/ElementUI.js';

export default {
  data () {
    return {
      nowDV: null,
      status: false,
      workName: '',
      ddl: null,
      workFormat: '',
      named: [
        {
          name: '学号'
        },
        {
          name: '姓名'
        }
      ]
    }
  },
  props: [
    'title',
    'defaultValue',
  ],
  components:
  {
    ...ElementUI,
  },
  methods: {
    init () {
      if (this.nowDV) {
        if (this.nowDV.workName != undefined) {
          this.workName = this.nowDV.workName;
        }
        if (this.nowDV.ddl != undefined) {
          this.ddl = this.nowDV.ddl;
        }
        if (this.nowDV.workFormat != undefined) {
          this.workFormat = this.nowDV.workFormat;
        }
        if (this.nowDV.named != undefined) {
          this.named = this.nowDV.named;
        }
      }
    },
    show () {
      this.status = true;
    },
    close () {
      this.init();
      this.status = false;
    },
    // 提交处理函数
    submit () {
      this.status = false; // 关闭显示

      this.nowDV.workName = this.workName;
      this.nowDV.ddl = this.ddl;
      this.nowDV.workFormat = this.workFormat;
      this.nowDV.named = this.named;

      // 提交到父组件
      this.$emit('submit', {
        workName: this.workName,
        ddl: this.ddl.getTime(),
        workFormat: this.workFormat,
      });
    },
    inputProposal (inputContent, callback) {
      if (inputContent.endsWith('$')) {
        let resArr = [];
        for (let namedItem of this.named) {
          resArr.push({ value: inputContent + '{' + namedItem.name + '}' });
        }
        callback(resArr);
      } else {
        callback([]);
      }
    },
    selectEvent (item) {
    }
  },
  mounted () {
    this.nowDV = this.defaultValue;
    this.init();
  }
}
</script>

<style scoped>
@import url("~element-ui/lib/theme-chalk/index.css");
</style>
<style>
.el-dialog__wrapper .addWorkBox {
  --itemHeight: 40px;
}

.el-dialog__wrapper .addWorkBox {
  width: 600px;
  border-radius: 10px;
  /* background-color: #f00; */
}

.el-dialog__wrapper .addWorkBox > .el-dialog__header {
  padding: 30px 0px;
}

.el-dialog__wrapper .addWorkBox .el-dialog__title {
  font-size: 24px;
  font-weight: 700;
  color: #000;
}

.el-dialog__wrapper .addWorkBox > .el-dialog__body {
  padding: 0px 60px;
}

.el-dialog__wrapper .addWorkBox > .el-dialog__body > div {
  display: flex;
  flex-flow: row nowrap;
  height: var(--itemHeight);
  margin-bottom: 30px;
}

.el-dialog__wrapper .addWorkBox > .el-dialog__body > div:last-child {
  margin-bottom: 0px;
}

.el-dialog__wrapper .addWorkBox > .el-dialog__body > div > .left {
  font-size: 18px;
  line-height: var(--itemHeight);
  color: #000;
}

.el-dialog__wrapper .addWorkBox > .el-dialog__body > div > .right {
  flex: 1;
}

.el-dialog__wrapper .addWorkBox > .el-dialog__body > div > .right > * {
  width: 100%;
}

.el-dialog__wrapper .addWorkBox .el-date-editor .el-input__inner {
  padding-left: 15px;
}

.el-dialog__wrapper .addWorkBox .el-date-editor .el-input__prefix {
  display: none;
}

.el-dialog__wrapper .addWorkBox > .el-dialog__footer {
  padding: 30px;
}
</style>