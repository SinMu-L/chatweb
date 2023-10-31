<script>
import ChatItem from "./ChatItem.vue";
import User from "./User.vue";
import { store } from '../store';
import { NButton, NDrawer, NDrawerContent } from "naive-ui";



export default {
    data() {
        return {
            ChatItemData: [],
            store,
        }
    },
    components: {
        ChatItem,
        User,
        NButton,
        NDrawer,
        NDrawerContent
    },
    
    methods: {
        sidebarFlex(e) {
            // return false
            store.isShow = !store.isShow
        },
        popChaItemData(idx) {
            console.log('要删除的路由：', idx)

            if (store.chatStorage.data.chat.length > 0) {
                const index = store.chatStorage.data.chat.findIndex(v => v.uuid == idx)
                console.log("index:", index)
                // 删除sidebar
                store.chatStorage.data.sidebar.splice(index, 1)
                store.chatStorage.data.chat.splice(index, 1)

                console.log('删除。。')
                if (store.chatStorage.data.chat.length > 0) {
                    console.log("即将跳转的路由：", store.chatStorage.data.chat[0].uuid)
                    this.$router.replace(`/chat/${store.chatStorage.data.chat[0].uuid}`)
                } else {
                    this.$router.replace('/')
                }
            } else {
                console.log('列表最少保留一个')
            }
            return;
        },
        enableEditChatItem(uuid) {
            console.log(uuid)
            const index = store.chatStorage.data.chat.findIndex(v => v.uuid == uuid)
            // 删除sidebar
            store.chatStorage.data.sidebar[index].enEdit = !store.chatStorage.data.sidebar[index].enEdit
        },
        addChatItem() {
            
            const idx = this.randomUuid()
            store.chatStorage.data.sidebar.push({
                uuid: idx,
                title: `New Chat-${idx}`,
                enEdit: false
            })

            store.chatStorage.data.chat.push({
                uuid: idx,
                data: [{
                    "time": "",
                    "msg": "new Chat " + idx,
                    "role": "AI",
                    "msgReload": false
                }],
            })
            console.log(JSON.stringify(store.chatStorage.data.sidebar))
            this.$router.push({name:'chat', params:{uuid: idx}})


        },
        randomUuid() {

            const len = 6;
            var index = '';
            for (let i = 0; i < len; i++) {

                var t = Math.floor(Math.random() * 10) // [0, 10)
                index += t
            }
            return Number(index)
        },

        
    },
    
}
</script>

<template>
    <div class="left absolute w-4/5 bg-white  sm:relative sm:w-1/5 px-2 h-full border flex flex-col " v-show="store.isShow">
        <div class=" basis-1/12">
            <div @click="addChatItem"
                class=" m-2 py-2 px-6 border rounded-md border-gray-300 border-dotted font-medium flex justify-center items-center hover:bg-gray-300 hover:border-5 hover:border-gray-600/5">
                新建聊天</div>
        </div>
        <div class="basis-10/12 overflow-auto  ">

            <ChatItem v-for="chat in store.chatStorage.data.sidebar" :key="chat['uuid']" :idx="chat['uuid']"
                v-model:content="chat['title']" :disabled="chat['enEdit']" @del="popChaItemData"
                @enableEdit="enableEditChatItem"></ChatItem>
        </div>
        <div class="basis-1/12 mt-4">
            <User></User>
        </div>

    </div>

    <span @click="sidebarFlex">
        <div class="  absolute top-1/3 flex flex-col">
            <div class=" w-1/3   t-shaw">1</div>
            <div class=" w-1/3 font-medium ltpic-main flex justify-center items-center">{{ store.isShow ? "&lt;" : "&gt;" }}
            </div>
            <div class=" w-1/3  b-show">1 </div>

        </div>
    </span>
</template>


<style scope>
:root {
    --main-bg-color: rgb(213, 214, 216);
}

.ltpic-main {

    height: 3rem;
    width: 1rem;
    border: 1px var(--main-bg-color) solid;
    border-left-color: none;
    border-left-style: none;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    background-color: var(--main-bg-color);

    /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
    box-shadow: 2px 0px 2px -2px var(--main-bg-color);
}

.t-shaw {
    width: 1.5rem;
    height: 3rem;
    /* background-color:red; */
    border-bottom-left-radius: 50%;
    clip-path: inset(50% 50% 0 0);
    box-shadow: 0 0 0 20px var(--main-bg-color);
    color: transparent;
}

.b-show {
    width: 1.5rem;
    height: 3rem;
    border-top-left-radius: 50%;
    clip-path: inset(0 50% 50% 0);
    box-shadow: 0 0 0 50px var(--main-bg-color);
    color: transparent;
}
</style>
