<template>
    <div class="topBar">
        <div class="topBar-top">
            <div class="topBar-left">
                <img src="../../img/sign.jpg" alt="" class="calibration">
                <div class="p1">
                    <strong>河南师范大学软件学院 操作系统虚拟实验室</strong>
                </div>
            </div>
            <div class="topBar-right">
                <p class="p2">{{ userInfo.rows.username }}</p>
            </div>
        </div>
        <div class="topBar-bottom">
            <img src="../../img/u7.jpg" alt="" class="imgBig">
        </div>
    </div>
</template>

<script setup lang="ts">
    import {ref} from 'vue'
    import { getUserInfo } from '@/api/index'
    
    const userInfo = ref({rows: { username: "",userAccount: ""}})
    getUserInfo().then((res) => {
        userInfo.value.rows.username = res.data.rows.username
        userInfo.value.rows.userAccount = res.data.rows.account
        // console.log(res);
        localStorage.setItem("username", res.data.rows.username)
        localStorage.setItem("userAccount", res.data.rows.account)
    })
</script>

<style lang="scss">
.layout {
    .header {
        width: 100%;
        height: 20%;
    }
    .topBar {
        .topBar-top {
            display: flex;
            justify-content: space-between;
            padding: 5px;
            .topBar-left {
                display: flex;
                .calibration {
                    width: 50px;
                    height: 50px;
                }
                .p1 {
                    font-size: 30px;
                    padding-top: 4px;
                    font-weight: 400;
                    margin-left: 10px;
                }
            }
            .topBar-right {
                padding: 13px;
            }
        }
        .topBar-bottom {
            height: 50vh;
            overflow: hidden;
            .imgBig {
                width: 100%;
                height: 90vh;
                background-size: cover;
                margin-top: -130px;
            }
        }   
    }
}
</style>