import { RouteRecord } from '@/router/type'
import BasicLayout from "@/components/layouts/BasicLayout.vue";
import { AlignCenter } from '@vicons/tabler'

const categoryRoutes: RouteRecord[] = [
  {
    path: '/category',
    name: '分类',
    component: BasicLayout,
    meta: {
      icon: AlignCenter,
    },
    children: [
      {
        path: '/category/front',
        name: '前端',
        component: () => import('@/views/category/front/index.vue'),
        meta: {
          icon: AlignCenter,
        }
      },
      {
        path: '/category/server',
        name: '后端',
        component: () => import('@/views/category/server/index.vue'),
        meta: {
          icon: AlignCenter,
        }
      }
    ]
  }
]

export default categoryRoutes