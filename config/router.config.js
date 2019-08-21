export default [

  // user
  {
    path: '/main',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/main', redirect: '/main/index' },
      // test
      {
        path: '/main/index',
        component: './Main/personal.js',
      },
      {
        path: '/main/main',
        component: './Main/main.js',
      },
      { path: '/main/detail', component: './Main/detail.js' },
      { path: '/main/detail', name: 'Android-客户端技术类开发' },
      { path: '/main/detail', name: 'IOS-技术' },
      { path: '/main/detail', name: 'h5-前端开发池' },
      { path: '/main/detail', name: '君弘-我的' },
      { path: '/main/detail', name: '君弘-后台' },
      { path: '/main/command', component: './Main/command.js' },
    ],
  },

  // user
  {
    path: '/',
    component: '../layouts/UserLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/user/login' },
      { path: '/user/login', name: '登录', component: './User/index.js' },
    ],
  },

];
