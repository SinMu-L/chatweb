<script setup lang="ts">
import { ref } from 'vue'
import Menu from './components/icons/Menu.vue';
import Setting from './components/icons/Setting.vue'
import Download from './components/icons/Download.vue'
import Delete from './components/icons/Delete.vue'
import { type DrawerPlacement, NDrawer, NAvatar } from 'naive-ui'
const active = ref(false)
const placement = ref<DrawerPlacement>('right')
const activate = (place: DrawerPlacement) => {
  console.log("===")
  active.value = true
  placement.value = place
}
</script>

<template>
  <n-drawer v-model:show="active" :width="200" :placement="placement">
    <div class="flex flex-col h-full">
      <main class="flex flex-col flex-1 min-h-0">1</main>
      <footer class="flex items-center justify-between min-w-0 p-4 overflow-hidden border-t dark:border-neutral-800">
        <div class="flex-1 flex-shrink-0 overflow-hidden">
          <div class="flex items-center overflow-hidden ">
            <n-avatar round size="medium" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
            <div class="flex-1 min-w-0 ml-2">
              <h2 class="overflow-hidden font-bold text-md text-ellipsis whitespace-nowrap">DaShuaiQI Li</h2>
              <p class="overflow-hidden text-xs text-gray-500 text-ellipsis whitespace-nowrap">

                <span>Star on <a href="https://github.com/SinMu-L/chatweb" class="text-blue-500" target="_blank" >Github</a></span>
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
            <button class="flex items-center justify-center w-10 h-10 transition rounded-full hover:bg-neutral-100 dark:hover:bg-[#414755]">

              <Download></Download>
            </button>
          </div>
          <div class="">
            <button class="flex items-center justify-center w-10 h-10 transition rounded-full hover:bg-neutral-100 dark:hover:bg-[#414755]">

              <Delete></Delete>
            </button>
          </div>
        </div>
      </div>
    </header>
    <main class="flex-1 overflow-hidden">23</main>
    <footer class="sticky left-0 bottom-0 right-0 p-2 pr-3 overflow-hidden bg-red-400">
      <div class="w-full max-w-screen-xl m-auto">
        <div class="flex items-center justify-between space-x-2">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style></style>
