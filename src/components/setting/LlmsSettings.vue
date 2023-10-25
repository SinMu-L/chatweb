<script>
import { store } from '../../store'
export default {
    data() {
        return {
            store,
        }
    },
    methods: {

    }
}
</script>

<template>
    <div class="flex flex-col">

        <div class="w-full flex flex-row mt-2">
            <div class="w-1/5 flex justify-center items-center ">

                <span class=" ">模型</span>
            </div>
            <div class="w-3/5   pr-4">

                <select id="underline_select" v-model="store.model" class="block py-2  px-2 w-full text-sm text-gray-500 bg-transparent border-2 
                    border-gray-200 appearance-none  focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                    <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                    <option value="gpt-4">gpt-4</option>
                    <option value="model2">model2</option>
                    <option value="model3">model3</option>
                    <option value="model4">model4</option>
                </select>
            </div>

        </div>
        <div class="w-full flex flex-row mt-2">

            <div class="w-1/5 flex justify-center items-center ">

                <span class=" ">Temperatures</span>
            </div>
            <div class="w-3/5   pr-4 ">

                <input id="inputTemperatures" type="number" min="0" max="1" v-model="store.Temperatures" step="0.1" class="w-full h-full text-sm border-2 
                    border-gray-200  p-2 appearance-none cursor-pointer ">
            </div>

        </div>
        <div class="w-full flex flex-row mt-2">
            <div class="w-1/5 flex justify-center items-center ">

                <span class=" ">Top_p</span>
            </div>
            <div class="w-3/5   pr-4 ">

                <input type="number" min="0" max="1" step="0.1" v-model="store.Top_p" class="w-full h-full text-sm border-2 
                    border-gray-200  p-2 appearance-none cursor-pointer ">
            </div>

        </div>


    </div>
</template>