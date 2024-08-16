import { createRouter, createWebHistory, createWebHashHistory } from "vue-router"
import routes from "./routers.js"
var router = createRouter({
    history: createWebHashHistory(),
    routes,
})

function init(){
    // 初始化 localstorage
    try{
        var data = JSON.parse(localStorage.getItem('chatweb'))
    }catch( e){
        // localstorage 数据不存在
        localStorage.setItem('chatweb', JSON.stringify({
            left_list: [],
            chat: [],
        }))
    }
}

function getFirstRoute(){
    try{
        const data = JSON.parse(localStorage.getItem('chatweb'))
        if(data.left_list.length == 0){
            return -1
        }
        return data.left_list[0].uuid
    }catch( e){
        return -1
    }
}

function hasRoute(uuid){
    try{
        var data = JSON.parse(localStorage.getItem('chatweb'))
    }catch( e){
        // localstorage 数据不存在
        if([1,2].indexOf(uuid) > -1){
            return true
        }
        return false
    }
    if(data !== null){

        const index = data.left_list.findIndex(v=>v.uuid == uuid)
        if(index > -1){
            return true
        }
        return false
    }else{
        return false
    }
    
}

// to: 即将要进入的目标 用一种标准化的方式
// from: 当前导航正要离开的路由 用一种标准化的方式
router.beforeEach((to, from, next) => {    
    init()
    if(to.matched.length > 0 ){
        // 若路由存在，则判断为 chat继续，否则就next
        if(to.name == 'chat'){
            // 拿到参数uuid
            var uuid = to.params.uuid
            console.log("uuid:",uuid)
            if(uuid==""){
                // /chat 的时候 uuid 为空
                next()
            }
            else if (uuid==undefined){
                // TODO 这里我忘记是啥情况下出现了
            }
            else{
                if(hasRoute(uuid)){
                    next()
                }else{
                    // uuid 不存在， 跳转到第一个chat
                    const first_chat_uuid = getFirstRoute()
                    if(first_chat_uuid==-1){
                        // 列表为空，返回404
                        router.push({name: 'not_found'})
                    }else{
                        // 获取到第一个id，跳转
                        router.push({name: 'chat', params:{"uuid":first_chat_uuid} })
                    }
                }
            }
        }
        else{
            next()
        }
    }else{
        // 路由不存在，则跳转到根目录
        router.push({name: 'not_found'})
    }


})


export default router