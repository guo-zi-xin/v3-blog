<script setup lang="ts">
import { ref } from 'vue'
import { NConfigProvider } from 'naive-ui'
import type { GlobalTheme } from 'naive-ui'

const theme = ref<GlobalTheme | null>(null)

</script>

<template>
  <NConfigProvider :theme="theme">
    <div class="app">
      <router-view></router-view>
    </div>
  </NConfigProvider>
</template>

<style scoped lang="scss">
.app {
  width: 100%;
  height:100%;
  box-sizing: border-box;

  .icon-fanhui {
    position: fixed;
    left: 5px;
    top: 60px;
    font-size: 2.2rem;
    color: var(--font-color);
    z-index: 999;
  }
}
</style>
