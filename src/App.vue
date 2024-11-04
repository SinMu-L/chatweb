<script setup>
import { NMessageProvider } from 'naive-ui'
import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>

<template>
  
  <n-message-provider>
    
    <router-view></router-view>
    <!-- <ContainerTemplate></ContainerTemplate> -->
  </n-message-provider>
  <SpeedInsights />
</template>

<style scoped></style>
