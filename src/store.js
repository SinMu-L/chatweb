import { reactive } from 'vue'
import MainArea from './components/MainArea.vue';
import  './utils/localstorage.ts'

export const store = reactive({
  count: 0,
  isShow: true,
  model: 'gpt-3.5-turbo',
  Temperatures: 0.7,
  Top_p: 1,
  llms: {
    OpenAI: [
      {
        key_name: '模型',
        key_value: "OpenAI"
      }
    ]
  },
  chatStorage: {
    data: {
      active: 0,
      sidebar: [
        // {uuid: 1, title: "New Chat", enEdit: false}
      ],
      chat: [
        // {uuid: 1, data: [
        //   {
        //     "time": "",
        //     "msg": "index-1",
        //     "role": "AI",
        //     "msgReload": false
        //   },
        //   {
        //     "time": "",
        //     "msg": "index-1",
        //     "role": "user",
        //     "msgReload": false
        //   }
        // ]},
      ]
    },
    "expire": null
  },
  getMsgListByUuid(uuid) {
    var data = this.chatStorage.data.chat.find(v => v.uuid == uuid)
    return data.data
  }
})