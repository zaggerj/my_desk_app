import { createApp } from 'vue'

import App from './App.vue'
import 'animate.css'
import { createPinia } from 'pinia'
import { registerStore } from '@/pinia'
import router from '@/router'
import '@/router/permission'
import 'element-plus/theme-chalk/dark/css-vars.css'
const app = createApp(App)
app.use(router)
app.use(createPinia())
// 这里是进行一个注册，不然的话页面上是拿不到值的
registerStore()

app.mount('#app')
