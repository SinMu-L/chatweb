import { createRouter, createWebHistory } from "vue-router"
import routes from "./routers.js"
import {store} from '../store.js'
var router = createRouter({
    history: createWebHistory(),
    routes
})


router.afterEach((to, from, next)=>{
    if(to.matched.length <= 0){
        console.log('未匹配')
        router.replace('/')
        return false
    }else{
        // 是否是 /chat/xxx
        // 是的话就需要判断 uuid 是否存在，不存在就跳转到404，否则就继续跳转路由
        if(to.fullPath.indexOf('/chat/')> -1){
            const uuid = to.params.uuid
            const index = store.chatStorage.data.sidebar.findIndex(v=>v.uuid == uuid)
            console.log('uuid:', to.params.uuid, 'index: ',index)
            if(index>-1) return true
            return router.replace('/404')

        }else{
            return true
        }

    }
    return true
})

export default router