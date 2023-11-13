import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia'
import App from './App.vue'


// 创建vue实例
const app = createApp(App);
// 引入pinia
const pinia = createPinia()

app.use(pinia)
// 挂载实例
app.mount('#app')
