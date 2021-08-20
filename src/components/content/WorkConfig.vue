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
        <el-input v-model="workFormat" placeholder="请输入文件格式"></el-input>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">确 定</el-button>
      <el-button @click="status = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ElementUI from 'plugins/ElementUI.js';

export default {
  data () {
    return {
      status: false,
      workName: '',
      ddl: null,
      workFormat: '',
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
    show () {
      this.status = true;
    },
    submit () {
      this.status = false;
      this.$emit('submit', {
        workName: this.workName,
        ddl: this.ddl.getTime(),
        workFormat: this.workFormat,
      });
    },
  },
  mounted () {
    if (this.defaultValue) {
      if (this.defaultValue.workName != undefined) {
        this.workName = this.defaultValue.workName;
      }
      if (this.defaultValue.ddl != undefined) {
        this.ddl = this.defaultValue.ddl;
      }
      if (this.defaultValue.workFormat != undefined) {
        this.workFormat = this.defaultValue.workFormat;
      }
    }
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