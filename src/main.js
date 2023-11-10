import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Markdown from 'vue3-markdown-it';
import router from './routes/index.js'


const app = createApp(App)
app.use(router)
app.use(Markdown)
app.mount('#app')

