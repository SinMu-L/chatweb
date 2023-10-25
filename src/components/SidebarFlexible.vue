<script>
import ChatItem from "./ChatItem.vue";
import User from "./User.vue";
import { store } from '../store';
import { nextTick } from 'vue'
import MainArea from "./MainArea.vue";
import router from '../routes/index.js';

export default {
    data() {
        return {
            ChatItemData: [],
            store,
        }
    },
    components: {
        ChatItem,
        User
    },
    methods: {
        sidebarFlex(e) {
            // return false
            store.isShow = !store.isShow
        },
        popChaItemData(idx) {
            console.log('要删除的索引值',idx)
            // TODO 无法正常删除
            
            if (store.chatStorage.data.chat.length > 0) {
                const index = store.chatStorage.data.chat.findIndex(v => v.uuid == idx)
                console.log('index:',index, 'store:', store.chatStorage.data.chat[0])
                store.chatStorage.data.chat.splice(index,1)
                // this.ChatItemData.splice(index, 1)
                console.log('删除。。')
                if(store.chatStorage.data.chat.length > 0){
                    console.log('跳转1234124:',store.chatStorage.data.chat[1].uuid )
                    this.$router.replace(`/chat/`)
                    // this.$router.replace
                }else{
                    console.log('跳转: /' )
                    this.$router.replace('/chat/')
                }
            } else {
                console.log('列表最少保留一个')
            }
        },
        enableEditChatItem(index) {
            this.ChatItemData[index - 1]['enEdit'] = !this.ChatItemData[index - 1]['enEdit']
        },
        addChatItem() {
            const idx = this.randomUuid()
            console.log(idx)

            store.chatStorage.data.chat.push({
                uuid: idx,
                data: [{
                    "time": "",
                    "msg": "new Chat " + idx,
                    "role": "AI",
                    "msgReload": false
                }],
                title: 'New Chat',
                enEdit: false
            })
            this.$router.push(`/chat/${idx}`)
        },
        randomUuid(){
            const len = 6;
            var index = '';
            for(let i=0;i < len; i++){

                var t = Math.floor(Math.random() * 10) // [0, 10)
                index += t
            }
            return Number(index)
        }
    }
}
</script>

<template>
    <div class="left relative w-1/5 px-2 h-full border flex flex-col " v-show="store.isShow">
        <div class=" basis-1/12">
            <div @click="addChatItem"
                class=" m-2 py-2 px-6 border rounded-md border-gray-300 border-dotted font-medium flex justify-center items-center hover:bg-gray-300 hover:border-5 hover:border-gray-600/5">
                新建聊天</div>
        </div>
        <div class="basis-10/12 overflow-auto ">

            <ChatItem v-for="(chat, index) in store.chatStorage.data.chat" :key="index" :idx="chat['uuid']" v-model:content="chat['title']"
                :disabled="chat['enEdit']" @del="popChaItemData" @enableEdit="enableEditChatItem"></ChatItem>


        </div>
        <div class="basis-1/12 mt-4">
            <User></User>
        </div>

    </div>
    <span @click="sidebarFlex">
        <i class="iconfont icon-left-btn  absolute top-1/2 left-1/5"></i>
    </span>
</template>

