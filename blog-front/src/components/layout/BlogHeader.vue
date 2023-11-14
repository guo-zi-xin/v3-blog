<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBaseInfo } from '@/store/base'
import { NButton, darkTheme } from 'naive-ui'

const baseStore = useBaseInfo()
const { theme } = storeToRefs(baseStore)
const { setTheme } = baseStore


const handleTheme = () => {
  setTheme('dark')
  console.log('修改后', theme.value)

}
</script>

<template>
  <div class="layout-header">
    <n-button @click="handleTheme()">
      深色
    </n-button>
    <n-button @click="theme = null">
      浅色
    </n-button>
  </div>
</template>

<style scoped lang="scss"></style>