<script lang="ts" setup>
import HomeArtcleList from '@/components/HomeArticle/home-article-list.vue'
</script>

<template>
  <div class="blog-home-box">
    <HomeArtcleList />
  </div>
</template>

<style scoped lang="scss">
.blog-home-box {
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 80px;
  min-height: calc(100vh - 128px);
}
</style>