import type { RouteRecord } from '@/router/type'

const errorRoutes: RouteRecord[] = [
  // 403 页面禁止访问
  {
    path: '/403',
    name: 'NotForbidden',
    meta: {
      title: 'Page Not Forbidden',
      hidden:true
    },
    component: () => import('@/views/error/403.vue')
  },

  // 404 页面不存在
  {
    path: '/404',
    name: 'NotFound',
    meta: {
      title: 'Page Not Found',
      hidden:true
    },
    component: () => import('@/views/error/404.vue')
  },
  // 500 服务器错误
  {
    path: '/500',
    name: 'ServerError',
    meta: {
      title: 'Server Error',
      hidden:true
    },
    component: () => import('@/views/error/500.vue')
  },
   // 所有未匹配的路由都会跳转到404页面
   {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: {
      hidden: true
    }
   }
]

export default errorRoutes