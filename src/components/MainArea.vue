<script>


import SendMessageVue from "./SendMessage.vue";
import MessageItem from "./MessageItem.vue";
import { store } from '../store';


export default {
  components: {

    SendMessageVue,
    MessageItem,
  },
  props: [],
  data() {
    return {
      msgList: [],
      text: "",
      // 默认：消息出于加载中
      msgReload: false,
      // 默认：输入框可以写入
      readonly: false,
      store,
    }
  },
  methods: {

    async handlerEnterKey(e) {
      if (e.keyCode == 13 && e.ctrlKey) {
        this.text += "\n";
      } else if (e.keyCode === 13) {
        if (this.text.length <= 0) {
          return;
        }
        this.readonly = true

        const uuid = this.$route.params.uuid
        const index = store.chatStorage.data.chat.findIndex(v => v.uuid == uuid)
        store.chatStorage.data.chat[index].data.push({
          time: (new Date()).toLocaleString("sv-SE"),
          msg: this.text,
          role: "user",
          msgReload: false
        })

        var t = this.text
        this.text = ""
        store.chatStorage.data.chat[index].data.push({
          time: (new Date()).toLocaleString("sv-SE"),
          msg: "",
          role: "AI",
          msgReload: true
        })

        console.log(t)
        await this.startStream(t, index)
        // this.getStreamV2(t,index)
      }


    },
    async startStream(prompt, index) {
      const url = import.meta.env.VITE_AI_BASE_URL;
      const key = import.meta.env.VITE_AI_KEY
      const response = await fetch(url, {
        "method": "POST",
        "headers": {
          Authorization: `Bearer ${key}`
        },
        "mode": "cors",
        "body": JSON.stringify({
          model: store.model,
          messages: [{ role: "user", content: `${prompt}` }],
          temperature: store.Temperatures,
          top_p: store.Top_p,
          stream: true,
        })
      });

      const reader = response.body.getReader();
      let buffer = ''; // 用于缓存数据块

      const readStream = async () =>{
        const { done, value } = await reader.read();

        if (done) {
          console.log('Stream reading complete');
          this.readonly = false
          return;
        }

        const chunk = new TextDecoder('utf-8').decode(value);
        buffer += chunk; // 将数据块追加到缓冲区中

        // 检查缓冲区中是否有完整的数据
        let completeData = '';
        let separatorIndex;
        while ((separatorIndex = buffer.indexOf('\n')) !== -1) {
          completeData = buffer.slice(0, separatorIndex); // 提取完整的数据
          buffer = buffer.slice(separatorIndex + 1); // 更新缓冲区，去掉已处理的数据

          // 解析JSON数据
          const res = completeData.split(": ")[1]
          let data;
          try{
            data = JSON.parse(res);
            console.log('Received data:', data.choices[0].delta.content);
            store.chatStorage.data.chat[index].data[store.chatStorage.data.chat[index].data.length - 1].msgReload = false
            store.chatStorage.data.chat[index].data[store.chatStorage.data.chat[index].data.length - 1].msg += `${data.choices[0].delta.content}`
          }catch(e){
            // console.error('Error parsing JSON:', e);
            continue
          }
        }

        return readStream();
      }

      // 开始处理流数据
      return readStream();
    },

    getTitle() {
      if(this.$route.fullPath.indexOf('/chat/') > -1){
        const uuid = this.$route.params.uuid
        const item1 = store.chatStorage.data.sidebar.find(v=>v.uuid = uuid)
        if(item1 !== undefined){
          return item1.title
        }
      }
      
      return 'Aha'
    }

  },
  mounted() {

  },
  updated() {
    if (this.$route.params.uuid) {
      try {
        this.msgList = store.getMsgListByUuid(this.$route.params.uuid)

      } catch (e) {
        console.log('获取消息列表失败.', this.$route.params.uuid)
      }
    }
  },
 
}

</script>

<template>
  <div class="right  h-full  w-full">
    <div class="mx-4 h-full flex flex-col  ">
      <div class="basis-1/12 border flex justify-start items-center px-4 sm:hidden ">
        {{ getTitle() }}
      </div>
      <div class=" basis-5/6 px-4 border   overflow-auto">
        <div v-if="this.$route.path == '/'" class="text-center text-slate-300">Aha</div>
        <div v-else class="pt-2">
          <MessageItem v-for="(msgItem) in msgList" :key="msgItem['time']" :role="msgItem['role']" :msg="msgItem['msg']"
            :time="msgItem['time']" :msgReload="msgItem['msgReload']"></MessageItem>
        </div>
      </div>
      <div class=" basis-1/6    flex flex-row justify-center items-center">
        <div class="w-full h-1/2  ">
          <div class=" h-full " v-bind:class="readonly ? 'bg-slate-300' : ''">
            <textarea :readonly="readonly" @keydown.enter.prevent="handlerEnterKey" name="" id="" cols="" rows=""
              class="w-full h-full resize-none border border-gray-300 focus:outline-none focus:border-2 focus:border-gray-600"
              @input="inputAutoHight" v-model="text"></textarea>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>