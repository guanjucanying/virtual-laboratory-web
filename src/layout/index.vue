<template>
  <div class="common-layout">
    <el-container class="layout">
      <el-header class="header">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px" class="aside">
            <MenuBar></MenuBar>
        </el-aside>
        <el-container>
          <el-main class="main">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
          </el-main>
          <el-footer class="footer"></el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
 import Header from './header/Header.vue';
 import MenuBar from './menu/MenuBar.vue';
</script>

<style lang="scss">
* {
    margin:0px; padding:0px;
}
html,body {
    padding: 0px;
    margin: 0px;
    height: 100%;
}
.layout {
    height: 100%;
}
.el-header {
    padding: 0 !important;
}
.aim {
    .aim-title {
        height: 50px;
        width: 100px;
        margin: 0 auto;
    }
}
</style>