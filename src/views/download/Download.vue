<template>
  <div class="download">
    <Header></Header>
    <div class="table_box">
      <!-- 标题 -->
      <div class="titleBox">
        <div class="down_til">作业详情</div>
        <div
          class="workConfig"
          @click="addWorkShow"
        >
          <!-- 修改 -->
          <i class="iconfont icon-xiugai"></i>修改
        </div>
        <!-- 删除 -->
        <div
          class="delete"
          @click=" deleteSure"
        ><i class="iconfont icon-shanchu1"></i>删除</div>
        <!-- 返回 -->
        <div
          class="callback"
          @click="backHistory"
        >
          <i class="iconfont icon-return"></i>
        </div>
      </div>
      <work-config
        ref="workConfigBox"
        :title="'修改作业'"
        :defaultValue="workDefaultValue"
        v-if="state == 'T'"
        @submit="addWorkSubmit"
      ></work-config>

      <!-- 表格 -->
      <el-table
        class="down_table"
        stripe
        border
        height="450"
        :header-cell-style="{background:'#F5F7FA'}"
        ref="handinTable"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
      >
        <el-table-column　label-class-name="DisabledSelection"
          align="center"
          type="selection"
          width="70"
        ></el-table-column>
        <el-table-column
          label="序号"
          type="index"
          width="55"
          　　align="center"
        ></el-table-column>
        <el-table-column
          align="center"
          label="学号"
          width="120"
          prop="stuId"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="姓名"
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="stuHomeworkName"
          label="文件"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          label="下载"
          width="120"
        >
          <!-- 作用域插槽获取当前行数据 -->
          <template slot-scope="scope"><i
              class="iconfont icon-xiazai4"
              @click="downloadOne(scope.row.stuHomeworkId,scope.row)"
            ></i></template>
        </el-table-column>
      </el-table>
      <!-- 按钮 -->
      <div class="btn_box">
        <el-button
          type="primary"
          class="btn"
          @click="downloadZip"
        >批量下载</el-button>
        <el-button
          type="primary"
          class="btn"
          @click="toggleSelection()"
        >取消选择</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from 'components/content/Header';
import WorkConfig from 'components/content/WorkConfig';
import ElementUI from 'plugins/ElementUI';
import { getWorkList, deleteWork, getWorkMessage, downloadOne, downloadZip, updateWork } from 'network/Download'
import getFileName from './fileNameUtil.js'
const message = ElementUI.Message;
const messageBox = ElementUI.MessageBox;

export default {
  data () {
    return {
      // 状态
      state: 'F',
      // 所有信息
      allMessage: {},
      // 修改作业信息
      workDefaultValue: {
        workName: 'nnn',
        ddl: new Date(),
        workFormat: 'xxx',
      },
      // 作业列表
      tableData: [],
      // 选择行对象
      multipleSelection: [],
      // id列表
      selectId: []
    }
  }, methods: {
    // 修改盒子
    addWorkShow () {
      this.$refs.workConfigBox.show();
    },
    // 取消选择
    toggleSelection () {
      this.$refs.handinTable.clearSelection();
    },
    // 选中事件
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    //点击行触发，选中或不选中复选框
    handleRowClick (row, column, event) {
      this.$refs.handinTable.toggleRowSelection(row);
    },
    //返回上一层
    backHistory () {
      this.$router.go(-1);
    },
    // 修改作业
    async addWorkSubmit (work) {
      let addRes = (await updateWork({
        token: tool.getCookie('token'),
        workName: work.workName,
        ddl: '' + work.ddl,
        workFormat: work.workFormat,
        courseId: this.allMessage.subjectId,
        workId: this.$route.query.workId,
        named: work.named
      })).data;
      if (addRes.flag) {
        message.success('修改成功')
      } else {
        message.error('修改失败')
      }
    },
    // 删除确认
    deleteSure () {
      messageBox.confirm('此操作将永久删除该作业, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 请求删除
        deleteWork({
          token: tool.getCookie('token'),
          homeworkId: this.$route.query.workId
        }).then((res) => {
          if (!res.data.flag) {
            return message.error('删除失败')
          }
          message.success('删除成功')
          // 跳转回上一页
          this.$router.go(-1);
        })
      }).catch(() => {
        message.info('已取消删除')
      });
    },
    // 过滤已交作业
    // handUpList (list) {
    //   if (list) {
    //     return list.filter(data => {
    //       return data.submit == true;
    //     })
    //   }
    // },
    // 单个下载
    downloadOne (homeWorkId, stuName) {
      messageBox.confirm('此操作将下载该作业, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 请求下载
        downloadOne({
          token: tool.getCookie('token'),
          stuHomeworkId: homeWorkId
        }).then((res) => {
          const name = stuName.stuHomeworkName;
          this.downloadFile(res.data, name);
        })
        this.toggleSelection();
      }).catch(() => {
        this.toggleSelection();
        message.info('已取消')
      });
    },
    //获取Id列表
    getIdList () {
      // 清空列表
      this.selectId = []
      this.multipleSelection.forEach(x => {
        this.selectId.push(x.stuHomeworkId)
      })
    },
    //打包下载
    downloadZip () {
      // 判断是否有选择作业
      if (this.multipleSelection.length == 0) {
        // 每次手动关闭所有弹框
        message.closeAll()
        return message.error('请选择作业')
      }
      messageBox.confirm('此操作将打包下载作业, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 请求下载
        this.getIdList();
        downloadZip({
          token: tool.getCookie('token'),
          stuHomeworkId: this.selectId
        }).then(res => {
          const name = (res.headers.filename);
          this.downloadFile(res.data, name);
        })
        this.toggleSelection();
      }).catch(() => {
        message.info('已取消')
      });

    },
    // 下载文件
    downloadFile (data, name) {
      // 文件导出
      if (!data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.download = name;

      // document.body.appendChild(link);
      link.click()
    },
    //获取初始作业信息
    async getInit () {
      //传参
      const req = {
        token: tool.getCookie('token'),
        hwID: this.$route.query.workId
      };
      let mesRes = (await getWorkMessage(req)).data;
      if (mesRes.flag) {
        const mes = mesRes.data[0];
        this.allMessage = mes;
        // 转换时间格式
        const changeTime = new Date(parseInt(mes.homeworkDeadtime));
        //赋值
        this.workDefaultValue.workName = mes.homeworkName;
        this.workDefaultValue.ddl = changeTime;
        this.workDefaultValue.workFormat = mes.homeworkNamed;
        this.state = 'T'

        // 获取作业列表
        let listRes = (await getWorkList(req)).data;
        if (listRes.flag) {
          this.tableData = listRes.data
          //生成文件名
          this.tableData.forEach(x => {
            x.stuHomeworkName = getFileName.getFileName({ stuId: x.stuId, name: x.name }, mes.homeworkNamed)
          })
        }
      }
    }
  },
  components: {
    Header,
    WorkConfig,
    ...ElementUI
  },
  created () {
    this.getInit()
  }
}
</script>

<style lang="less" scoped>
@import url("~element-ui/lib/theme-chalk/index.css");
.download {
  position: relative;
  height: 100%;
  --baseWidth: 1280px;
  background-color: #f0f4f7;
}
// 表格盒子
.table_box {
  margin: 60px auto;
  height: 70%;
  width: var(--baseWidth);
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  background-color: #fff;
  box-sizing: border-box;
  overflow: hidden;
}
// 标题盒子
.titleBox {
  display: flex;
}
// 标题
.down_til {
  position: relative;
  padding-left: 20px;
  margin: 30px 20px;
  font-size: 20px;
  font-weight: 700;
}
.down_til::before {
  position: absolute;
  content: "";
  border: solid;
  left: 0;
  top: 0;
  height: 100%;
}
// 修改删除返回
.delete,
.workConfig {
  padding-top: 7px;
  margin: 30px 5px;
  font-size: 14.5px;
  letter-spacing: 1px;
  color: rgb(182, 179, 179);
  cursor: pointer;
}
.callback {
  margin: 25px 30px 20px auto;
  size: 50px;
  color: rgb(182, 179, 179);
  cursor: pointer;
}
.callback i {
  font-size: 30px;
}
.delete:hover,
.workConfig:hover,
.callback:hover {
  color: #000;
}
// 表格
.down_table {
  width: 80%;
  height: 68% !important;
  margin: auto;
}
// deep覆盖ui样式
// 全选提示
.el-table /deep/.DisabledSelection .cell .el-checkbox__inner {
  margin-left: 20px;
  position: relative;
}
.el-table /deep/.DisabledSelection .cell:before {
  content: "all";
  position: absolute;
  left: 15px;
}
// 滚动条的宽度
/deep/ .el-table__body-wrapper::-webkit-scrollbar {
  width: 6px; // 横向滚动条
  height: 6px; // 纵向滚动条 必写
}
// 滚动条的滑块
/deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 3px;
}
// 按钮盒子
.btn_box {
  height: 50px;
  text-align: center;
  margin: 30px 0;
}
// 下载按钮
.icon-xiazai4 {
  padding: 0 10px;
  color: #ddd;
  cursor: pointer;
}
.icon-xiazai4:hover {
  color: #000;
}
</style>