<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'
import { useTheme } from '@/hooks/useTheme'

const { hasTheme, themeOverrides } = useTheme()

console.log(hasTheme)
</script>

<template>
  <NConfigProvider class="h-full" :theme="hasTheme" :theme-overrides="themeOverrides">
    <router-view></router-view>
  </NConfigProvider>
</template>

<style lang="scss">
#app {
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0 auto;
}
.h-full {
  widows: 100%;
}
</style>
