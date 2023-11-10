<script setup>
import { defineComponent, ref } from 'vue'
import { NButton, NModal, NTabs, NTabPane, NForm, NFormItem,NFormItemRow, NInput,NCard } from 'naive-ui'

const showModal = ref(true)

var bodyStyle = {
    width: '600px'
}

var segmented = {
    content: 'soft',
    footer: 'soft'
}

</script>
<template>
    <div class=" h-screen w-screen bg-gray-300">
        <!-- <n-button @click="showModal = true">
            来吧
        </n-button> -->
        <n-modal v-model:show="showModal" class="custom-card" preset="card" :style="bodyStyle" title="卡片预设" size="huge"
            :bordered="false" :segmented="segmented" :mask-closable="false" :close-on-esc="false">
            <!-- <template #header-extra>
                噢!
            </template> -->
            <n-card>
                <n-tabs class="card-tabs" default-value="signin" size="large" animated pane-wrapper-style="margin: 0 -4px"
                    pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;">
                    <n-tab-pane name="signin" tab="登录">
                        <n-form>
                            <n-form-item-row label="用户名">
                                <n-input />
                            </n-form-item-row>
                            <n-form-item-row label="密码">
                                <n-input />
                            </n-form-item-row>
                        </n-form>
                        <n-button type="primary" block secondary strong>
                            登录
                        </n-button>
                    </n-tab-pane>
                    <n-tab-pane name="signup" tab="注册">
                        <n-form>
                            <n-form-item-row label="用户名">
                                <n-input />
                            </n-form-item-row>
                            <n-form-item-row label="密码">
                                <n-input />
                            </n-form-item-row>
                            <n-form-item-row label="重复密码">
                                <n-input />
                            </n-form-item-row>
                        </n-form>
                        <n-button type="primary" block secondary strong>
                            注册
                        </n-button>
                    </n-tab-pane>
                </n-tabs>
            </n-card>
        </n-modal>


    </div>
</template>

<style scoped>
.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}
</style>