<template>
  <div class="container">
    <!-- 被拖拽的盒子 -->
    <div class="box" ref="box" :style="{ top: boxTop + 'px', left: boxLeft + 'px' }" @mousedown="startDrag"></div>
    <!-- 指定区域 -->
    <div class="drop-zone" ref="dropZone" @dragenter="dragEnter" @dragover="dragOver" @dragleave="dragLeave" @drop="drop"></div>
    <!-- 提示信息 -->
    <div v-if="showMessage" class="message">拖拽成功!</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      boxTop: 0,
      boxLeft: 0,
      showMessage: false
    }
  },
  methods: {
    startDrag(event: MouseEvent) {
      const box = this.$refs.box as HTMLElement
      const offsetX = event.clientX - box.offsetLeft
      const offsetY = event.clientY - box.offsetTop

      const moveHandler = (event: MouseEvent) => {
        this.boxLeft = event.clientX - offsetX
        this.boxTop = event.clientY - offsetY
      }

      const upHandler = () => {
        document.removeEventListener('mousemove', moveHandler)
        document.removeEventListener('mouseup', upHandler)
      }

      document.addEventListener('mousemove', moveHandler)
      document.addEventListener('mouseup', upHandler)
    },
    dragEnter(event: DragEvent) {
      event.preventDefault()
    },
    dragOver(event: DragEvent) {
      event.preventDefault()
      const dropZone = this.$refs.dropZone as HTMLElement
      dropZone.classList.add('active')
    },
    dragLeave(event: DragEvent) {
      event.preventDefault()
      const dropZone = this.$refs.dropZone as HTMLElement
      dropZone.classList.remove('active')
    },
    drop(event: DragEvent) {
      event.preventDefault()
      const dropZone = this.$refs.dropZone as HTMLElement
      dropZone.classList.remove('active')
      this.showMessage = true
      setTimeout(() => {
        this.showMessage = false
      }, 2000)
    }
  }
})
</script>

<style scoped>
.container {
  position: relative;
  height: 400px;
}

.box {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: #f00;
  cursor: move;
}

.drop-zone {
  position: absolute;
  top: 200px;
  left: 200px;
  width: 200px;
  height: 200px;
  border: 2px dashed #000;
}

.message {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 10px;
  background-color: #0f0;
  color: #fff;
  border-radius: 5px;
}
</style>
