<script setup>
import Chatbox from './icons/ChatBox.vue';
</script>
<template>
    <div>
        <router-link :to="'/'"
            class="relative flex items-center gap-3 px-3 py-3 break-all border rounded-md cursor-pointer hover:bg-neutral-100 group 
            dark:border-neutral-800 dark:hover:bg-[#24272e] border-[#4b9e5f] bg-neutral-100 text-[#4b9e5f] dark:bg-[#24272e] dark:border-[#4b9e5f] pr-14">

            <div class="flex justify-center item-center">

                <Chatbox></Chatbox>
            </div>
            <div class="relative flex-1 overflow-hidden break-all text-ellipsis whitespace-nowrap truncate">
                <span>https服务中存在http服务，怎么通过配置nginx让http请求https</span>
            </div>
            <div class="absolute z-10 flex visible right-1">
                <button class="p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true" role="img" class=" iconify iconify--ri" width="1em" height="1em"
                        viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M6.414 15.89L16.556 5.748l-1.414-1.414L5 14.476v1.414zm.829 2H3v-4.243L14.435 2.212a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414zM3 19.89h18v2H3z">
                        </path>
                    </svg>
                </button>
                <button class="p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true" role="img" class=" iconify iconify--ri" width="1em" height="1em"
                        viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1zm1 2H6v12h12zm-9 3h2v6H9zm4 0h2v6h-2zM9 4v2h6V4z">
                        </path>
                    </svg>
                </button>

            </div>
        </router-link>
    </div>
</template>