import { reactive } from 'vue'
import MainArea from './components/MainArea.vue';
import './utils/localstorage.ts'

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

    active: 0,
    sidebar: [
      { uuid: 1, title: "New Chatxxx", enEdit: false }
    ],
    chat: [
      {
        uuid: 1, data: [
          {
            "time": "",
            "msg": "index-1",
            "role": "AI",
            "msgReload": false
          },
          {
            "time": "",
            "msg": "index-1",
            "role": "user",
            "msgReload": false
          }
        ]
      },
    ],

    "expire": null
  },
  getMsgListByUuid(uuid) {
    var data = this.chatStorage.chat.find(v => v.uuid == uuid)
    return data.data
  },
  addSideBar() {
    const uuid = this.randomUuid()
    this.chatStorage.data.sidebar.push({
      uuid: uuid,
      title: `New Chat-${uuid}`,
      enEdit: false
    })
  },
  randomUuid() {

    const len = 6;
    var index = '';
    for (let i = 0; i < len; i++) {

      var t = Math.floor(Math.random() * 10) // [0, 10)
      index += t
    }
    return Number(index)
  },
})