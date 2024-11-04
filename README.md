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


## 目的
还是希望做一个响应式布局

响应式布局的根本是不同的媒体查询


## 小技巧

[事件监听](https://cn.vuejs.org/guide/essentials/event-handling.html#system-modifier-keys)
1. 监听回车事件：`@keyup.enter="event()"`
2. 监听ctrl+enter：`@keyup.ctrl.enter="event()"`


## 功能列表

- [ ] 响应式布局（不同状态下的媒体查询）
- [x] localstorage 持久化存储
- [x] OpenAI参数设置
- [x] 对接流式输出
- [x] 多会话和上下文逻辑
- [x] grid+flex布局
- [x] 根路由默认跳转到第一个路由
- [x] 下载为 Markdown 文件
- [x] 清除会话
- [x] 清除 localstorage 缓存
- [x] 消息渲染，代码高亮
- [x] AI API 请求错误结果渲染
- [x] 私信列表项总结标题


效果图
![alt text](image.png)


---

vercel web分析：https://vercel.com/docs/analytics/quickstart#add-the-analytics-component-to-your-app

vercel 速度分析：https://vercel.com/docs/speed-insights/quickstart#add-@vercel/speed-insights-to-your-project
