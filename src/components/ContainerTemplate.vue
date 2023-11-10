<script setup>
import { NButton, NInput, NIcon, NButtonGroup, NSpin, NInputGroup } from 'naive-ui'
import { GameControllerOutline, GameController } from '@vicons/ionicons5'
import { LogInOutline as LogInIcon, SettingsOutline } from '@vicons/ionicons5'
import { Edit, Delete } from '@vicons/carbon'
import Markdown from 'vue3-markdown-it';

import { reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

var setting = reactive({
    model: 'gpt-3.5-turbo',
    Temperatures: 0.8,
    Top_p: 1
})
var input_area_value = ref('')
var left_data = reactive({
    left_list: [
        { uuid: 1, title: 'New Chat1', enable_edit: false },
        { uuid: 2, title: 'New Chat2', enable_edit: false },
    ],
    chat: [
        {
            uuid: 1, msg_list: [
                { content: 'hello1', create_time: '2023-11-09 11:50:23', reversion: false, msgload: false },
            ]
        },
        {
            uuid: 2, msg_list: [
                { content: 'xxx', create_time: '2023-11-09 11:50:23', reversion: false, msgload: false },
            ]
        },
    ]

})



function editLeftListEle(uuid) {
    var index = left_data.left_list.findIndex(v => v.uuid == uuid)
    left_data.left_list[index].enable_edit = !left_data.left_list[index].enable_edit
}

function delLeftListEle(uuid) {
    var index = left_data.left_list.findIndex(v => v.uuid == uuid)
    left_data.left_list.splice(index, 1)
}

function addLeftListEle() {
    const uuid = randomUuid()
    left_data.left_list.push({
        uuid: uuid,
        title: `New Chat${uuid}`,
        enable_edit: false
    })
}

function randomUuid() {
    var len = 9
    var uuid = '';
    for (let i = 0; i < len; i++) {
        uuid += Math.floor(Math.random() * 10)
    }
    return Number(uuid, 10)
}

function submit(index) {
    editLeftListEle(index)
}

function getMsgList(uuid) {
    if (uuid) {
        var index = left_data.chat.findIndex(v => v.uuid == uuid)
        return left_data.chat[index].msg_list
    } else {
        return []
    }

}

function addMessageListItem(uuid) {
    var index = left_data.chat.findIndex(v => v.uuid == uuid)
    const now_t = (new Date()).toLocaleString('sv-SE', { "timeZone": "PRC" })
    left_data.chat[index].msg_list.push({
        content: input_area_value.value,
        create_time: now_t,
        reversion: true,
        msgload: false
    })
    input_area_value.value = ''
    var ele = document.getElementById("msgArea")
    ele.scrollTop = ele.scrollHeight + ele.offsetHeight
    left_data.chat[index].msg_list.push({
        content: '',
        create_time: now_t,
        reversion: false,
        msgload: true
    })
    startStream(index)
}

function buildMessagePromt(index) {
    const res = []
    left_data.chat[index].msg_list.forEach(v => {
        let role = v.reversion ? 'user' : 'assistant'
        res.push({
            role: role,
            content: v.content
        })
    })
    return res
}

async function startStream(index) {
    const url = import.meta.env.VITE_AI_BASE_URL;
    const key = import.meta.env.VITE_AI_KEY
    const response = await fetch(url, {
        "method": "POST",
        "headers": {
            Authorization: `Bearer ${key}`
        },
        "mode": "cors",
        "body": JSON.stringify({
            model: setting.model,
            messages: buildMessagePromt(index),
            temperature: setting.Temperatures,
            top_p: setting.Top_p,
            stream: true,
        })
    });

    const reader = response.body.getReader();
    let buffer = ''; // 用于缓存数据块

    const readStream = async () => {
        left_data.chat[index].msg_list[left_data.chat[index].msg_list.length - 1].msgload = false
        const { done, value } = await reader.read();

        if (done) {
            console.log('Stream reading complete');
            // left_data.chat[index].msg_list[left_data.chat[index].msg_list.length - 1].msgload = false

            return;
        }

        const chunk = new TextDecoder('utf-8').decode(value);
        buffer += chunk; // 将数据块追加到缓冲区中

        // 检查缓冲区中是否有完整的数据
        let completeData = '';
        let separatorIndex;
        while ((separatorIndex = buffer.indexOf('\n')) !== -1) {
            completeData = buffer.slice(0, separatorIndex); // 提取完整的数据
            buffer = buffer.slice(separatorIndex + 1); // 更新缓冲区，去掉已处理的数据

            // 解析JSON数据
            const res = completeData.split(": ")[1]
            let data;
            try {
                data = JSON.parse(res);
                // 这里处理业务逻辑
                const delta_content = data.choices[0].delta.content

                left_data.chat[index].msg_list[left_data.chat[index].msg_list.length - 1].content += delta_content
            } catch (e) {
                // console.error('Error parsing JSON:', e);
                continue
            }
        }

        return readStream();
    }

    // 开始处理流数据
    return readStream();
}

</script>

<template>
    <div class=" grid grid-cols-12 h-full">
        <div class=" col-span-2 h-full relative">
            <div class=" flex flex-col h-screen border ">
                <!-- 新建按钮 -->
                <div class=" basis-1/12   flex justify-center items-center">
                    <n-button class=" w-4/5" @click="addLeftListEle">New Chat</n-button>
                </div>
                <!-- 列表 -->

                <div class="basis-10/12  overflow-auto border  ">

                    <div v-for=" item in left_data.left_list" :key="item.uuid">
                        <!-- 侧边栏输入框 -->
                        <router-link :to="`/chat/${item.uuid}`" class="m-2 flex flex-row justify-between items-center 
                        border border-gray-400  rounded-md p-2  ">

                            <div class=" w-4/5 flex items-center">
                                <n-icon size="medium">
                                    <game-controller-outline />
                                </n-icon>
                                <div class=" truncate mx-2">
                                    <p v-if="!item.enable_edit" class=" truncate h-full">{{ item.title }}</p>
                                    <n-input v-else type="text" size="small" class=" h-full " :hidden="false"
                                        v-model:value="item.title" @keyup.enter="submit(item.uuid)"></n-input>
                                </div>
                            </div>
                            <div class="w-1/5 flex justify-center items-center "
                                :class="route.params.uuid != item.uuid ? 'hidden' : ''">
                                <n-button-group size="small" :vertical="false" :hidden="false">
                                    <n-button text size="" @click="editLeftListEle(item.uuid)">
                                        <n-icon>
                                            <Edit />
                                        </n-icon>
                                    </n-button>
                                    <n-button text @click="delLeftListEle(item.uuid)">
                                        <n-icon>
                                            <Delete />
                                        </n-icon>
                                    </n-button>

                                </n-button-group>
                            </div>
                        </router-link>
                    </div>


                </div>
                <!-- 设置页面 -->
                <div class="basis-1/12 flex justify-start items-center h-full ">
                    <!-- 头像 -->
                    <div class=" w-1/4  flex justify-center items-center">
                        <img class=" rounded-full h-10 w-10" src="../assets/icon.jpg" alt="">
                    </div>
                    <!-- 简介 -->
                    <div class=" w-2/4  h-full grid grid-rows-2">
                        <div class=" flex justify-start items-end font-bold">
                            DaShuaiqi Li
                        </div>
                        <div class=" text-xs">
                            Start On <a class=" text-blue-400" href="https://github.com">Github</a>
                        </div>
                    </div>
                    <!-- 设置 -->
                    <div class=" w-1/4  h-full flex justify-center items-center">
                        <n-icon>
                            <SettingsOutline></SettingsOutline>
                        </n-icon>
                    </div>

                </div>
            </div>
        </div>
        <div class=" col-span-10 ">
            <div class="flex flex-col h-screen">
                <!-- 这里是IM区域 -->
                <div class=" basis-11/12 w-full p-12 overflow-auto" id="msgArea">
                    <div v-for="(msglist, index) in getMsgList(route.params.uuid)" :key="index"
                        class=" flex flex-col mt-1  ">
                        <div :class="msglist.reversion ? 'flex-row-reverse' : 'flex-row'"
                            class=" flex justify-start items-center h-10">
                            <img class=" rounded-full h-10 w-10" src="../assets/icon.jpg" alt="">
                            <span class="ml-4 text-sm">{{ msglist.create_time }}</span>
                        </div>
                        <div class="flex  " :class="msglist.reversion ? 'flex-row-reverse' : 'flex-row'">
                            <div
                                class=" bg-blue-200 w-auto max-w-[80%] min-w-[1%] break-words overflow-ellipsis rounded-sm p-2 my-1">
                                <n-spin v-if="msglist.msgload" size="small" stroke="red" />
                                <Markdown v-else :source="msglist.content" />
                            </div>

                        </div>
                    </div>


                </div>
                <div class=" basis-1/12   w-full">
                    <!-- 这里是输入框 -->
                    <div class="  p-2">
                        <n-input-group>

                            <n-input @keyup.ctrl.enter="addMessageListItem(route.params.uuid)" placeholder="自动调整尺寸"
                                v-model:value="input_area_value" type="textarea" size="tiny" :autosize="{
                                    minRows: 3,
                                    maxRows: 5
                                }" />
                            <n-button  ghost class=" h-auto " @click="addMessageListItem(route.params.uuid)" >
                                搜索
                            </n-button>
                        </n-input-group>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.router-link-active {
    border-color: #18a058;
}
</style>
