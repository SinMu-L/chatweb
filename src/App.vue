<script setup>
import { ref, watchEffect } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import {NMessageProvider, NIcon} from 'naive-ui'
import {Menu} from '@vicons/ionicons5'

import SidebarVue from './components/Sidebar.vue';

import MainVue from './components/Main.vue'
import { useChatlistStore } from './stores/chatlist'



const showSidebar = ref(true)
const chatlist = useChatlistStore()
// 监听变更
chatlist.$subscribe((mutation, state) => {
    localStorage.setItem('chatweb', chatlist.toJson())
})

// 创建响应式变量后只执行一次输出的需求
watchEffect(() => {
    console.log("创建响应式变量后只执行一次输出的需求:",chatlist.$state)
    const localStorage_data = localStorage.getItem('chatweb')
    
    const data = JSON.parse(localStorage_data)
    if(data){
      chatlist.uuid = data.uuid ? data.uuid: "",
      chatlist.chatlist = data.chatlist ? data.chatlist : [],
      chatlist.message_list = data.message_list ?  data.message_list: []
    }
})

function isShowSidebar(){
  showSidebar.value = !showSidebar.value
}

function hiddenSidebar(){
  if(!showSidebar.value){
    showSidebar.value = !showSidebar.value
  }
}

</script>

<template>
  <n-message-provider>
    <!-- 左右布局 -->
    <div class="main  grid grid-cols-5 ">
      <div class="hidden md:block md:col-span-1 border border-r-gray-300 ">
        <SidebarVue></SidebarVue>
      </div>
      <div class=" col-span-5 md:col-span-4 h-screen " @click="hiddenSidebar()">
        <MainVue></MainVue>
      </div>
    </div>
    <!-- 移动端显示 menu 图标 -->
    <div class=" h-12 w-12 text-lg absolute top-1 right-1 md:hidden" @click="isShowSidebar()">
      <n-icon :component="Menu" size="40" :depth="1" />
    </div>
    <!-- 移动端 sidebar -->
    <div v-if="!showSidebar" class=" absolute top-0 left-0 h-full w-3/5 bg-red-500 md:hidden" >
      <SidebarVue></SidebarVue>
    </div>
  </n-message-provider>
</template>

<style>
.main{
  height: 100vh;
}
</style>