import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import './assets/icons/iconfont.css'

import router from './routes/index.js'


const app = createApp(App)
app.use(router)
app.mount('#app')

