<script setup>
import { NMessageProvider } from 'naive-ui'
import { inject } from "@vercel/analytics"
</script>

<template>
  <n-message-provider>
    <router-view></router-view>
    <!-- <ContainerTemplate></ContainerTemplate> -->
  </n-message-provider>
</template>

<style scoped></style>
