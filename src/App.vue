<script setup lang="ts">
import { ref } from 'vue'
import Menu from './components/icons/Menu.vue';
import Setting from './components/icons/Setting.vue'
import Download from './components/icons/Download.vue'
import Delete from './components/icons/Delete.vue'
import ChatItem from './components/ChatItem.vue';
import { type DrawerPlacement, NDrawer, NAvatar, NButton, NIcon } from 'naive-ui'
const active = ref(false)
const placement = ref<DrawerPlacement>('right')
const activate = (place: DrawerPlacement) => {
  console.log("===")
  active.value = true
  placement.value = place
}
</script>

<template>
  <n-drawer v-model:show="active" :width="260" :placement="placement">
    <div class="flex flex-col h-full">
      <main class="flex flex-col flex-1 min-h-0">
        <div class="p-4 flex item-center">
          <n-button class="w-full">新建聊天</n-button>
        </div>
        <div class="flex-1 min-h-0 pb-4 overflow-hidden">
          <div class="px-4">
            <div class="overflow-hidden w-full gap-2 flex flex-col text-sm">
              <div class="">
                <ChatItem></ChatItem>
              </div>
              <div class="">
                <ChatItem></ChatItem>
              </div>
              <div class="">
                <ChatItem></ChatItem>
              </div>
              <div class="">
                <ChatItem></ChatItem>
              </div>
              <div class="">
                <ChatItem></ChatItem>
              </div>
              <div class="">
                <ChatItem></ChatItem>
              </div>
              <div class="">
                <ChatItem></ChatItem>
              </div>

            </div>
          </div>
        </div>
        <div></div>
      </main>
      <footer class="flex items-center justify-between min-w-0 p-4 overflow-hidden border-t dark:border-neutral-800">
        <div class="flex-1 flex-shrink-0 overflow-hidden">
          <div class="flex items-center overflow-hidden ">
            <n-avatar round size="medium" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
            <div class="flex-1 min-w-0 ml-2">
              <h2 class="overflow-hidden font-bold text-md text-ellipsis whitespace-nowrap">DaShuaiQI Li</h2>
              <p class="overflow-hidden text-xs text-gray-500 text-ellipsis whitespace-nowrap">

                <span>Star on <a href="https://github.com/SinMu-L/chatweb" class="text-blue-500"
                    target="_blank">Github</a></span>
              </p>
            </div>
          </div>

        </div>
        <div>
          <Setting></Setting>
        </div>
      </footer>
    </div>
  </n-drawer>
  <div class="w-full h-full flex flex-col">
    <header
      class="sticky top-0 left-0 right-0 z-30 border-b dark:border-neutral-800 bg-white/80 dark:bg-black/20 backdrop-blur">
      <div class="nav w-full h-14 relative flex items-center justify-between min-w-0 overflow-hidden">
        <div class="flex item-center justify-center pl-2 font-bold" @click="activate('left')">
          <Menu></Menu>

        </div>
        <h1 class="flex-1 px-4 pr-6 overflow-hidden cursor-pointer select-none text-ellipsis whitespace-nowrap">
          New Chats
        </h1>
        <div class="flex items-center space-x-2">
          <div class="">
            <button
              class="flex items-center justify-center w-10 h-10 transition rounded-full hover:bg-neutral-100 dark:hover:bg-[#414755]">

              <Download></Download>
            </button>
          </div>
          <div class="">
            <button
              class="flex items-center justify-center w-10 h-10 transition rounded-full hover:bg-neutral-100 dark:hover:bg-[#414755]">

              <Delete></Delete>
            </button>
          </div>
        </div>
      </div>
    </header>
    <main class="flex-1 overflow-hidden">
      <RouterView></RouterView>
    </main>
    <footer class="sticky left-0 bottom-0 right-0 p-2 pr-3 overflow-hidden ">
      <div class="w-full max-w-screen-xl m-auto">
        <div class="flex items-center justify-between space-x-2">
          <div>
            <button
              class="flex items-center justify-center w-10 h-10 transition rounded-full hover:bg-neutral-100 dark:hover:bg-[#414755]"><span
                class="text-xl text-[#4b9e5f]"><svg xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class=" iconify iconify--ri"
                  width="1em" height="1em" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.956 9.956 0 0 1-4.708-1.175L2 22l1.176-5.29A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2m0 2a8 8 0 0 0-8 8c0 1.335.326 2.618.94 3.766l.35.654l-.656 2.946l2.948-.654l.653.349A7.955 7.955 0 0 0 12 20a8 8 0 1 0 0-16m1 3v5h4v2h-6V7z">
                  </path>
                </svg></span></button>
          </div>
          <div class=" h-8 w-full">
              这里咋整都没有自适应宽度
          </div>

          <div>
            <n-button class="bg-[#18a057cc] text-white">
              <n-icon size="20" :depth="1" class="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
                  <path
                    d="M27.71 4.29a1 1 0 0 0-1.05-.23l-22 8a1 1 0 0 0 0 1.87l9.6 3.84l3.84 9.6a1 1 0 0 0 .9.63a1 1 0 0 0 .92-.66l8-22a1 1 0 0 0-.21-1.05zM19 24.2l-2.79-7L21 12.41L19.59 11l-4.83 4.83L7.8 13l17.53-6.33z"
                    fill=""></path>
                </svg>
              </n-icon>
            </n-button>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style></style>
