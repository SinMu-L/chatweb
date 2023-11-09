<script setup>
import { NButton, NInput, NIcon, NButtonGroup } from 'naive-ui'
import { GameControllerOutline, GameController } from '@vicons/ionicons5'
import { LogInOutline as LogInIcon, SettingsOutline } from '@vicons/ionicons5'
import { Edit,Delete } from '@vicons/carbon'

import { reactive } from 'vue';

var left_data = reactive({
    left_list: [
        {uuid: 1, title: 'New Chat1', enable_edit: false},
        {uuid: 2, title: 'New Chat2', enable_edit: false},
        {uuid: 3, title: 'New Chat3', enable_edit: false},
        {uuid: 4, title: 'New Chat4', enable_edit: false},
    ]
})

function editLeftListEle(uuid){
    var index = left_data.left_list.findIndex(v=>v.uuid == uuid)
    left_data.left_list[index].enable_edit = !left_data.left_list[index].enable_edit
}

function delLeftListEle(uuid){
    var index = left_data.left_list.findIndex(v=>v.uuid == uuid)
    left_data.left_list.splice(index,1)
}

function addLeftListEle(){
    const uuid = randomUuid()
    left_data.left_list.push({
        uuid: uuid,
        title: `New Chat${uuid}`,
        enable_edit: false
    })
}

function randomUuid(){
    var len = 9
    var uuid = '';
    for(let i=0;i<len;i++){
        uuid += Math.floor(Math.random() * 10  )
    }
    return Number(uuid,10)
}

function submit(index){
    editLeftListEle(index)
}

</script>

<template>
    <div class=" grid grid-cols-12 h-screen">
        <div class=" col-span-2 h-full relative">
            <div class=" flex flex-col h-screen border ">
                <!-- 新建按钮 -->
                <div class=" basis-1/12   flex justify-center items-center">
                    <n-button class=" w-4/5" @click="addLeftListEle">New Chat</n-button>
                </div>
                <!-- 列表 -->
                <div class="basis-10/12  overflow-auto border  ">
                    <div v-for=" item in left_data.left_list" :key="item.uuid" class="m-2 flex flex-row justify-between items-center 
                        border border-gray-400  rounded-md p-2  ">
                        <div class=" w-4/5   flex items-center">
                            <n-icon size="medium" >
                                <game-controller-outline />
                            </n-icon>
                            <div class=" truncate mx-2">
                                <p v-if="!item.enable_edit"  class=" truncate h-full">{{ item.title }}</p>
                                <n-input v-else type="text" size="small" 
                                class=" h-full " :hidden="false" v-model:value="item.title"
                                @keyup.enter="submit(item.uuid)" ></n-input>
                            </div>
                        </div>
                        <div class="w-1/5 flex justify-center items-center">
                            <n-button-group size="small"   :vertical="false" :hidden="false" >
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
        <div class=" col-span-10 "></div>
    </div>
</template>

