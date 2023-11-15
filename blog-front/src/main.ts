import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia'
import router from '@/router/index'
import 'css-doodle';
import App from './App.vue'


// 创建vue实例
const app = createApp(App);
// 引入pinia
const pinia = createPinia()

// 挂载pinia(vuex)
app.use(pinia)

// 挂载路由
app.use(router)

// 挂载实例
app.mount('#app')
