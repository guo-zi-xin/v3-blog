<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppFooter from '../components/AppFooter.vue';
import AppHeader from '../components/AppHeader.vue';

const route = useRoute();
const isHome = computed(() => route.name === 'home');
</script>

<template>
  <div class="blog-layout">
    <AppHeader :transparent="isHome" />
    <main class="page-main" :class="{ home: isHome }">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.blog-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-main {
  flex: 1;
  padding-top: 64px;
}

.page-main.home {
  padding-top: 0;
}
</style>
