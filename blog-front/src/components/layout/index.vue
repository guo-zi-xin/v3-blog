<script setup lang="ts">
import BlogHeader from './BlogHeader.vue'
import BlogMain from './BlogMain.vue'
import BlogFooter from './BlogFooter.vue'
</script>

<template>
  <div calss="layout">
    <BlogHeader />
    <BlogMain />
    <BlogFooter />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  position: relative;
}
</style>