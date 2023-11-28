import type { RouteRecordRaw } from 'vue-router'

const homeRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: '首页',
    component: () => import('@/views/home/index.vue')
  }
]

export default homeRoutes