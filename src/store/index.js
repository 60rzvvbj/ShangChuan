import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    course: {},
    user: {
      sno: undefined, // 学号
      userId: undefined, // 用户ID
      username: undefined, // 用户名
      account: undefined, // 账号
    },
  },
  mutations: {
    setCourse(state, course) {
      state.course = course;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {},
  modules: {}
});
