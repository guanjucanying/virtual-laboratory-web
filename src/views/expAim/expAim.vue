<template>
    <div class="aim">
        <div class="aim-title"><h2>实验目的</h2></div>
        <div class="first nav">
            <h3>1.掌握操作系统启动过程</h3>
            <p>(1) BISO启动流程</p>
            <p>(2) 引导程序启动流程</p>
            <p>(3) 操作系统启动及初始化流程</p>
        </div>
        <div class="second nav">
            <h3>2 理解进程的创建流程</h3>
            <p>(1) 0号进程的创建</p>
            <p>(2) 1号和2号进程的创建</p>
            <p>(3) 进程控制块PCB</p>
            <p>(4) 进程初始化</p>
        </div>
        <div class="third nav">
            <h3>3 实现进程状态转换与控制</h3>
            <p>(1) 进程调度</p>
            <p>(2) 进程执行</p>
            <p>(3) 进程阻塞</p>
            <p>(4) 进程唤醒</p>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'

</script>

<style scoped lang="scss">
.nav {
    p {
        margin: 20px 0;
    }
}
.second {
    margin: 30px 0;
}
</style>