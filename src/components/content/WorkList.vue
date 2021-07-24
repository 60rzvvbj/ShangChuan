<template>
  <ul class="clearfix">
    <li v-for="item in workList" :class="[item.type]" :style="getWorkStyle(item.index)">
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
</template>

<script>
import { getWorkList } from 'network/WorkList.js';
import { DAY } from 'common/const.js';

export default {
  name: 'WorkList',
  data () {
    return {
      workList: [],
    };
  },
  props: ['rowNum'],
  methods: {
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
    }
  },
  created () {
    getWorkList({
      type: 'student',
      account: '191543105',
      token: 'token'
    }).then(data => {
      let arr = data.data.workList;
      let resArr = [];
      for (let i = 0; i < arr.length; i++) {
        resArr[i] = {
          title: arr[i].courseName,
          name: arr[i].workName,
          type: this.getWorkType(arr[i].deadline, arr[i].submitted),
          date: this.getDateString(arr[i].deadline),
          number: arr[i].submitNumber,
          index: i
        }
      }
      this.workList = resArr;
    });
  }
}
</script>

<style scoped>
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