<script lang="ts" setup>
import Header from '@/components/layouts/header/Header.vue'
import Main from '@/components/layouts/main/Main.vue'
</script>

<template>
  <n-layout wh-full>
    <n-layout-header>
      <Header />
    </n-layout-header>
    <n-layout-content content-style="padding: 24px;" wh-full>
      <Main mt30/>
    </n-layout-content>
    <n-layout-footer>footer</n-layout-footer>
  </n-layout>
</template>

<style lang="scss" scoped>
.n-layout-header {
  width: 100%;
}

.n-layout-footer {
  padding: 24px;
}

.n-layout-content {
  // background-color: #fff;
  overflow: auto;
}
</style>