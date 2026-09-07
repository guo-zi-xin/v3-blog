<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ArticleCard from '../components/ArticleCard.vue';
import RightSidebar from '../components/RightSidebar.vue';
import { useBlogStore } from '../stores/blog';

const route = useRoute();
const store = useBlogStore();

onMounted(() => {
  store.fetchPosts();
});

const category = computed(() => String(route.params.name));

const posts = computed(() =>
  store.sortedPosts.filter((post) => post.category === category.value),
);
</script>

<template>
  <div class="container layout-grid">
    <section>
      <h2 class="section-title">分类：{{ category }}</h2>
      <p v-if="posts.length" class="count">共 {{ posts.length }} 篇</p>

      <ArticleCard v-for="post in posts" :key="post.id" :post="post" />

      <div v-if="!store.loading && !posts.length" class="empty-tip card">
        该分类下暂时没有文章
      </div>
    </section>

    <RightSidebar />
  </div>
</template>

<style scoped>
.count {
  color: var(--muted);
  font-size: 14px;
  margin: -6px 0 18px;
}
</style>
