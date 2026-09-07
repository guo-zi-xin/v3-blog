<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getPost } from '../api/blog';
import RightSidebar from '../components/RightSidebar.vue';
import type { Post } from '../types';

const route = useRoute();
const post = ref<Post | null>(null);
const loading = ref(true);
const error = ref('');

async function loadArticle() {
  loading.value = true;
  error.value = '';
  post.value = null;
  try {
    post.value = await getPost(String(route.params.id));
  } catch (err) {
    error.value = (err as Error).message;
  } finally {
    loading.value = false;
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

watch(() => route.params.id, loadArticle);
onMounted(loadArticle);
</script>

<template>
  <div class="container layout-grid article-page">
    <article class="article card">
      <RouterLink :to="{ name: 'home' }" class="back">← 返回首页</RouterLink>

      <template v-if="loading">
        <div class="loading-text">文章加载中…</div>
      </template>

      <template v-else-if="error">
        <div class="error-tip">{{ error }}</div>
      </template>

      <template v-else-if="post">
        <header class="article-head">
          <RouterLink
            :to="{ name: 'category', params: { name: post.category } }"
            class="category"
          >
            {{ post.category }}
          </RouterLink>
          <h1>{{ post.title }}</h1>
          <p class="meta">{{ formatDate(post.createdAt) }}</p>
        </header>

        <img
          v-if="post.cover"
          :src="post.cover"
          :alt="post.title"
          class="article-cover"
        />

        <div class="article-body">{{ post.content }}</div>

        <div v-if="post.tags?.length" class="tags">
          <span v-for="tag in post.tags" :key="tag" class="tag"># {{ tag }}</span>
        </div>
      </template>
    </article>

    <RightSidebar />
  </div>
</template>

<style scoped>
.article {
  padding: 34px 40px;
  min-width: 0;
}

.back {
  display: inline-block;
  color: var(--muted);
  font-size: 14px;
  margin-bottom: 20px;
}

.back:hover {
  color: var(--primary);
}

.article-head {
  text-align: center;
  margin-bottom: 22px;
}

.category {
  display: inline-block;
  padding: 3px 14px;
  border-radius: 999px;
  color: var(--primary);
  background: #eef2ff;
  font-size: 13px;
  margin-bottom: 14px;
}

.article-head h1 {
  margin: 0 0 10px;
  font-size: clamp(24px, 4vw, 32px);
}

.meta {
  color: var(--muted);
  font-size: 13px;
  margin: 0;
}

.article-cover {
  width: 100%;
  max-height: 360px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 24px;
}

.article-body {
  white-space: pre-wrap;
  line-height: 1.95;
  font-size: 15.5px;
  color: #2d313c;
}

.tags {
  margin-top: 28px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
  display: flex;
  gap: 10px;
}

.tag {
  color: var(--muted);
  font-size: 13px;
}

.loading-text {
  padding: 60px;
  text-align: center;
  color: var(--muted);
}

@media (max-width: 640px) {
  .article {
    padding: 22px 18px;
  }
}
</style>
