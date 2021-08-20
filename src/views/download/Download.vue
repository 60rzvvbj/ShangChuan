<template>
  <div class="download">
    <Header></Header>
    <div class="table_box">
      <!-- 标题 -->
      <div class="down_til">下载作业</div>
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
import ElementUI from 'plugins/ElementUI';
import { getWorkList } from'network/Download'

export default {
  data () {
    return {
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
  },
  components: {
    Header,
    ...ElementUI
  },
  created(){
      console.log(this.$store.state.course);
    
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
  position: absolute;
  left: 50%;
  top: 50%;
  height: 70%;
  transform: translate(-50%, -50%);
  width: var(--baseWidth);
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  background-color: #fff;
  box-sizing: border-box;
  overflow: hidden;
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