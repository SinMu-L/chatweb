<script setup>
import { NInput, NIcon, NButton } from 'naive-ui'
import { CashOutline, ChatboxEllipsesOutline } from '@vicons/ionicons5'
import { Edit, Delete } from '@vicons/carbon'
import { useChatlistStore } from '../stores/chatlist'

import { useRouter, useRoute } from 'vue-router'

const chatlist = useChatlistStore()
const router = useRouter()
const route = useRoute()



</script>

<template>
    <div v-for="item in chatlist.get()" :key="item.uuid">
        <router-link :to="'/chat/' + item.uuid"
            class=" h-12 px-2 my-2 mx-2 border rounded-lg flex flex-row justify-start items-center ">
            <div class="   mx-2 flex justify-center items-center"><n-icon :component="ChatboxEllipsesOutline" size="18"
                    :depth="1" /></div>
            <div class=" w-full flex flex-row justify-between items-center">
                <div v-if="item.disabled" class="flex justify-start items-center pl-3 h-full w-full"> {{ item.content }}
                </div>
                <n-input v-else v-model:value="item.content" type="text" :disabled="item.disabled"
                    class=" border-transparent chat-input-bg" @keyup.enter="chatlist.enable(item.uuid)" />
                    
                <div class=" flex flex-row" :class="route.params.uuid != item.uuid ? 'hidden' : ''">
                    <n-icon class="mx-2" :component="Edit" size="18" :depth="1" @click="chatlist.enable(item.uuid)" />
                    <n-icon :component="Delete" size="18" :depth="1" @click="chatlist.delete(item.uuid)" />
                </div>
            </div>
        </router-link>

    </div>
</template>

<style scoped>
.chat-input-bg {
    background-color: white;

    color: #18a058;
}

.router-link-active {
    border-color: #18a058;
    color: #18a058;
}
</style>