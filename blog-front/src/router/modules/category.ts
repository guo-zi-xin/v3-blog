import type { RouteRecordRaw } from 'vue-router'

const categoryRoutes: RouteRecordRaw[] = [
  {
    path: '/category',
    name: '分类',
    component: () => import('@/views/category/index.vue')
  }
]

export default categoryRoutes