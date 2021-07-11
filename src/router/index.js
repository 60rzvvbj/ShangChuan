import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'Home',
    component: () => import('views/home/Home.vue')
  },
  {
    path: '/home',
    redirect: '/'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('views/login/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
