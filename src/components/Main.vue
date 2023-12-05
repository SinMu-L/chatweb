<script setup>
import { NSpin, NInput, NButton, NInputGroup, NIcon } from 'naive-ui'
import { useChatlistStore } from '../stores/chatlist'
import { useMessage } from 'naive-ui'
import { useRouter, useRoute } from 'vue-router'
import { nextTick, onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { SendAlt, Delete, Download } from '@vicons/carbon'
import html2canvas from 'html2canvas'

// 存储编辑的内容
var content = ref("")
const chatlist = useChatlistStore()
const route = useRoute()
const router = useRouter()
const message = useMessage()

let messageReactive
const removeMessage = async () => {
    console.log("remove message")
    if (messageReactive) {
        messageReactive.destroy()
        messageReactive = null
    }
}


onBeforeUnmount(removeMessage)

async function createMessage() {
    if (!messageReactive) {
        console.log("create message")
        messageReactive = message.loading("正在下载", { duration: 0 })
    }
}

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
    if (content.value.length <= 0) {
        message.info('不能发送空白消息')
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

// 当前会话下载为图片
async function dom2img() {
    await createMessage()

    var ele = document.querySelectorAll(".msgItem")
    var msgAreaDom = document.getElementById("msglist")

    const width = msgAreaDom.offsetWidth * 2
    const height = msgAreaDom.scrollHeight * 1.5


    let canvas1 = document.createElement('canvas');
    let context = canvas1.getContext('2d');
    canvas1.width = width;
    canvas1.height = height;
    // 绘制矩形添加白色背景色
    context.rect(0, 0, width, height);
    context.fillStyle = "#fff";
    context.fill();

    let beforeHeight = 0
    for (let i = 0; i < ele.length; i++) {
        const dom_canvas = await html2canvas(ele[i], {
            scrollX: 0,
            scrollY: 0,
            height: ele[i].scrollHeight,
            width: ele[i].scrollWidth,
        })

        // var image = dom_canvas.toDataURL("image/png");
        context.drawImage(dom_canvas, 0, beforeHeight, dom_canvas.width, dom_canvas.height)
        beforeHeight = beforeHeight + dom_canvas.height;

    }
    var image = canvas1.toDataURL("image/png").replace("image/png", "image/octet-stream");
    var link = document.getElementById("link");
    link.setAttribute("download", `chatweb-${(new Date()).getTime()}.png`);
    link.setAttribute("href", image);
    link.click();

    await removeMessage()

    message.success('图片下载完成')

}

function deleteMsgList(){
    chatlist.deleteMessageList(route.params.uuid)
}

</script>

<template>
    <div v-if="is_chat()" class="flex flex-col h-full ">
        <!-- 消息框 -->
        <div id="msglist" class="overflow-auto basis-11/12  p-4 flex flex-col  ">
            <div v-for="(msg, index) in getMessageList()" :key="index" class=" flex flex-col mt-8  msgItem px-4 msgItem ">

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

        <a href="" id="link" class="hidden"></a>
        <!-- 底部输入框 -->
        <div class=" basis-1/12  px-12  flex flex-row">
            <div class=" basis-1/12   flex flex-row justify-around items-center px-4">
                <n-icon :component="Delete" size="18" :depth="1" @click="deleteMsgList()" />
                <n-icon :component="Download" size="18" class=" " :depth="1" @click="dom2img()" />
            </div>
            <div class=" basis-11/12 flex flex-row justify-center items-center">
                <n-input-group class=" w-full  ">
                    <n-input v-model:value="content" :style="{ width: '100%' }" type="textarea" :autosize="{
                        minRows: 1
                    }" />
                    <n-button type="primary" ghost @click="send_msg">
                        <n-icon :component="SendAlt" size="18" :depth="1" />
                    </n-button>
                </n-input-group>
            </div>
        </div>
    </div>
    <div v-else class="flex flex-col h-full items-center ">
        <h1>welcom to here</h1>
    </div>
</template>