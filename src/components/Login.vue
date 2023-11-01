<script>
import { store } from '../store.js'

export default {
    data() {
        return {
            text: '',
            message: ''
        }
    },
    methods: {
        hasAuth() {
            return store.auth.secret ? false : true;
        },
        setSecret() {
            if (this.text == import.meta.env.VITE_SECRET) {
                store.auth.secret = this.text
                
            } else {
                console.log("密码错误")
                this.message = '密码错误'
            }

        },

    }
}
</script>

<template>
    <div class=" z-50 bg-gray-200 flex justify-center items-center absolute w-screen h-screen backdrop-grayscale-100"
        v-if="hasAuth()">
        <div class=" absolute w-1/2 h-1/4 left-1/4 top-0 flex justify-center items-center"  v-show="message">
            <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span class="font-medium w-full">{{message}}!</span>  3s后消失
            </div>
        </div>
        <div class=" bg-white brightness-100 w-1/2 h-1/2 flex flex-col  backdrop-grayscale">

            <div class="login-header basis-1/6   flex justify-center items-center">输入密码</div>
            <div class="login-content basis-4/6 flex flex-col justify-center items-center mx-40">
                <input v-model="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <button @click="setSecret" type="button"
                    class="border border-gray-100 w-40 bg-blue-500 rounded-lg mt-4">提交</button>
            </div>
            <div class="login-footer basis-1/6 w-full "></div>
        </div>
    </div>
</template>