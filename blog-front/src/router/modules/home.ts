import BasicLayout from "@/components/layouts/BasicLayout.vue";
import { SmartHome } from '@vicons/tabler'
import type { RouteRecord } from '@/router/type'

const homeRoutes: RouteRecord[] = [
  {
    path: '/home',
    component: BasicLayout,
    children: [
      {
        path: '/home',
        name: '首页',
        component: () => import('@/views/home/index.vue'),
        meta: {
          icon: SmartHome,
        }
      },
    ]
  }
]

export default homeRoutes