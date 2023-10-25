## 环境
node 18.6.0
npm 9.6.2
vue3


Vue3 选项式基础
{{ msg }} 使用的是组件实例中 msg 的属性值
v-html 直接渲染html

`v-bind:attr`简写为 `:attr`

v-on:event

v-if  v-show

v-for

v-model、 表单输入绑定

ref



### ✅问题1: 主体部分IM区域中消息过长会溢出

### 问题2：侧边栏显影的时候，箭头怎么做？我想要那种融为一体给感觉

### 问题3： 输入框的高度无法自适应

### ✅问题4：textarea回车+ctrl 也会发送消息

### ✅问题5：fetch 请求API获取流数据
    ```
    如果你想在Vue 3的组件中的其他函数中调用上述的`startStream`函数，你可以将它定义为组件的方法，并在需要的地方调用该方法。以下是一个示例代码，演示了如何在Vue 3组件中的其他函数中调用`startStream`方法：

    ```vue
    <template>
    <div>
        <div id="output">{{ output }}</div>
        <button @click="callStartStream">Start Stream</button>
    </div>
    </template>

    <script>
    export default {
    data() {
        return {
        output: ''
        };
    },
    methods: {
        async startStream() {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: 'Your prompt here' }) // 替换为你的API请求参数
        });

        const reader = response.body.getReader();

        const processStream = async () => {
            const { done, value } = await reader.read();

            if (done) {
            console.log('Stream completed');
            return;
            }

            // 将数据块添加到页面上
            const chunk = new TextDecoder('utf-8').decode(value);
            this.output += chunk;

            // 继续处理下一个数据块
            await processStream();
        };

        // 开始处理流数据
        await processStream();
        },
        callStartStream() {
        this.startStream();
        },
        // 在其他函数中调用startStream方法
        someOtherFunction() {
        this.startStream();
        }
    }
    };
    </script>
    ```

    <!-- 在这个示例中，我们添加了一个按钮`Start Stream`，并将其绑定到`callStartStream`方法。当用户点击按钮时，`callStartStream`方法会调用`startStream`方法，从而开始流式输出。

    另外，我们还在组件的`someOtherFunction`方法中调用了`startStream`方法。你可以在其他需要的函数中按照类似的方式调用`startStream`方法。

    请注意，为了在Vue组件的方法中正确访问`this`，我们使用了JavaScript的箭头函数或者`async`/`await`语法。这样可以确保在方法中正确引用组件的实例。

    记得根据你的实际需求进行修改和扩展代码，以适应你的Vue项目。 -->
    ```

### ✅问题6：vue中如何实现下面的变化
    ```
    <textarea v-model="textareaValue" readonly></textarea>
    ```
    和
    ```
    <textarea v-model="textareaValue" ></textarea>
    ```
    之间相互切换

    > 解决办法：`<textarea v-model="textareaValue"  :readonly="true|false"></textarea>` 

### 问题7： vue3中如何做到点一个就切换一个页面的？

### ✅问题8： vue3中v-if 和v-show的区别
1. v-if="true" 的时候，元素就会渲染，否则不渲染
2. v-show 无论什么时候都会渲染, 等于 false 的时候 隐藏

### ❌问题9：当我按下回车后，我想让鼠标不在textarea中

### 问题10：什么时候应该使用计算属性？

### 问题11：stream流的数据解析一直有问题，不知道怎么解决

### 问题12: vue-route 内部包含了一些元素，出现了部分点击位置无效

### 问题13： vue3中动态添加路由到store中，多个路由对应一个组件。切换路由的时候，路由对应的组件无法渲染

### 等待下一次DOM刷新 
资料：https://cn.vuejs.org/api/general.html#nexttick

`await nextTick()`


