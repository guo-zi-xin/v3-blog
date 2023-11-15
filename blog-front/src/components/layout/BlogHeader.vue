<script setup lang="ts">
import { reactive } from 'vue'
import { NImage, NMenu, NIcon } from 'naive-ui'
import { GameControllerOutline } from '@vicons/ionicons5'
import logoSrc from '@/assets/image/logo.jpg'

import type { MenuOption } from 'naive-ui'


const menuOptions: MenuOption[] = [
  {
    label: '首页',
    key: 'home',
  },
  {
    label: '归档',
    key: 'archive',
  },
  {
    label: '关于',
    key: 'about',
  },
]
const state = reactive({
  activeKey: 'home'
})
</script>

<template>
  <div class="blog-header-layout">
    <div class="blog-header-layout-left">
      <div class="blog-header-layout-left-logo">
        <n-image width="40" :src="logoSrc" :preview-disabled="true" />
      </div>
    </div>
    <div class="blog-header-layout-right">
      <n-icon size="40">
    <game-controller-outline />
  </n-icon>
      <n-menu v-model:value="state.activeKey" mode="horizontal" :options="menuOptions" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.blog-header-layout {
  width: 100%;
  height: 60px;
  background: linear-gradient(45deg, transparent, #fff 4px);
  background-size: 6px 6px;
  backdrop-filter: saturate(50%) blur(4px);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 10;
  &-left {
    padding-left: 40px;
    &-logo {
      width: 40px;
      height: 40px;
      border-radius: 100%;
      cursor: pointer;
      overflow: hidden;
      transition: ease-in-out 1s;
      &:hover {
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
      }
    }
  }
  &-right {
    padding-right: 40px;
  }
}
</style>