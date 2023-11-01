<script setup>

import SidebarFlexible from './components/SidebarFlexible.vue'
import Login from './components/Login.vue';


</script>

<template>
  <div class="my-web ">
    <div class="  main flex">
      <Login ></Login>
      <SidebarFlexible></SidebarFlexible>
      <!-- <MainArea></MainArea> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.my-web {
  position: absolute;
  top: 0;
  left: 0;
  /* background-color: #ddd; */
  width: 100%;
  height: 100%;
  padding: 1%;
}

.main {
  width: auto;
  height: 100%;
  /* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色*/
  box-shadow: 0px 5px 10px 1px #ddd;
  border: 1px #ddd solid;
  border-radius: 1%;

}




</style>
