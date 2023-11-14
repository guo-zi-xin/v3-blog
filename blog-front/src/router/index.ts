import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/components/layout/index.vue";
import navPage from "@/views/index.vue";

const routes = [
  {
    path: '/',
    name: 'Nav',
    meta: { title: '导航' },
    component: Layout,
  },
  {
    path: '/',
    component: Layout,
    meta: { title: 'Layout' },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: '首页',
        meta: { title: '首页' },
        component: () => import('@/views/home/index.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;