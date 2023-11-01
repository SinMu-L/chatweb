<script >
import { nextTick } from 'vue'
import EditIcon from './icons/EditIcon.vue'
import DeleteIcon from './icons/DeleteIcon.vue'

export default {
    data() {
        return {
            path: '/chat/' + this.idx
        }
    },
    methods: {
        async editItem(e) {
            this.$emit('enableEdit', this.idx)
            // 等待下一次DOM刷新 https://cn.vuejs.org/api/general.html#nexttick
            await nextTick()
            // 设置鼠标的焦点 https://cn.vuejs.org/guide/essentials/template-refs.html#accessing-the-refs
            this.$refs.input.focus()
        },
        delItem(e) {
            this.$emit('del', this.idx)
            // 阻止冒泡,如果不添加会触发 router-link 的跳转
            e.preventDefault();
        },
        activeItem(){
            return this.$route.path == this.path ? 'bg-red-200': ''
        },

    },
    props: {
        idx: {},
        content: {},
        disabled: {}
    },
    components: {
        EditIcon,
        DeleteIcon,
    },
}

</script>

<template>
    <router-link :to="`/chat/${idx}`"  class=" bg-gray-200">

        <div class="c-border-center flex flex-row justify-start items-center h-12 "  >
            <div class=" w-1/6   h-full">
                <div class="mx-1 h-full flex justify-center items-center  "><i class="iconfont icon-chat1196057easyiconnet1 "></i></div>
            </div>
       
            <div class=" w-4/6  h-full">
                <div class=" truncate h-full flex justify-center items-center  ">
                <input v-if="this.$route.path == path" ref="input"  
                :disabled="!disabled" type="text" id="simple-search"
                    class="truncate   text-gray-900 text-sm rounded-md  " 
                    :class="!disabled?'border-none':'border'"
                    :value="[content ? content: idx]"
                    @input="$emit('update:content', $event.target.value)">
                
                <span v-else class="truncate   text-gray-900 text-sm rounded-md w-full" >{{ content ? content: idx }}</span>
            </div>
            </div>
            <div class=" w-1/6  h-full">
                <div class="flex justify-center items-center h-full">
                    <div class="mx-0.5 " @click="editItem">
                        <EditIcon></EditIcon>
                    </div>
                    <div class="mx-0.5" @click="delItem">

                        <DeleteIcon></DeleteIcon>
                    </div>
                </div>
            </div>
        </div>
    </router-link>
</template>

<style scoped>
.router-link-active > .c-border-center{
    --tw-bg-opacity: 1;
    background-color: rgb(229 231 235 / var(--tw-bg-opacity));
}
</style>