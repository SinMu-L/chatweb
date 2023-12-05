<script setup>
import { NSpin, NInput, NButton, NInputGroup } from 'naive-ui'
import { useChatlistStore } from '../stores/chatlist'
import { useMessage } from 'naive-ui'
import { useRouter, useRoute } from 'vue-router'
import { nextTick, ref } from 'vue'

// 存储编辑的内容
var content = ref("")
const chatlist = useChatlistStore()
const route = useRoute()
const router = useRouter()
const message = useMessage()

function is_chat() {
    return route.name == 'chat'
}

// 获取消息列表
function getMessageList() {
    try {
        return chatlist.getMessageList(route.params.uuid)
    } catch (e) {
        router.push({ name: "home" })
        // message.warning(e.message)
        return false
    }
}

// 发送消息
function send_msg() {
    var uuid = route.params.uuid
    if (uuid == undefined) {
        message.error('uuid获取失败')
        return false
    }
    chatlist.addMessageListItem(uuid, `${content.value}`, true)
    // 对接AI
    chatlist.addMessageListItem(uuid, content.value, false)
    content.value = ""
    // 默认滑动到最底部

    // 我处理过类似的问题。我从网络套接字接收一个值并将其放入聊天框中。每当我使用scrollTop/Height时，它总是滚动到下一条消息（稍微偏离一点）。即使我输入最大值或非常高的值，它也不会一直滚动。
    // 发生这种情况是因为容器的尺寸（带有添加的物品）尚未达到我们的预期。一个简单的超时就可以解决这个问题
    // https://stackoverflow.com/questions/49137100/scrolltop-js-and-jquery-version-wont-scroll-all-the-way-to-the-bottom
    nextTick(() => {
        const e = document.getElementById("msglist")
        e.scrollTop = e.scrollHeight
    })

}
</script>

<template>
    <div v-if="is_chat()" class="flex flex-col h-full ">
        <!-- 消息框 -->
        <div id="msglist" class="overflow-auto basis-11/12  p-4 flex flex-col  ">
            <div v-for="(msg, index) in getMessageList()" :key="index" class=" flex flex-col mt-8  msgItem px-4">

                <div :class="msg.reversion ? 'flex-row-reverse' : 'flex-row'" class=" flex justify-start items-center h-10">
                    <img class=" rounded-full h-10 w-10" src="/avatar.jpg" alt="">
                    <span class="ml-4 text-sm">{{ msg.create_time }}</span>
                </div>
                <div class="flex  " :class="msg.reversion ? 'flex-row-reverse' : 'flex-row'">
                    <div
                        class="bg-blue-200 dark:bg-white dark:text-black w-auto max-w-[80%] min-w-[1%] break-words overflow-ellipsis rounded-sm p-2 my-1">
                        <n-spin v-if="msg.msgload" size="small" stroke="red" />

                        <div v-else> {{ msg.content }}</div>
                    </div>

                </div>
            </div>
        </div>

        <!-- 底部输入框 -->
        <div class=" basis-1/12  px-4 bg-red-100 ">
            <n-input-group class=" w-full  ">
                <n-input :style="{ width: '100%' }" />
                <n-button type="primary" ghost  @click="send_msg">
                    搜索
                </n-button>
                <!-- <n-input v-model:value="content" placeholder="自动调整尺寸" />
                <n-button type="primary" ghost class="h-4" @click="send_msg">
                    搜索
                </n-button> -->
            </n-input-group>
        </div>
    </div>
    <div v-else class="flex flex-col h-full items-center ">
        <h1>welcom to here</h1>
    </div>
</template>