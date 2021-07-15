<template>
  <div class="login_container">
    <div class="login_box">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {

    };
  },
  methods: {

  }
}
</script>


<style lang="less" scoped>
// scoped当前组件生效
.login_container{
  height: 100%;
  background-color: rgb(46, 58, 51);
}
.login_box{
  position: absolute;
  left: 50%;
  top: 50%;
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  transform: translate(-50%,-50%);
}
</style>