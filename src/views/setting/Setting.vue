<template>
  <div class="setting">
    <Header></Header>
    <div class="change_box"></div>
  </div>
</template>

<script>
import Header from 'components/content/Header';

export default {
  name: 'Setting',
  data () {
    return {

    };
  },
  components: {
    Header
  }
}
</script>

<style lang="less" scoped>
.setting {
  width: 100%;
  height: 100%;
  background-color: #f0f4f7;
}
.change_box {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 70%;
  height: 60%;
  transform: translate(-50%, -50%);
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  background-color: #fff;
}
</style>