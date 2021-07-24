<template>
  <div class="download">
    <Header></Header>
    <div class="table_box">
      <div class="down_til">下载作业</div>
      <el-table
        class="down_table"
        ref="handinTable"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="55"></el-table-column>
        <el-table-column label="学号" width="120">
          <template slot-scope="scope">{{ scope.row.num }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="address" label="文件" show-overflow-tooltip></el-table-column>
      </el-table>
      <div class="btn_box">
        <el-button class="btn">下载</el-button>
        <el-button class="btn" @click="toggleSelection()">取消选择</el-button>
      </div>
    </div>
    <div class="nullbox"></div>
  </div>
</template>

<script>
import Header from 'components/content/Header';
import ElementUI from 'plugins/ElementUI';

export default {
  data () {
    return {
      tableData: [{
        num: '191543105',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        num: '191543105',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        num: '191543105',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        num: '191543105',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        num: '191543105',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        num: '191543105',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        num: '191543105',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: []
    }
  }, methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.handinTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.handinTable.clearSelection();
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    }
  },
  components: {
    Header,
    ...ElementUI
  }
}
</script>

<style lang="less" scoped>
@import url("~element-ui/lib/theme-chalk/index.css");
.download {
  --baseWidth: 1280px;
  background-color: #f0f4f7;
}
// 表格盒子
.table_box {
  margin: 30px auto;
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
  margin: auto;
}
// 按钮盒子
.btn_box {
  text-align: center;
  margin: 30px 0;
}
// 空盒子
.nullbox {
  width: 100%;
  height: 30px;
}
</style>