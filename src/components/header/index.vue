<template>
  <div class="ts-header">
    <div>
      <span>Tiger Song</span>
    </div>
    <div style="-webkit-app-region: no-drag">
      <el-button title="最小化" @click="minimize()" link type="primary">最小化</el-button>
      <el-button title="最大化" v-if="!isMaximized" @click="maximize()" link type="primary">最大化</el-button>
      <el-button title="还原" v-else @click="maximize()" link type="primary">还原</el-button>
      <el-button title="退出" @click="close()" link type="primary">退出</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import 'element-plus/es/components/button/style/css'
import { ElButton } from 'element-plus'
export default defineComponent({
  name: 'Header',
  components: {
    ElButton
  },
  setup() {
    // @ts-ignore
    const remote = require('@electron/remote')
    const win = remote.getCurrentWindow()
    const state = reactive({
      isMaximized: false
    })
    const minimize = () => {
      win.minimize()
    }
    const maximize = () => {
      if (win.isMaximized()) {
        state.isMaximized = false
        win.restore()
      } else {
        state.isMaximized = true
        win.maximize()
      }
    }
    const close = () => {
      win.close()
    }
    onMounted(() => {
      state.isMaximized = remote.getCurrentWindow().isMaximized()
    })
    return {
      ...toRefs(state),
      minimize,
      maximize,
      close
    }
  }
})
</script>
<style>
.ts-header {
  moz-user-select: -moz-none;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-app-region: drag;
  background-color: #2b2b2b;
  color: white !important;
  font-size: 14px;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
</style>
