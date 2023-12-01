<script lang="ts" setup>
import HomeArtcleList from '@/components/HomeArticle/home-article-list.vue'
import PersonalCard from '@/components/RightSides/PersonalCard.vue'
</script>

<template>
  <div class="blog-home-box">
    <n-grid x-gap="24" y-gap="24" :cols="4" item-responsive>
    <n-gi class="light-green" :span="3">
      <HomeArtcleList />
    </n-gi>
    <n-gi class="green" >
      <PersonalCard/>
    </n-gi>
  </n-grid>


  </div>
</template>

<style scoped lang="scss">
.blog-home-box {
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 80px;
  min-height: calc(100vh - 128px);
}

.light-green {
  height: 410px;
  background-color: rgba(0, 128, 0, 0.12);
}
.green {
  height: 410px;
}
</style>