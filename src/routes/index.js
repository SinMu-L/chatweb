import { createRouter, createWebHistory, createWebHashHistory } from "vue-router"
import routes from "./routers.js"
import {store} from '../store.js'
var router = createRouter({
    history: createWebHashHistory(),
    routes,
})
router.afterEach((to, from, next)=>{
    if(to.matched.length <= 0){
        console.log('未匹配')
        router.push('/')
        return false
    }else{
        // 是否是 /chat/xxx
        // 是的话就需要判断 uuid 是否存在，不存在就跳转到404，否则就继续跳转路由
        if(to.fullPath.indexOf('/chat/')> -1){
            const uuid = to.params.uuid
            const index = store.chatStorage.sidebar.findIndex(v=>v.uuid == uuid)
            if(index>-1) return true
            return router.push('/')

        }else{
            if(store.chatStorage.sidebar.length > 0 ){
                return router.push({name: 'chat', params:{uuid: store.chatStorage.sidebar[0].uuid}})
            }
            return true
        }

    }
    return true
})

export default router