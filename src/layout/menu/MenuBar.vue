<template>
    <el-menu 
      router 
      default-active="/startExp" 
      class="el-menu-vertical-demo" 
      :collapse="isCollapse" 
      >
      <template v-for="menu in menuList" :key="menu.path">
        <el-menu-item :index="menu.path" >
          <template #title><strong>{{ menu.meta.title }}</strong></template>
        </el-menu-item>
      </template>
    </el-menu>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const isCollapse = ref(false)

let menuList = reactive([
  {
    path: '/startExp',
    component: "/startExp/startExp",
    name: "startExp",
    meta: {
      title: "开始实验",
      roles: [""]
    }
  },
  {
    path: '/expAim',
    component: "/expAim/expAim",
    name: "expAim",
    meta: {
      title: "实验目的",
      roles: [""]
    }
  },
  {
    path: '/expResources',
    component: "/eexpResources/expResources",
    name: "expResources",
    meta: {
      title: "实验资源",
      roles: [""]
    }
  },
])


</script>

<style lang="scss">
.el-aside{
  width: 140px !important;
}
.el-menu-item {
  font-size: 20px;
  padding: 20px;
  width: 140px;
}

</style>