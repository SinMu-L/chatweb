import { defineStore } from 'pinia'


export const useChatlistStore = defineStore('chatlist', {

  state: () => {
    return {
      uuid: "",
      chatlist: [],
      message_list: [],
    }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    toJson(){
      return JSON.stringify({
        uuid: this.uuid,
        chatlist: this.chatlist,
        message_list: this.message_list
      })
    },
    error(){
      return this.error_msg
    },
    get(){
        return this.chatlist
    },
    add(){
        const uuid = this.randomUuid()
        this.chatlist.push({
            uuid: uuid,
            disabled: true,
            content: "new-chat-" + uuid
        })
        this.message_list.push({
          uuid,
          msg_list: []
        })
        return uuid
    },
    enable(uuid){
      const index = this.chatlist.findIndex(v=>v.uuid == uuid)
      if(index == -1){
        // 没有找到
        throw new Error("设置可编辑失败，未找到当前索引")
        return false
      }else{
        this.chatlist[index].disabled = !this.chatlist[index].disabled 
        return true
      }
    },
    delete(uuid){
      const index = this.chatlist.findIndex(v=>v.uuid == uuid)
      if(index == -1){
        // 没有找到
        throw new Error("删除失败，未找到当前索引")
        return false
      }else{
        this.chatlist.splice(index,1)
        this.message_list.splice(index,1)
        return true
      }
    },
    randomUuid(){
        var len = 9
        var uuid = '';
        for (let i = 0; i < len; i++) {
            uuid += Math.floor(Math.random() * 10)
        }
        return Number(uuid, 10)
    },
    getMessageList(uuid){
      console.log(uuid)
      if(uuid == undefined){
        return false
      }
      const index = this.message_list.findIndex(v=>v.uuid == uuid)
      if(index < 0){
        throw new Error('获取消息列表失败，未找到当前索引')
        return false
      }else{
        return this.message_list[index].msg_list
      }
    },
    addMessageListItem(uuid,content,reversion){
      const index = this.message_list.findIndex(v=>v.uuid == uuid)
      if(index < 0){
        throw new Error("发送消息失败，未找到当前索引")
        // 跳转到home
        return false
      }else{
        this.message_list[index].msg_list.push({
          
          content: content, 
          create_time: new Date().toLocaleString("sv-SE",{timeZone: "PRC"}), 
          reversion: reversion, 
          msgload: false
        })
        return true
      }
    },
    deleteMessageList(uuid){
      if(uuid == undefined){
        return false
      }
      const index = this.message_list.findIndex(v=>v.uuid == uuid)
      if(index < 0){
        throw new Error('获取消息列表失败，未找到当前索引')
        return false
      }else{
        this.message_list[index].msg_list = []
        return true
      }
    },

  },
})