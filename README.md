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
 
问题11：stream流的数据解析一直有问题，不知道怎么解决

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


等待下一次DOM刷新 
资料：https://cn.vuejs.org/api/general.html#nexttick

`await nextTick()`


