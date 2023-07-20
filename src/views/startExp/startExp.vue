<template>
  <div class="operate" v-if="isShow">
    <div class="messageBox">
      <div class="text">
        <span>点击开机,开始实验</span>
      </div>
    </div>
    <div class="startButton" @click="goSecond()">
      <img src="../../img/Pause.png" alt="" />
    </div>
  </div>
    <router-view />
</template>
  
  <script setup lang='ts'>
import { watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const router = useRouter()
const route = useRoute()
let isShow = true

watchEffect(() => {
    isShow = false;
    if(route.fullPath === "/startExp"){
        isShow = true
    }
})
const goSecond = () =>{
    axios.post("/api/v1/data_record", {
        bearerToken: localStorage.getItem("token"),
        ticket: localStorage.getItem("ticket"),
        userAccount: localStorage.getItem("userAccount"),
        userName: localStorage.getItem("username")
    }).then((res) => {
        console.log(res)
    })
    router.push('/secondExp')
}





</script>
  
  <style lang="scss">
.operate {
  width: 100%;
  height: auto;
  // margin:10px;
  display: flex;
  flex-direction: column;
  .messageBox {
    width: 100%;
    height: auto;
    background-color: #f2f2f2;
    display: flex;
    .text {
      width: auto;
      line-height: 45px;
      font-weight: bolder;
      margin: 0 auto;
      span {
        display: inline-block;
        margin: 0 auto;
        color: #028102;
      }
    }
  }
  .startButton {
    margin: auto;
    padding-top: 30px;
    padding-left: 80px;
    img:hover{
        scale: 1.01;
    }
    img {
      width: 70%;
      height: 70%;
      transition: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

