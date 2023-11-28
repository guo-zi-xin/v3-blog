import type { RouteRecordRaw } from 'vue-router'

const rootRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    redirect: '/home',
  }
]

export default rootRoutes