import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Shell from '../modules/domain/shell/views/Shell.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/:en-US',
  },
  {
    path: '/:locale',
    component: Shell,
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
