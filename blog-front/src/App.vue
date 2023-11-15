<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'
import { useTheme } from '@/hooks/useTheme'

const { hasTheme } = useTheme()

</script>

<template>
  <NConfigProvider class="h-full" :theme="hasTheme" >
    <!-- :theme-overrides="themeOverrides" -->
    <router-view></router-view>
  </NConfigProvider>
</template>

<style lang="scss">
</style>
