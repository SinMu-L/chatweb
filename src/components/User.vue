<script>
import SetIcon from './icons/SetIcon.vue';
import { initFlowbite } from 'flowbite';
import { NCard, NTabs, NTabPane } from 'naive-ui';
import LlmsSettings from './setting/LlmsSettings.vue';

export default {
    components: {
        SetIcon,
        NCard,
        NTabs,
        NTabPane,
        LlmsSettings,
    },
    methods: {
        test(e) {
            this.active = this.$route.path.replace(/\//g, "");
        },
    },
    data() {
        return {
            active: 'info'
        }
    },
    mounted() {
        initFlowbite()
    },


}
</script>

<template>
    <div class="absolute bottom-0 left-0 border  w-full bg-white">
        <div class="w-full flex flex-row h-full ">

            <div class=" basis-1/4 flex justify-center items-center">
                <img class="rounded-full w-10 h-10" src="../assets/icon.jpg" alt="image description">
            </div>
            <div class=" basis-1/2  flex flex-col justify-center py-2">
                <h2 class="font-bold">DaShuaiQi Li</h2>
                <span>star on <a href="https://github.com/" class="text-blue-600">Github</a></span>
            </div>
            <div class=" basis-1/4  flex justify-center items-center" data-modal-target="modalId"
                data-modal-toggle="modalId">
                <SetIcon></SetIcon>
            </div>
            <div id="modalId" tabindex="-1" aria-hidden="true"
                class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative w-full max-w-2xl max-h-full">
                    <!-- Modal content -->
                    <div class="relative bg-white  shadow dark:bg-gray-700">
                        <n-card title="" style="margin-bottom: 16px">
                            <n-tabs type="line" animated>

                                <n-tab-pane name="llms_settings" tab="配置">
                                    <llms-settings></llms-settings>
                                </n-tab-pane>

                            </n-tabs>
                        </n-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.active {
    border-bottom: blue 1px solid;
    color: blue;
}
</style>