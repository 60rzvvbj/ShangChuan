import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    course: {},
    user: {
      username: 'aaa'
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
