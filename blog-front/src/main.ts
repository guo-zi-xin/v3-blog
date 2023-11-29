import { createApp } from 'vue'

import { useRouter } from '@/router'
import { useStore } from '@/store'
import App from './App.vue'

import { SvgIconPlugin } from "@/components/SvgIcon";

import "virtual:svg-icons-register"; // 支持svg

// UnoCSS

import 'uno.css'

import '@/styles/index.scss'

// 创建vue实例
const app = createApp(App);

// 挂载路由
useRouter(app)

// 挂载pinia(vuex)
useStore(app)

// 挂载svg组件
app.use(SvgIconPlugin)

// 挂载实例
app.mount('#app')
