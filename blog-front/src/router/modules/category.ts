import { RouteRecord } from '@/router/type'
import BasicLayout from "@/components/layouts/BasicLayout.vue";
import { AlignCenter } from '@vicons/tabler'
import { MenuBookRound, CameraAltOutlined } from '@vicons/material'

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
        path: '/category/essay',
        name: '随笔',
        component: () => import('@/views/category/essay/index.vue'),
        meta: {
          icon: MenuBookRound,
        }
      },
      {
        path: '/category/life',
        name: '生活',
        component: () => import('@/views/category/life/index.vue'),
        meta: {
          icon: CameraAltOutlined,
        }
      }
    ]
  }
]

export default categoryRoutes