<template>
  <router-view #default="{ route, Component }">
    <transition leave-from-class="ts-web-fade--leave-to" enter-active-class="animate__animated animate__bounceInRight">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    let data = reactive({
      count: 1
    })
    const changeCount = () => {
      data.count++
    }
    return {
      changeCount,
      ...toRefs(data)
    }
  }
})
</script>
