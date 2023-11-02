import { createRouter, createWebHistory, createWebHashHistory } from "vue-router"
import routes from "./routers.js"
var router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router