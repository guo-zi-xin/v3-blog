<script setup lang="ts">
const polygonOption: Array<string> = [...Array(3).keys()].map((item: number) => `g-polygon-${item + 1}`.toString())
</script>

<template>

  <div class="blog-main">
    <div class="g-bg">
      <div v-for="(item, index) in polygonOption" :key="index" class="g-polygon" :class="item"></div>
    </div>

    <!-- css-doodle背景 -->
    <div class="blog-main-background">
    </div>
    <div class="blog-main-box">
    </div>
  </div>
</template>

<style scoped lang="scss">
.blog-main {
  width: 100%;
  height: 100%;
  position: relative;

  &-background {
    width: 100%;
    height: 100%;
    position: relative;
    overflow-x: hidden;

    &::after {
      content: "";
      position: absolute;
      top: -100%;
      left: -100%;
      right: -100%;
      bottom: -100%;
      backdrop-filter: blur(100px);
      z-index: 1;
    }
  }

  &-box {
    position: absolute;
    z-index: 10;
    color: #fff;
    top: 80px;
  }
}</style>