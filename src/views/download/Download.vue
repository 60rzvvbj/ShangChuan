<template>
  <div class="download">
    <Header></Header>
    <div class="table_box">
      <!-- 标题 -->
      <div class="titleBox">
        <div class="down_til">作业详情</div>
        <div class="workConfig" @click="addWorkShow">
          <!-- 修改 -->
          <i class="iconfont icon-xiugai"></i>
        </div>
        <div class="delete" @click=" deleteSure">×删除</div>
      </div>
       <work-config
          ref="workConfigBox"
          :title="'修改作业'"
          :defaultValue="workDefaultValue"
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
        <el-table-column　label-class-name="DisabledSelection" align="center" type="selection" width="70"></el-table-column>
        <el-table-column label="序号" type="index" width="55"
            　　align="center"></el-table-column>
        <el-table-column align="center" label="学号" width="120" prop="num">
          <!-- <template slot-scope="scope">{{ scope.row.num }}</template> -->
        </el-table-column>
        <el-table-column align="center" prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column align="center" prop="address" label="文件" show-overflow-tooltip></el-table-column>
      </el-table>
      <!-- 按钮 -->
      <div class="btn_box">
        <el-button type="primary" class="btn">下载</el-button>
        <el-button type="primary" class="btn" @click="toggleSelection()">取消选择</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from 'components/content/Header';
import WorkConfig from 'components/content/WorkConfig';
import ElementUI from 'plugins/ElementUI';
import { getWorkList } from'network/Download'
const message = ElementUI.Message;
const messageBox = ElementUI.MessageBox;

export default {
  data () {
    return {
      workDefaultValue: {
        workName: 'nnn',
        ddl: new Date(),
        workFormat: 'xxx',
      },
      tableData: [ {
        num: '191543105',
        name: '张三',
        address: 'xxxxxxxxxxxxxxx'
      }, {
        num: '191543105',
        name: '李四',
        address: 'xxxxxxxxxxxx'
      }],
      multipleSelection: []
    }
  }, methods: {
    // 修改盒子
    addWorkShow () {
      this.$refs.workConfigBox.show();
    },
    // 取消选择
    toggleSelection (rows) {
      this.$refs.handinTable.clearSelection();
    },
    // 选中事件
    handleSelectionChange (val) {
      this.multipleSelection = val;
      console.log(val);
    },
    //点击行触发，选中或不选中复选框
    handleRowClick (row, column, event) {
      this.$refs.handinTable.toggleRowSelection(row);
    },
    // 删除确认
    deleteSure() {
        messageBox.confirm('此操作将永久删除该作业, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          message.success('删除成功')
        }).catch(() => {
          message.info('已取消删除')        
        });
      } 
  },
  components: {
    Header,
    WorkConfig,
    ...ElementUI
  },
  created(){
     const { data: res } = getWorkList({token: tool.getCookie('token'),workId:this.$route.query.workId});
       console.log(res);
      console.log(this.$route.query.workId);
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
.titleBox{
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
//修改
.workConfig{
  padding-top: 20px;
}
.workConfig i{
  color: rgb(182, 179, 179);
  font-size: 50px;
  cursor: pointer;
}
.workConfig i:hover{
  color: #000;
}
// 删除
.delete{
  padding-top: 7px;
  margin: 30px 10px;
  font-size: 14.5px;
  letter-spacing: 1px;
  color: rgb(182, 179, 179);
  cursor: pointer;
}
.delete:hover{
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
.el-table /deep/.DisabledSelection .cell .el-checkbox__inner{
	  margin-left: 20px;
	  position:relative;
	}
.el-table /deep/.DisabledSelection .cell:before{
	  content:"all";
	  position:absolute;
	  left:15px;
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
</style>