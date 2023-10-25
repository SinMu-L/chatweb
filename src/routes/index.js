import { createRouter, createWebHistory } from "vue-router"
import routes from "./routers.js"
var router = createRouter({
    history: createWebHistory(),
    routes
})
export default router