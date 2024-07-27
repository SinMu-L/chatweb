<script setup>
import { defineComponent, reactive, ref,getCurrentInstance } from 'vue'
import { NButton, NModal, NTabs, NTabPane, NForm, NFormItem,NFormItemRow, NInput,NCard } from 'naive-ui'
import { useMessage } from 'naive-ui'

const instanceV = getCurrentInstance()
const message = useMessage()

const showModal = ref(false)
var login_pwd = ref('')

var bodyStyle = {
    width: '600px'
}



function login(){
    if(login_pwd.value === instanceV.proxy.loginPwd){
        instanceV.proxy.hasLogin = true
        showModal.value = false
        message.success('密码正确...')
    }else{
        message.error('密码错误...')
    }

}

</script>
<template>
    <div class=" h-screen w-screen bg-gray-300" :class=" showModal ? '':'hidden'">
        <n-modal v-model:show="showModal" class="custom-card" preset="card" :style="bodyStyle" title="" size="huge"
            :bordered="false" :close-on-esc="false" :closable="false" :maskClosable="false">

            <n-card>
                <n-tabs class="card-tabs" transform-origin="center" default-value="signin" size="large" animated pane-wrapper-style="margin: 0 -4px"
                    pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;">
                    <n-tab-pane name="signin" tab="登录">
                        <n-form>
                            <n-form-item-row label="密码">
                                <n-input v-model:value="login_pwd" />
                            </n-form-item-row>
                        </n-form>
                        <n-button type="primary" block secondary strong
                        @click="login()">
                            登录
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