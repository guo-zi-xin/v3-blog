<script setup lang="ts">
import { onMounted } from 'vue';
import ArticleCard from '../components/ArticleCard.vue';
import RightSidebar from '../components/RightSidebar.vue';
import TypeWriter from '../components/TypeWriter.vue';
import { useBlogStore } from '../stores/blog';

const store = useBlogStore();

onMounted(() => {
  store.fetchPosts();
});
</script>

<template>
  <div>
    <section class="hero">
      <div class="container hero-inner">
        <img class="avatar" src="/avatar.jpg" alt="我的胃来食" />
        <h1>我的胃来食</h1>
        <p class="typed-line">
          <TypeWriter
            :words="['人生没有捷径，就像去二仙桥要走成华大道']"
          />
        </p>
      </div>

      <svg
        class="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
        aria-hidden="true"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" />
          <use xlink:href="#gentle-wave" x="48" y="3" />
          <use xlink:href="#gentle-wave" x="48" y="5" />
          <use xlink:href="#gentle-wave" x="48" y="7" />
        </g>
      </svg>
    </section>

    <div class="container layout-grid">
      <section class="article-area" id="latest">
        <h2 class="section-title">最新记录</h2>

        <div v-if="store.loading" class="loading-area">
          <div v-for="i in 3" :key="i" class="skeleton card" />
        </div>

        <div v-else-if="store.error" class="error-tip">
          {{ store.error }}，请确认 NestJS 后端已在 3000 端口启动
        </div>

        <template v-else-if="store.sortedPosts.length">
          <ArticleCard v-for="post in store.sortedPosts" :key="post.id" :post="post" />
        </template>

        <div v-else class="empty-tip card">还没有文章，稍后再来看看吧</div>
      </section>

      <RightSidebar />
    </div>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1d2a6d;
  color: #fff;
  padding: 72px 0 130px;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url('/bg-home.webp') center / cover no-repeat;
  z-index: 0;
}

.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(15, 24, 67, 0.55), rgba(15, 24, 67, 0.32));
  z-index: 1;
}

.hero-inner {
  position: relative;
  z-index: 2;
  text-align: center;
}

.avatar {
  width: 108px;
  height: 108px;
  margin: 0 auto 22px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  object-fit: cover;
  font-size: 44px;
  font-weight: 600;
  color: var(--primary-dark);
  background: rgba(255, 255, 255, 0.95);
  border: 5px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 14px 40px rgba(28, 34, 86, 0.28);
}

.hero h1 {
  margin: 0 0 22px;
  font-size: clamp(30px, 5vw, 46px);
  font-weight: 700;
  letter-spacing: 0.08em;
}

.typed-line {
  min-height: 44px;
  max-width: 780px;
  margin: 0 auto;
  font-size: clamp(16px, 2.4vw, 21px);
  opacity: 0.94;
  line-height: 1.8;
}

.waves {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 6rem;
  min-height: 96px;
  z-index: 3;
}

.parallax > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}

.parallax > use:nth-child(1) {
  fill: rgba(255, 255, 255, 0.35);
  animation-delay: -2s;
  animation-duration: 7s;
}

.parallax > use:nth-child(2) {
  fill: rgba(255, 255, 255, 0.5);
  animation-delay: -3s;
  animation-duration: 10s;
}

.parallax > use:nth-child(3) {
  fill: rgba(255, 255, 255, 0.7);
  animation-delay: -4s;
  animation-duration: 13s;
}

.parallax > use:nth-child(4) {
  fill: #f6f8fc;
  animation-delay: -5s;
  animation-duration: 20s;
}

@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}

.article-area {
  min-width: 0;
  scroll-margin-top: 80px;
}

.loading-area {
  display: grid;
  gap: 18px;
}

.skeleton {
  height: 160px;
  background: linear-gradient(90deg, #fff 25%, #f0f2f8 50%, #fff 75%);
  background-size: 200% 100%;
  animation: shimmer 1.3s infinite;
}

@keyframes shimmer {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}
</style>
