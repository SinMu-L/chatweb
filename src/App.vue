<script setup>
import { NMessageProvider } from 'naive-ui'
import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>

<template>
  
  <n-message-provider>
    <SpeedInsights />
    <router-view></router-view>
    <!-- <ContainerTemplate></ContainerTemplate> -->
  </n-message-provider>
</template>

<style scoped></style>
