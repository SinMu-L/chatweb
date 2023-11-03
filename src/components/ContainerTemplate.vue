<template>
    <div class=" grid grid-rows-1 w-screen h-screen border ">
        <!-- 总共5列，左右布局，左边1列，右边4列 -->
        <div class="grid grid-cols-5 ">
            <!-- 左边一列 -->
            <div class=" col-span-1 border border-blue-400">
                <!-- 左侧上中下布局 -->
                <div class="grid grid-rows-6 h-full">
                    <div class=" row-span-1 border border-yellow-500"></div>
                    <div class=" row-span-4 border border-blue-500"></div>
                    <div class=" row-span-1 border border-red-500"></div>
                </div>
            </div>
            <!-- 右边四列 -->
            <div class=" col-span-4"></div>
        </div>

    </div>
</template>