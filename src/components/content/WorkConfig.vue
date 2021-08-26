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
      named: [{
        attribute: 'name',
        name: '姓名',
        uuid: '',
      }, {
        attribute: 'stuId',
        name: '学号',
        uuid: '',
      }],
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
    // 提交处理函数
    submit () {
      this.status = false; // 关闭显示
      let createVariable = ''; // 创建变量的语句
      let randStrArr = [];

      // 生成每一个变量的随机字符串
      for (let namedItem of this.named) {
        while (true) {

          // 生成随机字符串
          namedItem.uuid = tool.randomString('abcdefghijklmnopqrstuvwxyz', 5);

          // 如果随机字符串不是文件格式字符串的子串且和已经出现的字符串不重复则生成完毕
          if (this.workFormat.indexOf(namedItem.uuid) == -1 && randStrArr.indexOf(namedItem.uuid) == -1) {
            randStrArr.push(namedItem.uuid);
            break;
          }
        }

        // 拼接创建变量的语句
        createVariable += 'let ' + namedItem.name + ' = \'' + namedItem.uuid + '\';\n';
      }

      // 创建变量并且根据随机字符串重设文件名格式字符串
      eval(createVariable + 'this.workFormat = `' + this.workFormat + '`;');

      // 上述方法存在用户使用的变量名不是规定的变量名时会出现 变量名 is not defind 异常的bug(待修改)
      // 不过运气不是太差的话以上代码时没有问题的

      // 提交到父组件
      this.$emit('submit', {
        workName: this.workName,
        ddl: this.ddl.getTime(),
        workFormat: this.workFormat,
        named: this.named,
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
      if (this.defaultValue.named != undefined) {
        this.named = this.defaultValue.named;
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