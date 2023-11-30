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
      <Main />
    </n-layout-content>
    <n-layout-footer>footer</n-layout-footer>
  </n-layout>
</template>

<style lang="scss" scoped>
$number-of-items: 10;
.n-layout-header {
  width: calc(100% - 160px);
}
.n-layout-content {
  overflow: auto;
  backdrop-filter: blur(10px);
  background-image: linear-gradient( 135deg, #81FFEF 10%, #F067B4 100%);
}
.n-layout-footer {
  padding: 24px;
}
</style>