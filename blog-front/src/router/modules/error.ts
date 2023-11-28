import type { RouteRecordRaw } from 'vue-router'

const errorRoutes: RouteRecordRaw[] = [
  // 403 页面禁止访问
  {
    path: '/403',
    name: 'NotForbidden',
    meta: {
      title: 'Page Not Forbidden'
    },
    component: () => import('@/views/error/403.vue')
  },

  // 404 页面不存在
  {
    path: '/404',
    name: 'NotFound',
    meta: {
      title: 'Page Not Found'
    },
    component: () => import('@/views/error/404.vue')
  },
  // 500 服务器错误
  {
    path: '/500',
    name: 'ServerError',
    meta: {
      title: 'Server Error'
    },
    component: () => import('@/views/error/500.vue')
  },
   // 所有未匹配的路由都会跳转到404页面
   {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
   }
]

export default errorRoutes