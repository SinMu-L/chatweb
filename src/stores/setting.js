import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', () => {
    const model = "gpt-3.5-turbo"
    const Temperatures = 0.8
    const Top_p = 1
    function increment() {
        
    }

    return { model,Temperatures,Top_p, increment }
})