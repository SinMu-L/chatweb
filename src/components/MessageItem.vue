<script>
import Markdown from 'vue3-markdown-it';
import 'highlight.js/styles/monokai.css';

export default {
    props: {
        role: {},
        msg: {},
        time: {},
        msgReload: {}
    },
    components: {
        Markdown,
    }
}
</script>
<template>
    <div class=" px-2">
        <div class=" " v-bind:class="role == 'user' ? 'flex flex-col' : ''">

            <div class=" border border-none flex   justify-start items-center "
                v-bind:class="role == 'user' ? 'flex-row-reverse' : 'flex-row'">

                <img class="rounded-full w-7 h-7" src="../assets/icon.jpg" alt="">
                <span class=" mx-4 text-xs">{{ time }}</span>
            </div>
            <div class="message px-3 h-auto overflow-clip   flex"
                v-bind:class="role == 'user' ? 'flex-row-reverse' : 'flex-row'">

                <div v-if="!msgReload"
                    class=" w-auto max-w-[80%] min-w-[1%] overflow-ellipsis word-break  bg-blue-200  whitespace-no-wrap break-words rounded-sm p-2 my-1">
                    <Markdown :source="msg" />
                </div>

                <div v-else
                    class="flex items-center justify-start   border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <div
                        class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
                        loading...</div>
                </div>

            </div>
        </div>

    </div>
</template>

