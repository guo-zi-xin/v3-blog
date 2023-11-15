<script setup lang="ts">
const polygonOption: Array<string> = [...Array(3).keys()].map((item: number) => `g-polygon-${item + 1}`.toString())

const handleClick = () :void => {
  const doodle = document.querySelector('css-doodle');
  doodle?.update();
}
</script>

<template>
  <div class="blog-main" @click="handleClick()">
    <!-- <div class="g-bg">
      <div v-for="(item, index) in polygonOption" :key="index" class="g-polygon" :class="item"></div>
    </div> -->

    <!-- css-doodle背景 -->
    <div class="blog-main-background">
      <css-doodle>
        :doodle {
        @grid: 1x20 / 100vmin;
        }
        @place-cell: center;
        width: @rand(60vmin, 100vmin);
        height: @rand(60vmin, 100vmin);
        transform: translate(@rand(-120%, 120%), @rand(-80%, 80%)) scale(@rand(.8, 2.8)) skew(@rand(45deg));
        clip-path: polygon(
        @r(0, 30%) @r(0, 50%),
        @r(30%, 60%) @r(0%, 30%),
        @r(60%, 100%) @r(0%, 50%),
        @r(60%, 100%) @r(50%, 100%),
        @r(30%, 60%) @r(60%, 100%),
        @r(0, 30%) @r(60%, 100%)
        );
        background: @pick(#f44336, #e91e63, #9c27b0, #673ab7, #3f51b5, #60569e, #e6437d, #ebbf4d, #00bcd4, #03a9f4,
        #2196f3, #009688, #5ee463, #f8e645, #ffc107, #ff5722, #43f8bf, #e136eb, #f57c23, #32ed39);
        opacity: @rand(.5, .9);
        position: relative;
        top: @rand(-80%, 80%);
        left: @rand(-80%, 80%);
        animation: colorChange @rand(6.1s, 26.1s) infinite @rand(-.5s, -2.5s) linear alternate;
        @keyframes colorChange {
        100% {
        left: 0;
        top: 0;
        filter: hue-rotate(360deg);
        }
        }
      </css-doodle>
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
}

.g-bg {
  position: relative;
  width: 100vw;
  height: 100vh;
  margin-top: 0px;

  &>div {
    position: absolute;
    opacity: .5;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    backdrop-filter: blur(150px);
    z-index: 1;
  }
}

.g-polygon-1 {
  bottom: 100px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 85%;
  height: 85%;
  background: linear-gradient(#ffee55, #fdee99);
  clip-path: polygon(0 10%, 30% 0, 100% 40%, 70% 100%, 20% 90%);
}

.g-polygon-2 {
  bottom: 0px;
  left: 30%;
  transform: translate(-50%, 0);
  width: 75%;
  height: 80%;
  background: linear-gradient(-36deg, #E950D1, #f980D9);
  clip-path: polygon(10% 0, 100% 70%, 100% 100%, 20% 90%);
}

.g-polygon-3 {
  bottom: 0px;
  left: 70%;
  transform: translate(-50%, 0);
  width: 59%;
  height: 80%;
  background: rgba(87, 80, 233);
  clip-path: polygon(80% 0, 100% 70%, 100% 100%, 20% 90%);
}
</style>