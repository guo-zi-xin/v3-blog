import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { useRouter } from '@/router'
import App from './App.vue'

import { SvgIconPlugin } from "@/components/SvgIcon";

import "virtual:svg-icons-register"; // 支持svg

// UnoCSS

import 'virtual:uno.css'

import '@/styles/index.css'

// 创建vue实例
const app = createApp(App);

// 挂载路由
useRouter(app)
// 引入pinia
const pinia = createPinia()

// 挂载pinia(vuex)
app.use(pinia)

// 挂载svg组件
app.use(SvgIconPlugin)

// 挂载实例
app.mount('#app')
