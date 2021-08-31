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
  },
  {
    path: '/course',
    name: 'Course',
    component: () => import('views/course/Course.vue')
  },
  {
    path: '/changePd',
    name: 'ChangePd',
    component: () => import('views/changePd/ChangePd.vue')
  },
  {
    path: '/download',
    name: 'Download',
    component: () => import('views/download/Download.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('views/test/Test.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});


// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from代表从哪个路径的跳转而来
  // next是一个函数，表示放行
  // next() 放行 next('/login')强制跳转
  if (to.path === '/login') {
    return next();
  }
  // 获取token
  const tokenStr = tool.getCookie('token');
  // 强制跳转
  if (!tokenStr) return next('/login');
  next();
})

export default router;
