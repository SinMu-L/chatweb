## 说明
模仿 https://github.com/Chanzhaoyu/chatgpt-web 的前端页面

## 环境
node 18.6.0
npm 9.6.2
vue3

## 二开步骤
1. 下载代码 
    ```shell
    git clone git@github.com:SinMu-L/chatweb.git
    ```
2. 进入项目目录按照依赖
    ```shell
    cd chatweb
    npm install
    ```
3. 运行页面
    ```shell
    npm run dev
    ```
4. 复制`.env`文件，粘贴重命名为`.env.development`作为开发环境使用即可。


## Vue3 选项式基础

常用命令：`v-bind:attr`、`v-on:event`、`v-for`、`v-if`、`v-show`、`v-model`



## 问题记录
✅问题1: 主体部分IM区域中消息过长会溢出

✅问题2：侧边栏显影的时候，箭头怎么做？我想要那种融为一体的感觉
> 设置三个方块，将上下2个方块利用 clip-path 、box-shadow、border-bottom-left-radius 来实现效果
> 
> 参考文档：
> 1. https://www.cnblogs.com/lpkshuai/p/17306234.html
> 2. https://juejin.cn/post/6854573222483099656
>

~~问题3： 输入框的高度无法自适应~~

✅问题4：textarea回车+ctrl 也会发送消息

✅~~问题5：fetch 请求API获取流数据~~
 

✅问题6：vue中如何实现下面的变化
    ```
    <textarea v-model="textareaValue" readonly></textarea>
    ```
    和
    ```
    <textarea v-model="textareaValue" ></textarea>
    ```
    之间相互切换

    > 解决办法：`<textarea v-model="textareaValue"  :readonly="true|false"></textarea>` 

✅问题7： vue3中如何做到点一个就切换一个页面的？
> vue-route
>
> 或者参考 naive-ui 中的tabs组件

✅问题8： vue3中v-if 和v-show的区别
1. v-if="true" 的时候，元素就会渲染，否则不渲染
2. v-show 无论什么时候都会渲染, 等于 false 的时候 隐藏

❌问题9：当我按下回车后，我想让鼠标不在textarea中

✅问题10：什么时候应该使用计算属性？
> 看心情
 
✅问题11：stream流的数据解析一直有问题，不知道怎么解决
1. 返回的文字缺失，文字顺序不对
> 主要原因是没有正确处理流数据的分块
> 
> 使用一个缓冲区来存储数据块。每当收到一个新的数据块时，我将其追加到缓冲区中，并检查缓冲区中是否有完整的数据（通过查找换行符 \n）。如果找到完整的数据，我将其提取出来进行解析和处理，并更新缓冲区以去除已处理的数据。

> GPT提问分享链接：https://shareg.pt/re79JYi

✅问题12: vue-route 内部包含了一些元素，出现了部分点击位置无效
> 写错了

✅问题13： vue3中动态添加路由到store中，多个路由对应一个组件。切换路由的时候，路由对应的组件无法渲染
> 这里应该是用 `/chat/:id` 这种路由, 完了那`id`对应的数据在 `route-view` 里面渲染

✅问题14： 点击左侧的删除按钮，路由跳转了2次，回到原来的路由了
> 发现我触发了一个冒泡事件
>
>   ```vue
>    <router-link to='/chat/9999'>
>        <div @click="popSidebar"></div>
>    </router-link>
>    ```
>
> 在 popSidebar 方法中阻止之间冒泡就行，或者添加事件委托(还不会事件委托)

问题15：侧壁栏添加新的item的时候宽度会改变，需要找到原因

✅问题16：侧边栏有2个item，当我先删除第一个item的时候，页面会跳转到404
> 这里的原因是因为我绑定的key有问题，不是直接绑定循环里面的索引
> 
> 由
> 
> ```vue
> <ChatItem v-for="(chat,index) in store.chatStorage.data.sidebar" :key="index" :idx="chat['uuid']"
>                 v-model:content="chat['title']" :disabled="chat['enEdit']" @del="popChaItemData"
>                 @enableEdit="enableEditChatItem"></ChatItem>
> ```
>
> 改成
>    ```vue
>     <ChatItem v-for="(chat) in store.chatStorage.data.sidebar" :key="chat['uuid']" :idx="chat['uuid']"
>                v-model:content="chat['title']" :disabled="chat['enEdit']" @del="popChaItemData"
>                @enableEdit="enableEditChatItem"></ChatItem>
>    ```

✅问题17：怎么做移动端自适应？
> 参考： https://tailwind.nodejs.cn/docs/responsive-design

问题18：考虑对接一个密码输入框

问题19：侧边栏中第一个item的路由总是和最后一个item相同，会随着最后一个路由的变化而变化

1. 现象描述：在触发`addChatItem()`事件之前，`store.chatStorage.data.sidebar`的数据如下

```json
[
    {
        "uuid": 1,
        "title": "New Chatxxx",
        "enEdit": false
    },
    {
        "uuid": 478479,
        "title": "New Chat-478479",
        "enEdit": false
    }
]
```

2. 触发`addChatItem()`事件后，`store.chatStorage.data.sidebar`的数据如下

```json
[
    {
        "uuid": "478479",
        "title": "New Chatxxx",
        "enEdit": false
    },
    {
        "uuid": 478479,
        "title": "New Chat-478479",
        "enEdit": false
    },
    {
        "uuid": 646529,
        "title": "New Chat-646529",
        "enEdit": false
    }
]
```

一步步的排查发现，我在`addChatItem()`中使用了`router.push`,进而出现上述现象

我的思路是看看`router.push` 里面到底是哪里修改了值，后来通过`Vue.js devtools插件`发现`store.chatStorage.data.sidebar`中的数据并没有改变，只是`SidebarFlexible.vue组件`中访问 `store.chatStorage.data.sidebar`的时候发生了变化。不知道是为什么

问题20：需要对接一下会话

等待下一次DOM刷新 
资料：https://cn.vuejs.org/api/general.html#nexttick

`await nextTick()`


