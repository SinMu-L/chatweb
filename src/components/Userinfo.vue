<script setup>
import {NIcon, NTabPane, NSelect, NTabs, NInputNumber, NModal} from 'naive-ui'
import { LogInOutline as LogInIcon, SettingsOutline, Menu } from '@vicons/ionicons5'
import { ref } from 'vue'

import {useSettingStore} from '../stores/setting'

const setting = useSettingStore()

const showSetting = ref(false)

var selectOptions = ref([
    {
        label: 'gpt-3.5-turbo',
        value: 'gpt-3.5-turbo'
    },
    {
        label: 'gpt-4',
        value: 'gpt-4'
    }
])
</script>


<template>
    <!-- 头像 -->
    <div class=" w-1/4  flex justify-center items-center">
        <img class=" rounded-full h-10 w-10" src="/avatar.jpg" alt="">
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
        <n-icon @click="showSetting=!showSetting">
            <SettingsOutline></SettingsOutline>
        </n-icon>
        <!-- 设置 modal -->
        <div class="hidden absolute top-0 left-0 bg-transparent  w-screen h-screen border border-red-200">
            <div class=" flex justify-center items-center">
                <n-modal v-model:show="showSetting" style="width: 600px" class="custom-card" preset="card" title=""
                    size="huge">

                    <template #header-extra>
                    </template>
                    <n-tabs type="line" animated>
                        <n-tab-pane name="about" tab="关于">
                            <div>这是一个demo项目，仅用于学习。</div>
                            <div class="my-4">技术栈：Vue3 + Vite + tailwindCss3 + NaiveUi</div>
                        </n-tab-pane>
                        <n-tab-pane name="settings" tab="设置">
                            <div class=" grid grid-rows-3 gap-4">
                                <div>
                                    <span class=" mr-4">Model: </span>
                                    <n-select :style="{ width: '80%' }" :options="selectOptions"
                                        v-model:value="setting.model" />
                                </div>
                                <div>
                                    <span class=" mr-4">Temperatures: </span>
                                    <n-input-number :style="{ width: '80%' }" :default-value="0.8" :step="0.1" :max="1"
                                        :min="0.1" v-model:value="setting.Temperatures" />
                                </div>
                                <div>
                                    <span class=" mr-4">Top_p: </span>
                                    <n-input-number :style="{ width: '80%' }" :default-value="1" :step="1" :max="1" :min="1"
                                        v-model:value="setting.Top_p" />
                                </div>
                            </div>
                        </n-tab-pane>
                        <n-tab-pane name="other" tab="其他">
                            其他
                        </n-tab-pane>
                    </n-tabs>

                </n-modal>
            </div>

        </div>
    </div>
</template>