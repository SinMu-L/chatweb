<script setup>
import {NButton} from 'naive-ui'
import {useChatlistStore} from '../stores/chatlist'
import Userinfo from './Userinfo.vue'
import SidebarChatList from './SidebarChatList.vue'

const chatlist = useChatlistStore()
</script>

<template>
    <div class="h-full w-full bg-white flex flex-col">
        <div class="new-chat basis-1/12 border border-b-gray-300 flex justify-center items-center">
            <n-button class="w-4/5 dark:text-white" @click="chatlist.add()">New Chat</n-button>
        </div>
        <div class="chat-list basis-10/12 overflow-auto" >
            <SidebarChatList></SidebarChatList>
        </div>
        <div class="user-info basis-1/12 flex flex-row border border-t-gray-300">
            <Userinfo></Userinfo>
        </div>
    </div>
</template>